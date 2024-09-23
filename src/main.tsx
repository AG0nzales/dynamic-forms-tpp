import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider
      theme={createTheme({
        palette: {
          mode: "light",
        },
      })}
    >
      <CssBaseline />
      <App />
    </ThemeProvider>
  </StrictMode>
);
