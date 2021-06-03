import { Worker, isMainThread } from 'worker_threads';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.join(__filename, '..');

if (isMainThread) {
  fs.readdir(__dirname, (err, files) => {
    if (err) return;
    files
      .filter((item) => item.includes('worker'))
      .forEach((item) => {
        const worker = new Worker(path.join(__dirname, item), { workerData: null });
        worker.on('message', (msg) => {
          if (msg.threadId === 1) {
            console.log(`Записей загружено: ${msg.data.length}`);
          }
          if (msg.threadId === 2) {
            console.log(`Пользователей получено: ${msg.data.length}`);
            console.log(
              msg.data.map(({ name, email }) => `${name}: ${email}`).join('\n'),
            );
          }
        });
      });
  });
}
