import { Message } from '../../types/types';
import SuggestedActions from './SuggestedActions';
import AdaptiveCardRenderer from './AdaptiveCardRenderer';

function linkify(text: string): JSX.Element[] {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const parts = text.split(urlRegex);

  return parts.map((part, index) =>
    urlRegex.test(part) ? (
      <a
        key={index}
        href={part}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline break-words"
      >
        {part}
      </a>
    ) : (
      <span key={index}>{part}</span>
    )
  );
}

interface Props {
  messages: Message[];
  isTyping: boolean;
  onActionClick: (value: string | any) => void;
  messagesEndRef: React.RefObject<HTMLDivElement>;
}

export default function ChatMessages({
  messages,
  onActionClick,
  messagesEndRef,
  isTyping,
}: Props) {
  const { botName } = { botName: 'Energos' };

  return (
    <div className="flex-1 overflow-y-auto px-5 py-4 bg-[#f9fafb] space-y-2 text-[15px] leading-[1.6] font-['Inter','Segoe UI',sans-serif]">
      {messages.map((msg, idx) => {
        const isBot = msg.sender === 'bot';
        const isUser = msg.sender === 'user';
        const showBotName = isBot && (idx === 0 || messages[idx - 1]?.sender !== 'bot');

        return (
          <div
            key={idx}
            className={`flex flex-col gap-1 mb-2 ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            {showBotName && (
              <div className="text-sm text-blue-600 font-bold mb-1">{botName}</div>
            )}

            {/* Adaptive Card */}
            {msg.attachment?.contentType === 'application/vnd.microsoft.card.adaptive' ? (
              <div className="w-full flex justify-center mt-2">
                <AdaptiveCardRenderer
                  content={msg.attachment.content}
                  onSubmit={onActionClick}
                />
              </div>
            ) : (
              // Standard Message Bubble
              msg.text && (
                <div
                  className={`max-w-[80%] break-words rounded-2xl shadow-md message-bubble ${
                    isUser
                      ? 'user-bubble rounded-br-[0.5rem]'
                      : 'bot-bubble rounded-bl-[0.5rem]'
                  }`}
                >
                  <div className="bot-question">{linkify(msg.text)}</div>
                </div>
              )
            )}

            {/* Suggested Actions */}
            {msg.actions?.length ? (
              <SuggestedActions
                actions={msg.actions.map((action) => ({
                  type: (action as any).type ?? 'imBack',
                  title: action.title,
                  value: action.value,
                }))}
                onClick={onActionClick}
              />
            ) : null}
          </div>
        );
      })}

      {/* Typing Indicator */}
      {isTyping && (
        <div className="typing-indicator">
          <span></span>
          <span></span>
          <span></span>
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>
  );
}
