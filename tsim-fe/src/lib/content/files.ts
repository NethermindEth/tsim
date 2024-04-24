import { FileSystemTree } from "@webcontainer/api";

export const projectFiles = {
    // This is a directory - provide its name as a key
  src: {
    // Because it's a directory, add the "directory" key
    directory: {
      // This is a file - provide its path as a key:
      'main.js': {
        // Because it's a file, add the "file" key
        file: {
          contents: `
            console.log('Hello from WebContainers!')
          `,
        },
      },
      // This is another file inside the same folder
      'main.css': {
        // Because it's a file, add the "file" key
        file: {
          contents: `
            body {
              margin: 0;
            }
          `,
        },
      },
    },
  },
  'package.json': {
    file: {
      contents: `
        {
          "name": "vite-starter",
          "private": true,
          "version": "0.0.0",
          "type": "module",
          "scripts": {
            "dev": "vite",
            "build": "vite build",
            "preview": "vite preview"
          },
          "devDependencies": {
            "vite": "^4.0.4"
          }
        }`,
    },
  },
  'index.html': {
    file: {
      contents: `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <link rel="icon" type="image/svg+xml" href="/vite.svg" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Vite App</title>
          </head>
          <body>
            <div id="app"></div>
            <script type="module" src="/src/main.js"></script>
          </body>
        </html>`,
    },
  },
} satisfies FileSystemTree