# 🤖 Modern AI ChatBot Website

A beautiful, modern chatbot website powered by Google's Gemini API. Built with Flask backend and responsive HTML/CSS/JavaScript frontend.

## ✨ Features

- **Modern UI**: Beautiful gradient design with smooth animations
- **Gemini AI Integration**: Powered by Google's latest generative AI model
- **Real-time Chat**: Instant responses from the Gemini API
- **Chat History**: Maintains conversation history during the session
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Dark Mode**: Eye-friendly dark theme
- **Auto-scrolling**: Automatically scrolls to latest messages
- **Loading States**: Visual feedback while waiting for responses
- **Markdown Support**: Supports bold, italic, code, and links in responses

## 📋 Prerequisites

- Python 3.8 or higher
- pip (Python package manager)
- A Google Gemini API key

## 🚀 Setup Instructions

### 1. Get Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Click "Get API Key"
3. Create a new API key and copy it

### 2. Install Dependencies

```bash
pip install -r requirements.txt
```

### 3. Configure Environment

1. Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

2. Edit `.env` and add your Gemini API key:
```
GEMINI_API_KEY=your_actual_api_key_here
```

### 4. Run the Application

```bash
python app.py
```

The application will start on `http://localhost:5000`

## 📁 Project Structure

```
CHAT_BOT_WEB/
├── app.py                 # Flask backend with Gemini API integration
├── requirements.txt       # Python dependencies
├── .env.example          # Environment variables template
├── .env                  # Your environment variables (create from .env.example)
├── templates/
│   └── index.html        # Main HTML template
└── static/
    ├── style.css         # Styling (modern gradient design)
    └── script.js         # Frontend JavaScript logic
```

## 🎨 Design Features

- **Gradient Backgrounds**: Modern gradient color scheme
- **Animated Elements**: Smooth fade-ins and floating animations
- **Interactive Buttons**: Hover effects and smooth transitions
- **Custom Scrollbar**: Styled scrollbar matching the theme
- **Message Bubbles**: User and AI messages with different styling
- **Dark Theme**: Reduces eye strain in low-light environments

## 🔧 API Endpoints

- `GET /` - Main chat interface
- `POST /api/chat` - Send message and get AI response
  - Request: `{ "message": "Your message" }`
  - Response: `{ "response": "AI response", "status": "success" }`
- `POST /api/clear-chat` - Clear chat history
- `GET /api/history` - Get chat history

## ⌨️ Keyboard Shortcuts

- **Enter**: Send message
- **Shift + Enter**: Add new line in input field

## 🛠️ Technologies Used

- **Backend**: Flask, Python
- **Frontend**: HTML5, CSS3, JavaScript
- **AI**: Google Gemini API
- **Database**: In-memory (session-based)

## 📱 Responsive Breakpoints

- Desktop: 900px max-width
- Tablet: Up to 768px
- Mobile: Up to 480px

## 🔐 Security Notes

- Never commit your `.env` file to version control
- Keep your Gemini API key secret
- The `.gitignore` file should include `.env`

## 📝 Customization

You can customize:
- Colors: Edit CSS variables in `static/style.css`
- Model: Change the model in `app.py` (line 21)
- System prompt: Add personality to the AI
- UI Layout: Modify `templates/index.html`

## 🐛 Troubleshooting

### "GEMINI_API_KEY environment variable not set"
- Make sure you've created `.env` file
- Verify the API key is correctly added
- Restart the Flask server

### "Connection refused"
- Make sure Flask is running on port 5000
- Check if port 5000 is available
- Try a different port by modifying `app.py`

### "Invalid API Key"
- Verify your API key is correct
- Check if the key has expired
- Generate a new key from Google AI Studio

## 📚 Learn More

- [Google Generative AI Docs](https://ai.google.dev/docs)
- [Flask Documentation](https://flask.palletsprojects.com/)
- [MDN Web Docs](https://developer.mozilla.org/)

## 📄 License

This project is open source and available for personal and educational use.

---

Made with ❤️ using Flask and Gemini API
