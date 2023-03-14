const puppeteer = require("puppeteer");
const { setDefaultOptions } = require("expect-puppeteer");
const fs = require("fs");
const fsPromises = fs.promises;

const baseUrl = import.meta.env.VITE_BASE_URL || "http://localhost:5000";

const onPageConsole = (msg) =>
  Promise.all(msg.args().map((event) => event.jsonValue())).then((eventJson) =>
    console.log(`<LOG::page console ${msg.type()}>`, ...eventJson)
  );

describe("00 - List and Query Foods", () => {
  let page;
  let browser;
  beforeAll(async () => {
    await fsPromises.mkdir("./.screenshots", { recursive: true });
    setDefaultOptions({ timeout: 1000 });
    browser = await puppeteer.launch();
  });

  beforeEach(async () => {
    page = await browser.newPage();
    page.on("console", onPageConsole);
    await page.setViewport({ width: 1920, height: 1080 });
    await page.goto(`${baseUrl}/`, { waitUntil: "load" });
  });

  afterAll(async () => {
    await browser.close();
  });

  describe("Home page route /", () => {
    test("Should List foods from starting category", async () => {
      await page.screenshot({
        path: " .screenshots/us-00-home-before.png",
        fullPage: true,
      });

      // evaluate page at the start

      // evaluate page when loading

      // evaluate page when done
    });
  });
});
