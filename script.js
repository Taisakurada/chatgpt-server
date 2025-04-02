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
