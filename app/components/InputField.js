import { Box, TextField, IconButton } from "@mui/material";
import { Send } from "@mui/icons-material";

export default function InputField({
  message,
  setMessage,
  isLoading,
  setIsLoading,
  messages,
  setMessages,
  setItinerary,
}) {
  const sendMessage = async () => {
    if (!message.trim() || isLoading) return;
    setIsLoading(true);
    const currentMessage = message;
    setMessage("");
    const updatedMessages = [
      ...messages,
      { role: "user", content: currentMessage },
    ];
    setMessages([
      ...updatedMessages,
      { role: "assistant", content: "..." },
    ]);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const { messages: newMessages } = await response.json();

      setMessages([...updatedMessages, ...newMessages]);

      if (newMessages[0].content.toLowerCase().includes("download itinerary")) {
        setItinerary(newMessages[0].content);
      }

    } catch (error) {
      console.error("Error:", error);
      setMessages((messages) => [
        ...messages,
        {
          role: "assistant",
          content: "I'm sorry, but I encountered an error. Please try again later.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  return (
    <Box
      mt={2}
      display="flex"
      alignItems="center"
      bgcolor="background.default"
      p={2}
      borderRadius="8px"
      boxShadow={3}
      mx={2}
      sx={{
        "&:hover": {
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        },
      }}
    >
      <TextField
        variant="outlined"
        placeholder="Type your message"
        fullWidth
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={handleKeyPress}
        disabled={isLoading}
        sx={{ borderRadius: "50px", backgroundColor: "#ECE6F0" }}
      />
      <IconButton
        onClick={sendMessage}
        disabled={isLoading}
        color="primary"
        sx={{ marginLeft: 2 }}
      >
        <Send />
      </IconButton>
    </Box>
  );
}
