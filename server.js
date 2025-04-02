require('dotenv').config();
const express = require('express');
const cors = require('cors');
const OpenAI = require('openai'); // ← 変更ポイント！

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.post('/chat', async (req, res) => {
  try {
    const userMessage = req.body.message;

    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: userMessage }]
    });

    const reply = chatCompletion.choices[0].message.content;
    res.json({ reply });
  } catch (err) {
    console.error("❌ エラー:", err.message);
    res.status(500).json({ error: err.message });
  }
});
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.listen(3000, () => {
  console.log("✅ サーバー起動中：http://localhost:3000");
});
