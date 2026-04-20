import "./index.css";
import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import { SearchForm } from "./SearchForm";
import { StepperForm } from "./StepperForm";

function App() {
  const [lastQuery, setLastQuery] = useState<string | null>(null);

  return (
    <div className="sgds:max-w-container-lg sgds:mx-auto sgds:p-component-vertical sgds:p-component-horizontal">
      <h2>SearchForm Preview</h2>
      <SearchForm onSearch={(q) => setLastQuery(q)} />
      {lastQuery !== null && (
        <p className="sgds:mt-component-vertical">
          Last search: <strong>{lastQuery}</strong>
        </p>
      )}

      <hr className="sgds:my-layout-lg" />

      <h2>StepperForm Preview</h2>
      <StepperForm
        onSubmit={(data) => console.log("Form submitted:", data)}
      />
    </div>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
