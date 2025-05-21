import { createContext, useContext, ReactNode, useState } from 'react';
import { chatbotConfig, ChatbotInstanceConfig } from '../config/chatbotConfig';
import { Message } from '../types/types';

interface ChatbotContextProps extends ChatbotInstanceConfig {
  // Login State
  userToken?: string | null;
  userId?: string | null;
  isLoggedIn?: boolean;
  setUserToken?: (token: string) => void;
  setUserId?: (id: string) => void;
  setIsLoggedIn?: (flag: boolean) => void;
}

const ChatbotContext = createContext<ChatbotContextProps>(chatbotConfig);
export const useChatbot = () => useContext(ChatbotContext);

export function ChatbotProvider({ children }: { children: ReactNode }) {
  const [userToken, setUserToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  return (
    <ChatbotContext.Provider
      value={{
        ...chatbotConfig,
        userToken,
        userId,
        isLoggedIn,
        setUserToken,
        setUserId,
        setIsLoggedIn,
      }}
    >
      {children}
    </ChatbotContext.Provider>
  );
}