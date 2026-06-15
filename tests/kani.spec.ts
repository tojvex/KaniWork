import { expect, test } from "@playwright/test";

test.describe("Kani Group building navigation", () => {
  test("opens and closes each floor panel on desktop", async ({ page }) => {
    await page.goto("/");

    const floorIds = [
      "1f-beauty",
      "1f-reception",
      "2f-aesthetic",
      "2f-clinic",
      "3f-clinic",
      "4f-clinic",
      "5f-clinic",
      "7f-salt"
    ];

    for (const floorId of floorIds) {
      const floor = page.getByTestId(`floor-${floorId}`);
      await expect(floor).toBeVisible();
      await floor.click();
      await expect(page.getByTestId("brand-panel")).toBeVisible();
      await expect(floor).toHaveAttribute("aria-pressed", "true");
      await page.getByLabel("Close panel").click();
      await expect(page.getByTestId("brand-panel")).toBeHidden();
    }
  });

  test("supports keyboard activation and escape reset", async ({ page }) => {
    await page.goto("/");

    const floor = page.getByTestId("floor-2f-aesthetic");
    await floor.focus();
    await page.keyboard.press("Enter");
    await expect(page.getByTestId("brand-panel")).toContainText("KANI AESTHETIC");

    await page.keyboard.press("Escape");
    await expect(page.getByTestId("brand-panel")).toBeHidden();
  });

  test("switches to English content", async ({ page }) => {
    await page.goto("/");

    await page.getByRole("button", { name: "EN", exact: true }).click();
    await page.getByTestId("floor-7f-salt").click();

    await expect(page.getByTestId("brand-panel")).toContainText("Plan your event");
    await expect(page.getByTestId("brand-panel")).toContainText("Links and visual assets are placeholders.");
  });

  test("uses a mobile overlay panel", async ({ page, isMobile }) => {
    test.skip(!isMobile, "mobile project only");

    await page.goto("/");
    await page.getByTestId("floor-1f-beauty").click();

    const panel = page.getByTestId("brand-panel");
    await expect(panel).toBeVisible();
    const box = await panel.boundingBox();
    expect(box?.width).toBeGreaterThan(300);
  });
});
