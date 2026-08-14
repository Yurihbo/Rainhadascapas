import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    void navigator.serviceWorker.register(`${import.meta.env.BASE_URL}sw.js`).then((registration) => {
      void registration.update();
      window.setInterval(() => { void registration.update(); }, 30 * 60 * 1000);
    });
  });
}

createRoot(document.getElementById("root")!).render(<App />);
