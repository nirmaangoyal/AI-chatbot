"use client";

import { Box, Stack, ThemeProvider, createTheme } from "@mui/material";
import { useState } from "react";
import TopBar from "./components/TopBar";
import MessageList from "./components/MessageList";
import InputField from "./components/InputField";
import DownloadButton from "./components/DownloadButton";

export default function Home() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hi! I'm your travel planner. How can I help you today?",
    },
  ]);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [itinerary, setItinerary] = useState("");

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: darkMode ? "#bb86fc" : "#6200ea",
      },
      background: {
        default: darkMode ? "#121212" : "#f7f7fc",
        paper: darkMode ? "#1e1e1e" : "#fff",
      },
      text: {
        primary: darkMode ? "#e0e0e0" : "#000",
        secondary: darkMode ? "#b0b0b0" : "#757575",
      },
    },
  });

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <ThemeProvider theme={theme}>
      <Box
        width="100vw"
        height="100vh"
        display="flex"
        flexDirection="column"
        bgcolor="background.default"
        color="text.primary"
      >
        <TopBar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <Stack direction={"column"} spacing={2} flexGrow={1} overflow="auto" p={3} m={2} boxShadow={2}>
          <MessageList messages={messages} />
        </Stack>
        <InputField 
          message={message}
          setMessage={setMessage}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          messages={messages}
          setMessages={setMessages}
          setItinerary={setItinerary}
        />
        {itinerary && <DownloadButton itinerary={itinerary} />}
      </Box>
    </ThemeProvider>
  );
}
