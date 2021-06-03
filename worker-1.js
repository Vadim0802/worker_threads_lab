import { parentPort, threadId } from 'worker_threads';
import axios from 'axios';

setTimeout(async () => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
  parentPort.postMessage({ data: response.data, threadId });
}, 3000);
