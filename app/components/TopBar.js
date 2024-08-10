import { Box, Typography, IconButton } from "@mui/material";
import { DarkMode, LightMode } from "@mui/icons-material";

export default function TopBar({ darkMode, toggleDarkMode }) {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      p={1}
      height="50px"
      bgcolor="background.paper"
      boxShadow={1}
    >
      <Box display="flex" alignItems="center">
        <img src="/images/logo.png" alt="Travel GPT Logo" style={{ height: '30px', marginRight: '8px' }} />
        <Typography variant="h6" fontWeight="bold" sx={{ fontSize: '1.2rem' }}>Travel GPT</Typography>
      </Box>
      <IconButton onClick={toggleDarkMode}>
        {darkMode ? <LightMode /> : <DarkMode />}
      </IconButton>
    </Box>
  );
}
