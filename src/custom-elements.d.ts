// JSX type declarations for SGDS web components.
import type { HTMLAttributes } from "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "sgds-input": HTMLAttributes<HTMLElement> & {
        label?: string;
        name?: string;
        type?: string;
        value?: string;
        placeholder?: string;
        disabled?: boolean;
        required?: boolean;
        hasfeedback?: boolean;
        invalidfeedback?: string;
      };
      "sgds-button": HTMLAttributes<HTMLElement> & {
        type?: "button" | "submit" | "reset";
        variant?: string;
        disabled?: boolean;
        loading?: boolean;
        href?: string;
      };
    }
  }
}
