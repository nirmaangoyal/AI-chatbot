import { Box } from "@mui/material";
import ReactMarkdown from "react-markdown";

export default function MessageBox({ message }) {
  return (
    <Box
      display="flex"
      justifyContent={message.role === "assistant" ? "flex-start" : "flex-end"}
      sx={{
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "scale(1.02)",
        },
      }}
    >
      <Box
        bgcolor={message.role === "assistant" ? "#79747E" : "#625B71"}
        color="white"
        borderRadius={16}
        p={2}
        maxWidth="60%"
        boxShadow={2}
        sx={{
          overflowWrap: "break-word",
          wordBreak: "break-word",
          whiteSpace: "pre-wrap",
        }}
      >
        <ReactMarkdown>{message.content}</ReactMarkdown>
      </Box>
    </Box>
  );
}
