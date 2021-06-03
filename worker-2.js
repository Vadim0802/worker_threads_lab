import { parentPort, threadId } from 'worker_threads';
import axios from 'axios';

setTimeout(async () => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/users');
  parentPort.postMessage({ data: response.data, threadId });
}, 1000);
