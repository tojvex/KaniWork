import { expect, test, type Page } from "@playwright/test";

test.describe("Kani Group building navigation", () => {
  async function skipOpeningScreen(page: Page) {
    await page.addInitScript(() => {
      const date = new Date();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      window.localStorage.setItem("kani-opening-seen-date", `${date.getFullYear()}-${month}-${day}`);
    });
  }

  async function openFloor(page: Page, floorId: string) {
    const hotspot = page.getByTestId(`home-hotspot-${floorId}`);
    if (await hotspot.isVisible()) {
      await hotspot.click();
      return;
    }

    await page.getByTestId(`floor-${floorId}`).click();
  }

  test("shows opening screen once per day", async ({ page }) => {
    await page.goto("/");

    const openingScreen = page.getByLabel("Open Kani Group website");
    await expect(openingScreen).toBeVisible();
    await openingScreen.click();
    await expect(openingScreen).toBeHidden({ timeout: 2000 });

    await page.reload();
    await expect(openingScreen).toBeHidden();

    await page.evaluate(() => {
      window.localStorage.setItem("kani-opening-seen-date", "2000-01-01");
    });
    await page.reload();
    await expect(openingScreen).toBeVisible();
  });

  test("opens and closes each floor panel on desktop", async ({ page }) => {
    await skipOpeningScreen(page);
    await page.goto("/");

    const floorIds = [
      "1f-beauty",
      "1f-reception",
      "2f-aesthetic",
      "2f-clinic",
      "3f-clinic",
      "4f-clinic",
      "5f-clinic"
    ];

    for (const floorId of floorIds) {
      const floor = page.getByTestId(`floor-${floorId}`);
      await expect(floor).toBeVisible();
      await openFloor(page, floorId);
      await expect(page.getByTestId("brand-panel")).toBeVisible();
      await expect(floor).toHaveAttribute("aria-pressed", "true");
      await page.getByLabel("Close panel").click();
      await expect(page.getByTestId("brand-panel")).toBeHidden();
    }
  });

  test("keeps Salt floor non-interactive", async ({ page }) => {
    await skipOpeningScreen(page);
    await page.goto("/");

    const salt = page.getByTestId("floor-7f-salt");
    await expect(salt).toBeDisabled();
    await expect(page.getByTestId("brand-panel")).toBeHidden();
  });

  test("supports keyboard activation and escape reset", async ({ page }) => {
    await skipOpeningScreen(page);
    await page.goto("/");

    const floor = page.getByTestId("floor-2f-aesthetic");
    await floor.focus();
    await page.keyboard.press("Enter");
    await expect(page.getByTestId("brand-panel")).toContainText("KANI AESTHETIC");

    await page.keyboard.press("Escape");
    await expect(page.getByTestId("brand-panel")).toBeHidden();
  });

  test("switches to English content", async ({ page, isMobile }) => {
    test.skip(!isMobile, "desktop uses exact Figma screenshot layer");

    await skipOpeningScreen(page);
    await page.goto("/");

    await page.getByRole("button", { name: "EN", exact: true }).click();
    await openFloor(page, "2f-aesthetic");

    await expect(page.getByTestId("brand-panel")).toContainText("KANI AESTHETIC");
    await expect(page.getByTestId("brand-panel")).toContainText("Be the way you want to be");
  });

  test("uses a mobile overlay panel", async ({ page, isMobile }) => {
    test.skip(!isMobile, "mobile project only");

    await skipOpeningScreen(page);
    await page.goto("/");
    await openFloor(page, "1f-beauty");

    const panel = page.getByTestId("brand-panel");
    await expect(panel).toBeVisible();
    const box = await panel.boundingBox();
    expect(box?.width).toBeGreaterThan(300);
  });
});
