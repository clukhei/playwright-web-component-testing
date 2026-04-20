import { expect, test } from "@playwright/experimental-ct-react";
import { SearchForm } from "../src/SearchForm";

// ─── Proof we're in a real browser ─────────────────────────────────────────

test("upgrades sgds-input as a real custom element", async ({ mount, page }) => {
  await mount(<SearchForm onSearch={() => {}} />);

  // Evaluate in the browser context — this would return false in jsdom
  const isDefined = await page.evaluate(() => !!customElements.get("sgds-input"));
  expect(isDefined).toBe(true);

  // Shadow DOM is accessible
  const hasShadowRoot = await page.evaluate(
    () => document.querySelector("sgds-input")?.shadowRoot !== null
  );
  expect(hasShadowRoot).toBe(true);
});

// ─── Interaction tests ──────────────────────────────────────────────────────

test("calls onSearch with the typed query when submitted", async ({ mount, page }) => {
  let captured = "";

  await mount(<SearchForm onSearch={(q) => { captured = q; }} />);

  // Playwright locators auto-pierce one level of shadow DOM when chaining.
  // sgds-input (host) → shadow root → native <input>
  await page.locator("sgds-input").locator("input").fill("govtech");
  await page.locator("sgds-button").click();

  expect(captured).toBe("govtech");
});

test("calls onSearch with empty string when nothing is typed", async ({ mount, page }) => {
  let captured: string | undefined;

  await mount(<SearchForm onSearch={(q) => { captured = q; }} />);

  await page.locator("sgds-button").click();

  expect(captured).toBe("");
});

// ─── Hearts easter egg ───────────────────────────────────────────────────────

test("shows a pink heart div below the form when user types 'sgds rocks'", async ({ mount, page }) => {
  await mount(<SearchForm onSearch={() => {}} />);

  // Not visible before typing the magic phrase
  await expect(page.locator("#hearts-sgds")).not.toBeAttached();

  await page.locator("sgds-input").locator("input").fill("sgds rocks");

  const hearts = page.locator("#hearts-sgds");
  await expect(hearts).toBeVisible();

  // Confirm pink background colour
  await expect(hearts).toHaveCSS("background-color", "rgb(255, 192, 203)");
});

test("hides the heart div when query is changed away from 'sgds rocks'", async ({ mount, page }) => {
  await mount(<SearchForm onSearch={() => {}} />);

  await page.locator("sgds-input").locator("input").fill("sgds rocks");
  await expect(page.locator("#hearts-sgds")).toBeVisible();

  await page.locator("sgds-input").locator("input").fill("something else");
  await expect(page.locator("#hearts-sgds")).not.toBeAttached();
});

// ─── Shadow DOM querying patterns reference ─────────────────────────────────

test("demonstrates Playwright shadow DOM locator patterns", async ({ mount, page }) => {
  await mount(<SearchForm onSearch={() => {}} />);

  // Pattern 1: chain locators — Playwright pierces one shadow boundary per chain step
  const nativeInput = page.locator("sgds-input").locator("input");
  await expect(nativeInput).toBeVisible();

  // Pattern 2: fill() and type() work through shadow DOM
  await nativeInput.fill("hello");
  await expect(nativeInput).toHaveValue("hello");

  // Pattern 3: check attributes on the host element itself
  await expect(page.locator("sgds-input")).toHaveAttribute("label", "Search");
  await expect(page.locator("sgds-input")).toHaveAttribute("name", "query");

  // Pattern 4: check visibility of shadow-internal elements
  const shadowButton = page.locator("sgds-button").locator("button");
  await expect(shadowButton).toBeVisible();
});
