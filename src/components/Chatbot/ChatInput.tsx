interface Props {
  value: string;
  onChange: (val: string) => void;
  onSend: () => void;
}

export default function ChatInput({ value, onChange, onSend }: Props) {
  return (
    <div className="chat-input-wrapper">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && onSend()}
          className="chat-input w-full text-sm"
      />

      <button
        onClick={onSend}
        className="ml-2 p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-md transition duration-200"
        title="Send"
        aria-label="Send message"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M2.01 21L23 12 2.01 3v7l15 2-15 2z" />
        </svg>
      </button>
    </div>
  );
}