import './index.css';
import 'adaptivecards/dist/adaptivecards.css'; 
import './styles/adaptive-cards.css';          

import ChatWidget from './components/Chatbot/ChatWidget';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <ChatWidget />
    </div>
  );
}
