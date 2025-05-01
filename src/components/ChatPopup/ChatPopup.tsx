import React, { useState } from 'react';
import { ChatPopupContainer, ChatButton, ChatBox } from '././ChatPopup.styles';

const ChatPopup: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <ChatPopupContainer>
      <ChatButton onClick={toggleChat}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#0866FF"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
      </ChatButton>
      {isChatOpen && <ChatBox>Chat content goes here</ChatBox>}
    </ChatPopupContainer>
  );
};

export default ChatPopup;