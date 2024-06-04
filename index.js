const express = require('express');
const bodyParser = require('body-parser');
const puppeteer = require('puppeteer');

const app = express();
const port = 3000;

// Middleware to parse JSON and urlencoded request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/generate-pdf', async (req, res) => {
  const { html } = req.body;

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Set content of the page to the received HTML
  await page.setContent(html);

  // Generate PDF
  const pdfBuffer = await page.pdf({ format: 'A4' });

  // Close browser
  await browser.close();

  // Set response headers
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename="generated.pdf"');

  // Send PDF as response
  res.send(pdfBuffer);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
