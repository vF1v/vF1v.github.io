const sendBtn = document.getElementById("sendBtn");
const userInput = document.getElementById("userInput");
const chatBox = document.getElementById("chatBox");
const typing = document.getElementById("typing");

const responses = [
  "Interesting question.",
  "I understand.",
  "Tell me more.",
  "That sounds cool.",
  "SmartAI is thinking about that.",
  "Can you explain further?",
  "I like your idea.",
  "That's awesome.",
  "I'm not connected to real AI yet."
];

function sendMessage(){

  const text = userInput.value.trim();

  if(text === "") return;

  // User message
  const userMsg = document.createElement("div");
  userMsg.className = "message user";
  userMsg.textContent = text;

  chatBox.appendChild(userMsg);

  userInput.value = "";

  chatBox.scrollTop = chatBox.scrollHeight;

  // Typing animation
  typing.style.display = "block";

  setTimeout(() => {

    typing.style.display = "none";

    // AI response
    const aiMsg = document.createElement("div");
    aiMsg.className = "message ai";

    const randomReply =
      responses[Math.floor(Math.random() * responses.length)];

    aiMsg.textContent = randomReply;

    chatBox.appendChild(aiMsg);

    chatBox.scrollTop = chatBox.scrollHeight;

  }, 1200);

}

sendBtn.addEventListener("click", sendMessage);

userInput.addEventListener("keypress", function(e){
  if(e.key === "Enter"){
    sendMessage();
  }
});

document.getElementById("newChat").addEventListener("click", () => {

  chatBox.innerHTML = `
    <div class="message ai">
      New chat started.
    </div>
  `;

});