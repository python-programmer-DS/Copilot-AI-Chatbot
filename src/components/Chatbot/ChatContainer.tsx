import { useRef, useEffect, useState } from 'react';
import { useBotConnection } from './useBotConnection';
import ChatHeader from './ChatHeader';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';
import { useChatbot } from '../../contexts/ChatbotContext';

export default function ChatContainer({ onClose }: { onClose: () => void }) {
  const { tokenEndpoint } = useChatbot();
  const { directLine, messages, setMessages, isTyping, sendAdaptiveCardSubmit } = useBotConnection(tokenEndpoint);

  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const send = (text: string) => {
    if (!directLine || !text.trim()) return;
    setMessages((prev) => [...prev, { sender: 'user', text }]);
    directLine
      .postActivity({
        type: 'message',
        from: { id: 'user1' },
        text,
      })
      .subscribe();
    setInput('');
  };

  const handleActionSubmit = (value: string | any) => {
    if (typeof value === 'string') {
      send(value);
    } else if (typeof value === 'object' && value !== null) {
      sendAdaptiveCardSubmit(value);
    }
  };

  return (
    <div className="chatbot-container">
      <ChatHeader onClose={onClose} />
      <ChatMessages
        messages={messages}
        onActionClick={handleActionSubmit}
        messagesEndRef={messagesEndRef}
        isTyping={isTyping}
      />
      <ChatInput value={input} onChange={setInput} onSend={() => send(input)} />
    </div>
  );
}
