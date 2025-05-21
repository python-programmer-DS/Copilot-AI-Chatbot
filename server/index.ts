import express from 'express';
import cors from 'cors';
import tokenRoute from './routes/token';
import { errorHandler } from './middleware/errorHandler';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use('/api/token', tokenRoute);

// Error handler (should be last)
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Chatbot backend running on port ${PORT}`);
});