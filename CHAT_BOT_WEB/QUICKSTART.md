# 🚀 Quick Start Guide

## Step 1: Get Your API Key (2 minutes)
1. Open: https://makersuite.google.com/app/apikey
2. Click "Get API Key" button
3. Select "Create API key in new project"
4. Copy the key

## Step 2: Setup Environment (1 minute)
```bash
# Navigate to project directory
cd C:\Users\aqibr\OneDrive\Desktop\WK12\CHAT_BOT_WEB

# Create .env file
copy .env.example .env

# Edit .env and paste your API key:
# GEMINI_API_KEY=your_key_here
```

## Step 3: Install Dependencies (2-3 minutes)
```bash
pip install -r requirements.txt
```

## Step 4: Run the App (30 seconds)
```bash
python app.py
```

You'll see:
```
 * Running on http://127.0.0.1:5000
 * Press CTRL+C to quit
```

## Step 5: Open in Browser
Visit: http://localhost:5000

## 🎉 Done!

Start chatting with your AI assistant!

---

## 💡 Tips

- Type a message and press Enter to send
- Press Shift+Enter to create a new line
- Click the trash icon to clear chat history
- The chat persists during the session

## ⚠️ Common Issues

**"Module not found" error?**
- Make sure you ran: `pip install -r requirements.txt`

**"API key invalid"?**
- Check your .env file has the correct key
- Restart Flask server

**"Port already in use"?**
- Change port in app.py line 64: `port=5001`

## 📞 Need Help?

Check the README.md file for detailed documentation!

---

Enjoy your AI ChatBot! 🤖✨
