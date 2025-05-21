import { useChatbot } from '../../contexts/ChatbotContext';

export default function ChatHeader({ onClose }: { onClose: () => void }) {
  const { botName, logoUrl } = useChatbot();

  return (
    <div className="chat-header h-[80px] px-6 py-5 flex items-center justify-between bg-brand text-white shadow-sm rounded-t-2xl">
      <div className="flex items-center gap-4">
        <div className="relative">
          <img
            src={logoUrl}
            alt={`${botName} Logo`}
            className="w-14 h-14 rounded-full border-2 border-white shadow"
          />
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-white rounded-full shadow-sm"></span>
        </div>
        <div>
          <h3 className="font-semibold text-xl tracking-tight leading-tight">{botName}</h3>
          <p className="text-xs text-green-100 font-medium tracking-wide">Online</p>
        </div>
      </div>

      <button
        onClick={onClose}
        className="text-white text-3xl font-bold hover:text-gray-200 transition-all duration-150"
        aria-label="Close chat"
      >
        &times;
      </button>
    </div>
  );
}
