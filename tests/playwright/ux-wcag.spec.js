const { test, expect } = require("@playwright/test");

const AUDIT_ROUTES = ["/", "/resume", "/blog"];

const interactiveSelector = [
    'a[href]',
    'button',
    'input:not([type="hidden"])',
    "select",
    "textarea",
    '[role="button"]',
    '[role="link"]',
    '[tabindex]:not([tabindex="-1"])',
].join(",");

const colorUtilsSource = `
const parseColor = (value) => {
  if (!value) return null;
  const rgba = value.match(/rgba?\\(([^)]+)\\)/i);
  if (rgba) {
    const [r, g, b, a = "1"] = rgba[1].split(",").map((item) => item.trim());
    return { r: Number(r), g: Number(g), b: Number(b), a: Number(a) };
  }
  return null;
};

const blend = (fg, bg) => {
  if (!fg) return bg;
  const alpha = fg.a + bg.a * (1 - fg.a);
  if (!alpha) return { r: 0, g: 0, b: 0, a: 0 };
  return {
    r: (fg.r * fg.a + bg.r * bg.a * (1 - fg.a)) / alpha,
    g: (fg.g * fg.a + bg.g * bg.a * (1 - fg.a)) / alpha,
    b: (fg.b * fg.a + bg.b * bg.a * (1 - fg.a)) / alpha,
    a: alpha,
  };
};

const toLuminance = ({ r, g, b }) => {
  const normalize = (channel) => {
    const value = channel / 255;
    return value <= 0.03928 ? value / 12.92 : Math.pow((value + 0.055) / 1.055, 2.4);
  };

  const rs = normalize(r);
  const gs = normalize(g);
  const bs = normalize(b);

  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
};

const findEffectiveBackground = (element) => {
  const ancestry = [];
  let current = element;
  while (current) {
    ancestry.unshift(current);
    current = current.parentElement;
  }

  let background = { r: 255, g: 255, b: 255, a: 1 };
  for (const node of ancestry) {
    const bg = parseColor(getComputedStyle(node).backgroundColor);
    if (bg && bg.a > 0) {
      background = blend(bg, background);
    }
  }

  return background;
};

const contrastRatio = (element) => {
  const foregroundRaw = parseColor(getComputedStyle(element).color) || { r: 0, g: 0, b: 0, a: 1 };
  const background = findEffectiveBackground(element);
  const foreground = blend(foregroundRaw, background);
  const l1 = toLuminance(foreground);
  const l2 = toLuminance(background);
  const brighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return Number(((brighter + 0.05) / (darker + 0.05)).toFixed(2));
};
`;

async function getContrastRatio(locator) {
    return locator.evaluate(
        new Function(`${colorUtilsSource} return contrastRatio(arguments[0]);`)
    );
}

test("critical controls are labeled and meaningful images include alt text", async ({ page }) => {
    for (const route of AUDIT_ROUTES) {
        await page.goto(route);
        await page.waitForLoadState("domcontentloaded");

        const unlabeledControls = await page.evaluate((selector) => {
            const isVisible = (el) => {
                if (!el) return false;
                if (el.hidden) return false;
                const style = window.getComputedStyle(el);
                if (style.display === "none" || style.visibility === "hidden") return false;
                return Boolean(el.offsetWidth || el.offsetHeight || el.getClientRects().length);
            };

            const getAccessibleName = (el) => {
                const ariaLabel = el.getAttribute("aria-label");
                if (ariaLabel && ariaLabel.trim()) return ariaLabel.trim();

                const labelledBy = el.getAttribute("aria-labelledby");
                if (labelledBy) {
                    const text = labelledBy
                        .split(/\s+/)
                        .map((id) => document.getElementById(id)?.textContent?.trim() || "")
                        .join(" ")
                        .trim();
                    if (text) return text;
                }

                const title = el.getAttribute("title");
                if (title && title.trim()) return title.trim();

                if (el.tagName === "INPUT") {
                    const inputValue = el.getAttribute("value");
                    if (inputValue && inputValue.trim()) return inputValue.trim();
                }

                const alt = el.getAttribute("alt");
                if (alt && alt.trim()) return alt.trim();

                const textContent = (el.innerText || el.textContent || "").trim();
                if (textContent) return textContent;

                return "";
            };

            const controls = Array.from(document.querySelectorAll(selector));
            return controls
                .filter((el) => isVisible(el))
                .filter((el) => el.getAttribute("aria-hidden") !== "true")
                .filter((el) => !el.disabled)
                .map((el) => ({
                    tag: el.tagName.toLowerCase(),
                    role: el.getAttribute("role") || "",
                    name: getAccessibleName(el),
                }))
                .filter((item) => !item.name)
                .slice(0, 20);
        }, interactiveSelector);

        expect(
            unlabeledControls,
            `Unlabeled interactive controls found on route ${route}`
        ).toEqual([]);

        const missingAlt = await page.evaluate(() => {
            const isVisible = (el) => {
                if (!el) return false;
                if (el.hidden) return false;
                const style = window.getComputedStyle(el);
                if (style.display === "none" || style.visibility === "hidden") return false;
                return Boolean(el.offsetWidth || el.offsetHeight || el.getClientRects().length);
            };

            return Array.from(document.querySelectorAll("img"))
                .filter((img) => isVisible(img))
                .filter((img) => img.getAttribute("aria-hidden") !== "true")
                .filter((img) => img.getAttribute("role") !== "presentation")
                .filter((img) => !img.hasAttribute("alt"))
                .map((img) => img.getAttribute("src"))
                .slice(0, 20);
        });

        expect(missingAlt, `Missing alt attributes found on route ${route}`).toEqual([]);
    }
});

