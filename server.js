// server.js
import express from 'express';
import TelegramBot from 'node-telegram-bot-api';

const app = express();
const port = process.env.PORT || 3000;
const token = process.env.TELEGRAM_BOT_TOKEN;

// Initialize bot
const bot = new TelegramBot(token, { polling: false });

// Serve frontend build
app.use(express.static('dist'));

// Telegram webhook
app.post('/webhook', express.json(), (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

// Handle frontend routes
app.get('*', (req, res) => {
  res.sendFile(path.resolve('dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
