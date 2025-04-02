require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const { OpenAI } = require('openai');

const app = express();
const port = process.env.PORT || 3000; // Render用にPORTを動的に

app.use(cors());
app.use(express.json());

// 静的ファイル（HTMLやCSSなど）を公開
app.use(express.static(path.join(__dirname)));

// OpenAI 初期化
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// チャットエンドポイント
app.post('/chat', async (req, res) => {
  try {
    const userMessage = req.body.message;

    const chatCompletion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: userMessage }],
    });

    const reply = chatCompletion.choices[0].message.content;
    res.json({ reply });
  } catch (err) {
    console.error('❌ エラー:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// `/` にアクセスしたときに `index.html` を返す
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// サーバー起動
app.listen(port, () => {
  console.log(`✅ サーバー起動中：http://localhost:${port}`);
});
