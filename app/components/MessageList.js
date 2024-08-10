import { Box } from "@mui/material";
import MessageBox from "./MessageBox";

export default function MessageList({ messages }) {
  return (
    <>
      {messages.map((message, index) => (
        <MessageBox key={index} message={message} />
      ))}
    </>
  );
}
