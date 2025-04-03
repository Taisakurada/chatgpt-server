require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const { OpenAI } = require("openai");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// 静的ファイルを公開
app.use(express.static(path.join(__dirname)));

// OpenAI 初期化
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// チャットエンドポイント
app.post("/chat", async (req, res) => {
  try {
    const { messages } = req.body;

    // 🔄 正しい位置で定義と同時にログ出力
    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: messages,
    });
    
    console.log("📦 chatCompletion:", chatCompletion); // ← この位置ならOK
    

    const reply = chatCompletion.choices?.[0]?.message?.content || "⚠️ 返信の取得に失敗しました";
    res.json({ reply });

  } catch (err) {
    console.error("❌ サーバーエラー:", err);
    res.status(500).json({ error: err.message });
  }
});

// HTMLを返す
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// サーバー起動
app.listen(PORT, () => {
  console.log(`✅ サーバー起動中: http://localhost:${PORT}`);
});