test("keyboard navigation works for header controls, project actions, and blog cards", async ({
    page,
    isMobile,
}) => {
    await page.goto("/");

    const menuButton = page.getByRole("button", { name: /open menu|close menu/i }).first();
    await expect(menuButton).toBeVisible();
    await menuButton.focus();
    await expect(menuButton).toBeFocused();

    if (isMobile) {
        await menuButton.press("Enter");
        const resumeButton = page.getByRole("button", { name: "Resume" }).first();
        await expect(resumeButton).toBeVisible();
        await resumeButton.focus();
        await expect(resumeButton).toBeFocused();
        await page.keyboard.press("Escape");
    } else {
        const blogLink = page.getByRole("link", { name: "Blog" }).first();
        await expect(blogLink).toBeVisible();
        await blogLink.focus();
        await expect(blogLink).toBeFocused();
    }

    const projectSection = page.locator('section[aria-labelledby="home-projects-title"]');
    await projectSection.scrollIntoViewIfNeeded();

    const selectProjectButton = projectSection
        .locator('button[aria-label^="Select "]')
        .first();
    await expect(selectProjectButton).toBeVisible();
    await selectProjectButton.focus();
    await expect(selectProjectButton).toBeFocused();

    let projectActionLink = projectSection.locator('a[aria-label^="Open "]').first();
    if ((await projectActionLink.count()) === 0 || !(await projectActionLink.isVisible())) {
        projectActionLink = projectSection.locator('a[aria-label^="View "]').first();
    }
    await expect(projectActionLink).toBeVisible();
    await projectActionLink.focus();
    await expect(projectActionLink).toBeFocused();

    await page.goto("/blog");
    const blogCardLink = page.locator('a[aria-label^="Read post:"]').first();
    await expect(blogCardLink).toBeVisible();
    await blogCardLink.focus();
    await expect(blogCardLink).toBeFocused();
});

test("resume mobile action buttons do not overlap summary content", async ({ page, isMobile }) => {
    test.skip(!isMobile, "Mobile-only overlap check");

    await page.goto("/resume");

    const viewPdfButton = page.getByRole("button", { name: "View PDF" }).first();
    const summaryText = page
        .locator("p")
        .filter({ hasText: "Technical Product Manager with proven experience" })
        .first();

    await expect(viewPdfButton).toBeVisible();
    await expect(summaryText).toBeVisible();

    const buttonBox = await viewPdfButton.boundingBox();
    const textBox = await summaryText.boundingBox();

    expect(buttonBox).not.toBeNull();
    expect(textBox).not.toBeNull();

    const buttonBottom = buttonBox.y + buttonBox.height;
    expect(
        buttonBottom,
        "Mobile resume action row should render before summary text without overlap"
    ).toBeLessThanOrEqual(textBox.y);
});

test("home projects are readable at rest without hover", async ({ page }) => {
    await page.goto("/");

    const firstProject = page.locator('section[aria-labelledby="home-projects-title"] article').first();
    const title = firstProject.locator("h3").first();
    const metaBadge = firstProject.locator("span").first();

    await expect(title).toBeVisible();
    await expect(metaBadge).toBeVisible();

    const titleColor = await title.evaluate((el) => getComputedStyle(el).color);
    expect(titleColor).not.toContain("0.5");
});

test("critical text contrast meets AA thresholds", async ({ page }) => {
    await page.goto("/");

    const projectTitleContrast = await getContrastRatio(
        page.locator('section[aria-labelledby="home-projects-title"] article h3').first()
    );
    const projectDescriptionContrast = await getContrastRatio(
        page.locator('section[aria-labelledby="home-projects-title"] article p').first()
    );

    expect(projectTitleContrast).toBeGreaterThanOrEqual(3);
    expect(projectDescriptionContrast).toBeGreaterThanOrEqual(4.5);

    await page.goto("/resume");
    const resumeBodyContrast = await getContrastRatio(
        page.locator("section[aria-labelledby='resume-education-heading'] p").first()
    );
    expect(resumeBodyContrast).toBeGreaterThanOrEqual(4.5);

    await page.goto("/blog");
    const blogPreviewContrast = await getContrastRatio(
        page.locator("article p").first()
    );
    expect(blogPreviewContrast).toBeGreaterThanOrEqual(4.5);
});
