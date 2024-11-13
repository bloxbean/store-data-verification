const puppeteer = require("puppeteer");
const path = require("path");

const reportPath = path.join(__dirname, "playwright-report", "index.html");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Navigate to the Playwright report
  console.log(`Navigating to: file://${reportPath}`);

  await page.goto(`file://${reportPath}`, { waitUntil: "networkidle0" });

  // Generate the PDF
  await page.pdf({
    path: "playwright-report.pdf", // Output PDF file
    format: "A4",
    printBackground: true,
  });

  await browser.close();
})();
