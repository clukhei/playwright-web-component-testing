import { describe, test, expect, vi, it } from "vitest";
import { render } from "vitest-browser-react";
import { page } from "vitest/browser";
import { SearchForm } from "../src/SearchForm";

// ─── Vitest Browser Mode with Playwright Locator API ──────────────────────────
// Uses real browser environment with shadow DOM support through Playwright locators

describe("SearchForm", () => {
  // ─── Proof we're rendering correctly ──────────────────────────────────────

  test("renders the sgds-input and sgds-button components", async () => {
    const { container } = await render(<SearchForm onSearch={() => {}} />);

    // Query web components directly via DOM
    const sgdsInput = container.querySelector("sgds-input");
    expect(sgdsInput).toBeTruthy();
    expect(sgdsInput?.getAttribute("label")).toBe("Search");
    expect(sgdsInput?.getAttribute("name")).toBe("query");

    const sgdsButton = container.querySelector("sgds-button");
    expect(sgdsButton).toBeTruthy();
    expect(sgdsButton?.textContent).toContain("Search");

    const form = container.querySelector("form[role='search']");
    expect(form).toBeTruthy();
  });

  // ─── Interaction tests ──────────────────────────────────────────────────────

  test("shows a pink heart when user types 'sgds rocks'", async () => {
    const { container, locator } = await render(<SearchForm onSearch={() => {}} />);

    const shadowInput = locator.getByRole("textbox");
    expect(shadowInput).toBeVisible();
    await shadowInput.fill("sgds rocks");

    const hearts = container.querySelector("#hearts-sgds");
    expect(hearts).toBeVisible();
  });
  test("heart disappears when text does not equals to sgds rocks", async () => {
    const { container, locator } = await render(<SearchForm onSearch={() => {}} />);

    const shadowInput = locator.getByRole("textbox");
    expect(shadowInput).toBeVisible();
    await shadowInput.fill("sgds rocks");

    const hearts = container.querySelector("#hearts-sgds");
    expect(hearts).toBeVisible();

    await shadowInput.fill("something else");
    expect(hearts).not.toBeVisible();
  });

  it("calls onSearch with the typed query when submitted", async () => {
    const onSearch = vi.fn();
    const { locator } = await render(<SearchForm onSearch={onSearch} />);

    const shadowInput = locator.getByRole("textbox");
    const button = locator.getByRole("button");
    await shadowInput.fill("govtech");
    // await page.waitForTimeout(50);
    await button.click();

    expect(onSearch).toHaveBeenCalledWith("govtech");
  });

  // it("calls onSearch with empty string when nothing is typed", async () => {
  //   const onSearch = vi.fn();
  //   const { locator } = await render(<SearchForm onSearch={onSearch} />);

  //   const button = locator("sgds-button");
  //   await button.click();

  //   await page.waitForTimeout(100);
  //   expect(onSearch).toHaveBeenCalledWith("");
  // });

  // ─── Hearts easter egg ───────────────────────────────────────────────────────

  // it("shows a pink heart div below the form when user types 'sgds rocks'", async () => {
  //   const { locator } = await render(<SearchForm onSearch={() => {}} />);

  //   // Heart should not be present initially
  //   const hearts = locator("#hearts-sgds");
  //   await expect(hearts).not.toBeInTheDocument();

  //   // Type the magic phrase
  //   const input = locator("sgds-input").locator("input");
  //   await input.fill("sgds rocks");

  //   // Wait for heart to appear
  //   await expect(hearts).toBeInTheDocument();
  //   await expect(hearts).toBeVisible();

  //   // Confirm pink background colour
  //   const bgColor = await hearts.evaluate(
  //     (el: HTMLElement) => window.getComputedStyle(el).backgroundColor
  //   );
  //   expect(bgColor).toBe("rgb(255, 192, 203)");
  // });

  // it("hides the heart div when query is changed away from 'sgds rocks'", async () => {
  //   const { locator } = await render(<SearchForm onSearch={() => {}} />);

  //   const input = locator("sgds-input").locator("input");
  //   const hearts = locator("#hearts-sgds");

  //   // Type the magic phrase
  //   await input.fill("sgds rocks");
  //   await expect(hearts).toBeInTheDocument();

  //   // Clear and type something else
  //   await input.clear();
  //   await input.fill("something else");

  //   // Wait for heart to be removed
  //   await expect(hearts).not.toBeInTheDocument();
  // });

  // // ─── Shadow DOM querying patterns reference ──────────────────────────────────

  // it("demonstrates shadow DOM locator patterns with vitest browser", async () => {
  //   const { locator } = await render(<SearchForm onSearch={() => {}} />);

  //   // Pattern 1: chain locators — automatically pierces shadow boundaries
  //   const nativeInput = locator("sgds-input").locator("input");
  //   await expect(nativeInput).toBeVisible();

  //   // Pattern 2: fill() and type() work through shadow DOM
  //   await nativeInput.fill("hello");
  //   await expect(nativeInput).toHaveValue("hello");

  //   // Pattern 3: check attributes on the host element
  //   const sgdsInput = locator("sgds-input");
  //   await expect(sgdsInput).toHaveAttribute("label", "Search");
  //   await expect(sgdsInput).toHaveAttribute("name", "query");

  //   // Pattern 4: check visibility of shadow-internal elements
  //   const shadowButton = locator("sgds-button").locator("button");
  //   await expect(shadowButton).toBeVisible();

  //   // Pattern 5: evaluate custom logic in browser context
  //   const isVisible = await shadowButton.evaluate(
  //     (el: HTMLElement) => el.offsetHeight > 0
  //   );
  //   expect(isVisible).toBe(true);
  // });
});
