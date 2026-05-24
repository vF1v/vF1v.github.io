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

  // USER MESSAGE

  const userMsg = document.createElement("div");

  userMsg.className = "message user";

  userMsg.textContent = text;

  chatBox.appendChild(userMsg);

  userInput.value = "";

  chatBox.scrollTop = chatBox.scrollHeight;

  // SHOW TYPING

  typing.style.display = "block";

  setTimeout(() => {

    typing.style.display = "none";

    // AI MESSAGE

    const aiMsg = document.createElement("div");

    aiMsg.className = "message ai";

    let randomReply = "";

    if(text.toLowerCase().includes("hello")){
      randomReply = "Hello there!";
    }
    else if(text.toLowerCase().includes("how are you")){
      randomReply = "I'm doing great.";
    }
    else if(text.toLowerCase().includes("who made you")){
      randomReply = "vF1v created me.";
    }
    else{
      randomReply =
      responses[Math.floor(Math.random() * responses.length)];
    }

    aiMsg.textContent = randomReply;

    chatBox.appendChild(aiMsg);

    chatBox.scrollTop = chatBox.scrollHeight;

  }, 1200);

}

// SEND BUTTON

sendBtn.addEventListener("click", sendMessage);

// ENTER KEY

userInput.addEventListener("keypress", function(e){

  if(e.key === "Enter"){
    sendMessage();
  }

});

// NEW CHAT BUTTON

document.getElementById("newChat").addEventListener("click", () => {

  chatBox.innerHTML = `
    <div class="message ai">
      New chat started.
    </div>
  `;

});
