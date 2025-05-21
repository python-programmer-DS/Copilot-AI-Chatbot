interface Action {
  type: string;
  title: string;
  value: string;
}

interface Props {
  actions: Action[];
  onClick: (value: string) => void;
}

export default function SuggestedActions({ actions, onClick }: Props) {
  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {actions.map((action, idx) => (
        <button
          key={idx}
          className="px-5 py-2 rounded-full text-sm font-semibold bg-blue-50 text-blue-900 border border-blue-200 shadow-md hover:bg-blue-100 hover:border-blue-400 hover:shadow-lg transition-all duration-150 transform hover:scale-[1.03]"
          onClick={() => onClick(action.value)}
          type="button"
        >
          {action.title}
        </button>
      ))}
    </div>
  );
}