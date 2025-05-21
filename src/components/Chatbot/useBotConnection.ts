import { useEffect, useRef, useState } from 'react';
import { createDirectLine } from 'botframework-webchat';
import { Message } from '../../types/types';

type Activity = {
  type: string;
  from?: {
    role?: string;
    id?: string;
  };
  text?: string;
  value?: any;
  suggestedActions?: {
    actions: { title?: string; value?: string }[];
  };
  attachments?: {
    contentType: string;
    content: any;
  }[];
};

export function useBotConnection(tokenUrl: string) {
  const [directLine, setDirectLine] = useState<any>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [lastSender, setLastSender] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const startedRef = useRef(false);

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    const start = async () => {
      try {
        const res = await fetch(tokenUrl);
        const { token } = await res.json();
        const dl = createDirectLine({ token });
        setDirectLine(dl);

        dl.activity$.subscribe((activity: Activity) => {
          if (activity.type === 'typing') {
            setIsTyping(true);
            setTimeout(() => setIsTyping(false), 1500); // Reset after 1.5s
            return;
          }

          if (activity.type === 'message') {
            if (activity.from?.role === 'bot') {
              const safeActions = (activity.suggestedActions?.actions || []).map((action) => ({
                title: action.title ?? '',
                value: action.value ?? '',
              }));

              const attachment = activity.attachments?.[0];
              const isAdaptiveCard =
                attachment?.contentType === 'application/vnd.microsoft.card.adaptive';

              setMessages((prev) => [
                ...prev,
                {
                  sender: 'bot',
                  text: activity.text ?? '',
                  actions: safeActions.length ? safeActions : undefined,
                  attachment: isAdaptiveCard
                    ? {
                        contentType: attachment.contentType,
                        content: attachment.content,
                      }
                    : undefined,
                },
              ]);

              setLastSender('bot');
            } else if (activity.from?.role === 'user' && activity.value) {
              console.log('User submitted form data:', activity.value);
              setMessages((prev) => [
                ...prev,
                {
                  sender: 'user',
                  text: 'Submitted credentials',
                },
              ]);
            }
          }
        });

        dl.postActivity({
          type: 'event',
          name: 'startConversation',
          from: { id: 'user1' },
          value: {
            locale: 'en-US',
            localTimezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          },
        }).subscribe();
      } catch (e) {
        console.error('Bot connection failed', e);
      }
    };

    start();
  }, [tokenUrl]);

  return {
    directLine,
    messages,
    setMessages,
    lastSender,
    isTyping,
    sendAdaptiveCardSubmit: (data: any) => {
      if (directLine) {
        directLine.postActivity({
          type: 'message',
          from: { id: 'user1' },
          value: data,
          text: '',
        }).subscribe();
      }
    },
  };
}
