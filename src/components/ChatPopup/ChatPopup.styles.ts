import styled from 'styled-components';

export const ChatPopupContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
`;

export const ChatButton = styled.button`
  background-color: #FFFFFF;
  border: 1px solid #000000;
  border-radius: 100px;
  box-shadow: 0px 0px 8px 0px rgba(8, 102, 255, 0.25);
  width: 48px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export const ChatBox = styled.div`
  position: fixed;
  bottom: 80px;
  right: 20px;
  width: 300px;
  height: 400px;
  background-color: #FFFFFF;
  border: 1px solid #000000;
  box-shadow: 0px 0px 8px 0px rgba(8, 102, 255, 0.25);
  border-radius: 8px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
`;