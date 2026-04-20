import "./index.css";
import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import { SearchForm } from "./SearchForm";

function App() {
  const [lastQuery, setLastQuery] = useState<string | null>(null);

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h2>SearchForm Preview</h2>
      <SearchForm onSearch={(q) => setLastQuery(q)} />
      {lastQuery !== null && (
        <p style={{ marginTop: "1rem" }}>
          Last search: <strong>{lastQuery}</strong>
        </p>
      )}
    </div>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
