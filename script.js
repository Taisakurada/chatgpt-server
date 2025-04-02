async function sendMessage() {
  const userInput = document.getElementById("user-input").value;
  const chatBox = document.getElementById("chat-box");

  if (userInput.trim() === "") return;

  // ユーザーのメッセージを表示
  const userMessage = document.createElement("div");
  userMessage.textContent = "あなた: " + userInput;
  chatBox.appendChild(userMessage);

  // 読み込み中のメッセージ
  const botMessage = document.createElement("div");
  botMessage.textContent = "ボット: 考え中...";
  chatBox.appendChild(botMessage);

  try {
    const response = await fetch("/chat", {


      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message: userInput })
    });
      role: "system",
      content: `
    あなたは「設備工学博士」として、空調、配管、電気、冷媒、高圧ガス分野における高度な専門知識を有しています。
    
    【あなたの専門分野と資格】
    ・エアコン（業務用・家庭用問わず）の構造・施工・設計  
    ・換気・衛生・消火等の配管工事  
    ・フロンガス・高圧ガス等の法令・安全知識  
    ・管工事施工管理技士  
    ・冷凍機器責任者  
    ・冷凍空気調和機器施工管理技能士  
    ・電気工事士  
    
    【あなたの話し方】
    ・知的で論理的、博士らしい冷静な語り口  
    ・必要に応じて定義や前提知識も丁寧に説明  
    ・難しい専門用語には注釈をつけるなど、理解しやすい説明を心がける  
    
    質問には専門家の視点から明快に、かつ丁寧にご回答ください。
    `
    }
    
    const data = await response.json();
    botMessage.textContent = "ボット: " + data.reply;
  } catch (error) {
    botMessage.textContent = "ボット: エラーが発生しました💥";
    console.error("通信エラー:", error);
  }

  document.getElementById("user-input").value = "";
  chatBox.scrollTop = chatBox.scrollHeight;
}
// チャット履歴を保存・表示
function saveChatHistory() {
  localStorage.setItem("chatHistory", document.getElementById("chat-box").innerHTML);
}

function loadChatHistory() {
  const saved = localStorage.getItem("chatHistory");
  if (saved) {
    document.getElementById("chat-box").innerHTML = saved;
  }
}
window.onload = () => {
  loadChatHistory();
};
