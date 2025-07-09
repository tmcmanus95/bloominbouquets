import { useState } from "react";

export function useAlerts() {
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertText, setAlertText] = useState("");
  const [alertCount, setAlertCount] = useState(0);

  const showAlert = (message, duration = 1500) => {
    setAlertText(message);
    setAlertVisible(true);
    setTimeout(() => {
      setAlertVisible(false);
      setAlertText("");
    }, duration);
  };

  const showLoginPrompt = () => {
    if (alertCount < 3) {
      showAlert("Login to save words and flowers and earn golden seeds!", 2000);
      setAlertCount((prev) => prev + 1);
    }
  };

  return {
    alertVisible,
    setAlertVisible,
    alertText,
    setAlertText,
    showAlert,
    showLoginPrompt,
  };
}
