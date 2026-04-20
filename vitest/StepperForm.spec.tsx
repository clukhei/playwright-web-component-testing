import { describe, test, expect } from "vitest";
import { render } from "vitest-browser-react";
import { StepperForm } from "../src/StepperForm";

describe("StepperForm", () => {
  test("renders step 1 with first name and last name inputs", async () => {
    const { container, locator } = await render(
      <StepperForm onSubmit={() => {}} />
    );

    // Check for sgds-input elements
    const inputs = container.querySelectorAll("sgds-input");
    expect(inputs.length).toBe(2);

    // Check first input label
    const firstInput = inputs[0];
    expect(firstInput?.getAttribute("label")).toBe("First Name");
    expect(firstInput?.getAttribute("name")).toBe("firstName");

    // Check second input label
    const secondInput = inputs[1];
    expect(secondInput?.getAttribute("label")).toBe("Last Name");
    expect(secondInput?.getAttribute("name")).toBe("lastName");
  });

  test("moves to step 2 with gender checkboxes when next button is clicked", async () => {
    const { container, locator } = await render(
      <StepperForm onSubmit={() => {}} />
    );

    // Click the Next button
    const nextButton = locator.getByRole("button", { name: /next/i });
    await nextButton.click();

    // Check that checkboxes are now visible
    const checkboxes = container.querySelectorAll("sgds-checkbox");
    expect(checkboxes.length).toBe(2);

    // Check checkbox labels
    const femaleCheckbox = checkboxes[0];
    expect(femaleCheckbox?.getAttribute("value")).toBe("female");
    expect(femaleCheckbox?.textContent).toContain("Female");

    const maleCheckbox = checkboxes[1];
    expect(maleCheckbox?.getAttribute("value")).toBe("male");
    expect(maleCheckbox?.textContent).toContain("Male");

    // Verify inputs are no longer visible
    const inputs = container.querySelectorAll("sgds-input");
    expect(inputs.length).toBe(0);
  });
});
