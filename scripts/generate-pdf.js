const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer");
const marked = require("marked");

async function generatePDF() {
  try {
    // Read the markdown file
    const markdownPath = path.join(__dirname, "../docs/admin-qa-guide.md");
    const markdownContent = fs.readFileSync(markdownPath, "utf8");

    // Convert markdown to HTML
    const htmlContent = marked.parse(markdownContent);

    // Create styled HTML
    const styledHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Admin Q&A Guide - Scholar AI Knowledge Base</title>
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 40px;
            background: white;
          }
          
          h1 {
            color: #1f2937;
            border-bottom: 3px solid #3b82f6;
            padding-bottom: 10px;
            margin-top: 40px;
            margin-bottom: 30px;
            text-align: center;
          }
          
          h2 {
            color: #374151;
            border-bottom: 2px solid #e5e7eb;
            padding-bottom: 8px;
            margin-top: 30px;
            margin-bottom: 20px;
            background-color: #f8fafc;
            padding: 10px;
            border-radius: 6px;
          }
          
          h3 {
            color: #4b5563;
            margin-top: 25px;
            margin-bottom: 15px;
            font-size: 1.1em;
          }
          
          h4 {
            color: #6b7280;
            margin-top: 20px;
            margin-bottom: 10px;
          }
          
          p {
            margin-bottom: 15px;
            text-align: justify;
          }
          
          ul, ol {
            margin-bottom: 15px;
            padding-left: 20px;
          }
          
          li {
            margin-bottom: 8px;
          }
          
          code {
            background-color: #f3f4f6;
            padding: 2px 6px;
            border-radius: 4px;
            font-family: 'Courier New', monospace;
            font-size: 0.9em;
          }
          
          pre {
            background-color: #f9fafb;
            border: 1px solid #e5e7eb;
            border-radius: 6px;
            padding: 15px;
            overflow-x: auto;
            margin: 15px 0;
          }
          
          blockquote {
            border-left: 4px solid #3b82f6;
            padding-left: 15px;
            margin: 15px 0;
            color: #6b7280;
            font-style: italic;
          }
          
          table {
            border-collapse: collapse;
            width: 100%;
            margin: 15px 0;
          }
          
          th, td {
            border: 1px solid #d1d5db;
            padding: 8px 12px;
            text-align: left;
          }
          
          th {
            background-color: #f9fafb;
            font-weight: 600;
          }
          
          .toc {
            background-color: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
          }
          
          .toc ul {
            list-style-type: none;
            padding-left: 0;
          }
          
          .toc li {
            margin-bottom: 5px;
          }
          
          .toc a {
            color: #3b82f6;
            text-decoration: none;
          }
          
          .toc a:hover {
            text-decoration: underline;
          }
          
          .highlight {
            background-color: #fef3c7;
            padding: 2px 4px;
            border-radius: 4px;
          }
          
          .warning {
            background-color: #fef2f2;
            border: 1px solid #fecaca;
            border-radius: 6px;
            padding: 15px;
            margin: 15px 0;
            color: #991b1b;
          }
          
          .info {
            background-color: #eff6ff;
            border: 1px solid #bfdbfe;
            border-radius: 6px;
            padding: 15px;
            margin: 15px 0;
            color: #1e40af;
          }
          
          .success {
            background-color: #f0fdf4;
            border: 1px solid #bbf7d0;
            border-radius: 6px;
            padding: 15px;
            margin: 15px 0;
            color: #166534;
          }
          
          .qa-section {
            background-color: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
          }
          
          .question {
            font-weight: 600;
            color: #1f2937;
            margin-bottom: 10px;
          }
          
          .answer {
            color: #374151;
            line-height: 1.7;
          }
          
          .step-list {
            background-color: #f9fafb;
            border-left: 4px solid #3b82f6;
            padding: 15px;
            margin: 15px 0;
          }
          
          .step-list ol {
            margin: 0;
            padding-left: 20px;
          }
          
          .step-list li {
            margin-bottom: 10px;
            color: #374151;
          }
          
          @media print {
            body {
              padding: 20px;
            }
            
            h1, h2, h3, h4 {
              page-break-after: avoid;
            }
            
            .page-break {
              page-break-before: always;
            }
            
            .qa-section {
              page-break-inside: avoid;
            }
          }
        </style>
      </head>
      <body>
        ${htmlContent}
      </body>
      </html>
    `;

    // Launch browser
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();

    // Set content and wait for rendering
    await page.setContent(styledHTML, { waitUntil: "networkidle0" });

    // Generate PDF
    const pdfPath = path.join(__dirname, "../docs/admin-qa-guide.pdf");
    await page.pdf({
      path: pdfPath,
      format: "A4",
      margin: {
        top: "1in",
        right: "1in",
        bottom: "1in",
        left: "1in",
      },
      printBackground: true,
      displayHeaderFooter: true,
      headerTemplate: `
        <div style="font-size: 10px; text-align: center; width: 100%; color: #6b7280;">
          Scholar AI Knowledge Base - Admin Q&A Guide
        </div>
      `,
      footerTemplate: `
        <div style="font-size: 10px; text-align: center; width: 100%; color: #6b7280;">
          Page <span class="pageNumber"></span> of <span class="totalPages"></span> | African Leadership University
        </div>
      `,
    });

    await browser.close();

    console.log("✅ Admin Q&A Guide PDF generated successfully!");
    console.log(`📄 File saved to: ${pdfPath}`);
  } catch (error) {
    console.error("❌ Error generating PDF:", error);
    process.exit(1);
  }
}

// Run the script
generatePDF();
