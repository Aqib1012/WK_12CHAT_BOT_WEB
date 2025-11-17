// DOM Elements
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');
const clearBtn = document.getElementById('clearBtn');
const chatMessages = document.getElementById('chatMessages');
const loadingSpinner = document.getElementById('loadingSpinner');

// Event Listeners
sendBtn && sendBtn.addEventListener('click', sendMessage);
userInput && userInput.addEventListener('keydown', handleKeyPress);
clearBtn && clearBtn.addEventListener('click', clearChat);

// Auto-resize textarea
if (userInput) {
  userInput.addEventListener('input', () => {
    userInput.style.height = 'auto';
    userInput.style.height = Math.min(userInput.scrollHeight, 160) + 'px';
  });
}

function handleKeyPress(e){
  if(e.key === 'Enter' && !e.shiftKey){
    e.preventDefault();
    sendMessage();
  }
}

async function sendMessage(){
  if(!userInput) return;
  const text = userInput.value.trim();
  if(!text) return;

  // Remove welcome if present
  const welcome = document.querySelector('.welcome');
  if(welcome) welcome.remove();

  // Show user message
  addMessage(text, 'user');
  userInput.value = '';
  userInput.style.height = 'auto';
  
  // Show typing indicator
  const typingId = addTypingIndicator();
  
  sendBtn.disabled = true;
  showLoading();

  try{
    const res = await fetch('/api/chat', {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({message:text})
    });
    
    const data = await res.json();
    
    // Remove typing indicator
    removeTypingIndicator(typingId);
    
    if(res.ok){
      addMessage(data.response, 'assistant');
    } else {
      addMessage('⚠️ Error: '+(data.error||'Failed to get response'), 'assistant');
    }
  }catch(err){
    console.error(err);
    removeTypingIndicator(typingId);
    addMessage('❌ Error: Unable to reach server', 'assistant');
  }finally{
    hideLoading();
    sendBtn.disabled = false;
    userInput.focus();
  }
}

function addTypingIndicator(){
  const id = 'typing-' + Date.now();
  const wrap = document.createElement('div');
  wrap.className = 'message assistant';
  wrap.id = id;

  const avatar = document.createElement('div');
  avatar.className = 'avatar';
  avatar.innerHTML = '<i class="fas fa-robot"></i>';

  const bubble = document.createElement('div');
  bubble.className = 'bubble';
  bubble.innerHTML = '<div class="typing-dots"><span></span><span></span><span></span></div>';

  wrap.appendChild(avatar);
  wrap.appendChild(bubble);
  chatMessages.appendChild(wrap);
  chatMessages.scrollTop = chatMessages.scrollHeight;
  
  return id;
}

function removeTypingIndicator(id){
  const el = document.getElementById(id);
  if(el) el.remove();
}

function addMessage(text, role){
  const wrap = document.createElement('div');
  wrap.className = 'message '+(role==='user'?'user':'assistant');

  const avatar = document.createElement('div');
  avatar.className = 'avatar';
  avatar.innerHTML = role==='user'?'<i class="fas fa-user"></i>':'<i class="fas fa-robot"></i>';

  const bubble = document.createElement('div');
  bubble.className = 'bubble';
  bubble.innerHTML = sanitizeAndFormat(text);

  if(role==='user'){
    wrap.appendChild(bubble);
    wrap.appendChild(avatar);
  } else {
    wrap.appendChild(avatar);
    wrap.appendChild(bubble);
  }

  chatMessages.appendChild(wrap);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function sanitizeAndFormat(s){
  if(!s) return '';
  const esc = s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  // code blocks
  let out = esc.replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>');
  out = out.replace(/`([^`]+)`/g, '<code>$1</code>');
  out = out.replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>');
  out = out.replace(/\*(.*?)\*/g,'<em>$1</em>');
  out = out.replace(/\n/g,'<br>');
  out = out.replace(/\[(.*?)\]\((https?:\/\/[^)]+)\)/g,'<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
  return out;
}

function showLoading(){
  if(loadingSpinner){
    loadingSpinner.classList.remove('hidden');
    loadingSpinner.innerHTML = '<div class="spinner"></div><span>Thinking...</span>';
  }
}

function hideLoading(){
  if(loadingSpinner) loadingSpinner.classList.add('hidden');
}

// Clear chat
async function clearChat(){
  if(!confirm('Clear all chat history?')) return;
  try{
    await fetch('/api/clear-chat',{method:'POST'});
    if(chatMessages) {
      chatMessages.innerHTML = '<div class="welcome"><h2>Welcome 👋</h2><p class="muted">Start a conversation with Gemini.</p></div>';
    }
  }catch(e){
    console.error(e);
    alert('Failed to clear chat');
  }
}

// load history on open
window.addEventListener('load', async ()=>{
  try{
    const r = await fetch('/api/history');
    const j = await r.json();
    if(j.history && j.history.length){
      chatMessages.innerHTML = '';
      j.history.forEach(m=> addMessage(m.content, m.role));
    }
  }catch(e){console.warn('History load failed', e)}
});
// Theme toggle (simple)
function toggleTheme() {
    const isDark = document.body.classList.toggle('light-theme');
    if (themeToggle) {
        themeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    }
}

// Load chat history on page load
window.addEventListener('load', async () => {
    // Restore audio setting
    audioEnabled = (localStorage.getItem('soundEnabled') || 'true') === 'true';
    if (soundToggle) soundToggle.checked = audioEnabled;

    try {
        const response = await fetch('/api/history');
        const data = await response.json();

        if (data.history && data.history.length > 0 && chatMessages) {
            const welcomeMessage = chatMessages.querySelector('.welcome-message');
            if (welcomeMessage) welcomeMessage.remove();
            data.history.forEach(msg => addMessage(msg.content, msg.role === 'user' ? 'user' : 'assistant'));
        }
    } catch (error) {
        console.error('Error loading chat history:', error);
    }

    // Settings listeners
    if (messageDisplay) {
        messageDisplay.addEventListener('change', (e) => {
            const v = e.target.value;
            document.documentElement.setAttribute('data-message-display', v);
        });
    }
    if (soundToggle) {
        soundToggle.addEventListener('change', (e) => {
            audioEnabled = e.target.checked;
            localStorage.setItem('soundEnabled', audioEnabled);
        });
    }

    userInput && userInput.focus();
});
