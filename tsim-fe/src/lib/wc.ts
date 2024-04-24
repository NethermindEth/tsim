import { WebContainer } from "@webcontainer/api";
import { projectFiles } from "./content/files";

const webcontainerInstance = await WebContainer.boot();
await webcontainerInstance.mount(projectFiles);

async function startDevServer() {
    const installProcess = await webcontainerInstance.spawn('npm', ['install']);
  
    const installExitCode = await installProcess.exit;
  
    if (installExitCode !== 0) {
      throw new Error('Unable to run npm install');
    }
  
    // `npm run dev`
    await webcontainerInstance.spawn('npm', ['run', 'dev']);
  }

//   webcontainerInstance.on('server-ready', (port, url) => (iframeEl.src = url));