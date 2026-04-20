import { expect, test } from "@playwright/experimental-ct-react";
import { StepperForm } from "../src/StepperForm";

test("renders step 1 with first name and last name inputs", async ({ mount, page }) => {
  await mount(<StepperForm onSubmit={() => {}} />);

  // Get all sgds-input elements
  const firstNameInput = page.locator("sgds-input[name='firstName']");
  const lastNameInput = page.locator("sgds-input[name='lastName']");

  // Verify First Name input
  await expect(firstNameInput).toBeVisible();
  await expect(firstNameInput).toHaveAttribute("label", "First Name");

  // Verify Last Name input
  await expect(lastNameInput).toBeVisible();
  await expect(lastNameInput).toHaveAttribute("label", "Last Name");
});

test("moves to step 2 with gender checkboxes when next button is clicked", async ({ mount, page }) => {
  await mount(<StepperForm onSubmit={() => {}} />);

  // Click Next button
  const nextButton = page.locator("sgds-button:has-text('Next')");
  await nextButton.click();

  // Verify inputs are no longer visible
  const firstNameInput = page.locator("sgds-input[name='firstName']");
  const lastNameInput = page.locator("sgds-input[name='lastName']");
  await expect(firstNameInput).not.toBeVisible();
  await expect(lastNameInput).not.toBeVisible();

  // Verify checkboxes are now visible
  const femaleCheckbox = page.locator("sgds-checkbox[value='female']");
  const maleCheckbox = page.locator("sgds-checkbox[value='male']");

  await expect(femaleCheckbox).toBeVisible();
  await expect(femaleCheckbox).toContainText("Female");

  await expect(maleCheckbox).toBeVisible();
  await expect(maleCheckbox).toContainText("Male");
});
