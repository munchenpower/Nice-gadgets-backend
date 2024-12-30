import { createServer } from './createServer';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 5000;

createServer().listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
