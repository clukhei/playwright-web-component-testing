import "@govtechsg/sgds-web-component";
import { useEffect, useRef, useState } from "react";
import "./custom-elements.d.ts";

interface SearchFormProps {
  onSearch: (query: string) => void;
}

/**
 * A form component that uses SGDS web components.
 * Demonstrates: custom event listening, shadow DOM form association.
 */
export function SearchForm({ onSearch }: SearchFormProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = inputRef.current;
    if (!el) return;

    // SGDS fires 'sgds-input' instead of the native 'input' event.
    // We read the value from the shadow DOM's native <input> directly.
    const handleInput = () => {
      const nativeInput = el.shadowRoot?.querySelector("input");
      setQuery(nativeInput?.value ?? "");
    };

    el.addEventListener("sgds-input", handleInput);
    return () => el.removeEventListener("sgds-input", handleInput);
  }, []);

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSearch(query);
        }}
        role="search"
      >
        {/* @ts-ignore - ref typing for custom elements */}
        <sgds-input ref={inputRef} label="Search" name="query" />
        <sgds-button type="submit">Search</sgds-button>
      </form>
      {query === "sgds rocks" && (
        <div
          id="hearts-sgds"
          style={{
            width: "100px",
            height: "100px",
            backgroundColor: "pink",
            clipPath:
              'path("M50 85 C30 70, 5 55, 5 35 C5 20, 15 10, 28 10 C36 10, 44 14, 50 20 C56 14, 64 10, 72 10 C85 10, 95 20, 95 35 C95 55, 70 70, 50 85 Z")',
            marginTop: "1rem",
          }}
        />
      )}
    </>
  );
}
