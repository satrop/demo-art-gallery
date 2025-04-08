// format-html.js
import { promises as fs } from "fs";
import { execSync } from "child_process";
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";
import prettier from "prettier";

const __dirname = dirname(fileURLToPath(import.meta.url));

async function formatHTML() {
  console.log("Formatting HTML files in dist directory...");
  try {
    // First, find all HTML files
    const distDir = path.join(process.cwd(), "dist");
    const htmlFiles = await findHtmlFiles(distDir);

    // Process each HTML file individually
    for (const file of htmlFiles) {
      console.log(`Formatting ${file}...`);
      let content = await fs.readFile(file, "utf8");

      // Remove any file header comments
      content = content.replace(/\/\/\s*filepath:.*?\n/, "");

      // Format the HTML with prettier directly in code (not via CLI)
      const formattedContent = await prettier.format(content, {
        parser: "html",
        printWidth: 100,
        tabWidth: 2,
        useTabs: false,
        htmlWhitespaceSensitivity: "css",
        bracketSameLine: false,
        singleAttributePerLine: false,
      });

      // Write the formatted content back to the file
      await fs.writeFile(file, formattedContent, "utf8");
      console.log(`Finished formatting ${file}`);
    }

    console.log("HTML formatting completed successfully.");
  } catch (error) {
    console.error("Error formatting HTML:", error);
    console.error(error.stack);
    process.exit(1);
  }
}

async function findHtmlFiles(dir) {
  const files = await fs.readdir(dir);
  const htmlFiles = [];

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = await fs.stat(filePath);

    if (stat.isDirectory()) {
      const nestedFiles = await findHtmlFiles(filePath);
      htmlFiles.push(...nestedFiles);
    } else if (file.endsWith(".html")) {
      htmlFiles.push(filePath);
    }
  }

  return htmlFiles;
}

// Call the function to start formatting
formatHTML();
