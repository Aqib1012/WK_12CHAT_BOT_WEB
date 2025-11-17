from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

# Configure Gemini API
GEMINI_API_KEY = os.getenv('GEMINI_API_KEY')
if not GEMINI_API_KEY:
    raise ValueError("GEMINI_API_KEY environment variable not set")

genai.configure(api_key=GEMINI_API_KEY)

# System prompt for personality and behavior
SYSTEM_PROMPT = """You are a helpful, professional AI assistant. 
- Respond concisely but thoroughly
- Use markdown formatting for code and emphasis
- Be friendly and conversational
- Provide practical, actionable advice
- Ask clarifying questions when needed"""

model = genai.GenerativeModel('gemini-2.5-flash')

# Store chat history
chat_history = []

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/chat', methods=['POST'])
def chat():
    try:
        data = request.json
        user_message = data.get('message', '').strip()
        
        if not user_message:
            return jsonify({'error': 'Message cannot be empty'}), 400
        
        if len(user_message) > 5000:
            return jsonify({'error': 'Message too long (max 5000 chars)'}), 400
        
        # Add user message to history
        chat_history.append({
            'role': 'user',
            'content': user_message
        })
        
        # Build conversation history with system prompt
        history = []
        
        # Add system prompt as first message if this is the start
        if len(chat_history) == 1:
            history.append({
                'role': 'user',
                'parts': SYSTEM_PROMPT
            })
            history.append({
                'role': 'model',
                'parts': 'Understood. I will follow these guidelines.'
            })
        
        # Add previous messages
        for msg in chat_history[:-1]:
            history.append({
                'role': 'user' if msg['role'] == 'user' else 'model',
                'parts': msg['content']
            })
        
        # Create conversation and send message
        conversation = model.start_chat(history=history)
        response = conversation.send_message(user_message)
        assistant_message = response.text
        
        # Add assistant response to history
        chat_history.append({
            'role': 'assistant',
            'content': assistant_message
        })
        
        return jsonify({
            'response': assistant_message,
            'status': 'success'
        }), 200
        
    except Exception as e:
        error_msg = str(e)
        print(f"Chat Error: {error_msg}")
        return jsonify({
            'error': 'Failed to get response. Please try again.',
            'status': 'error'
        }), 500

@app.route('/api/clear-chat', methods=['POST'])
def clear_chat():
    global chat_history
    chat_history = []
    return jsonify({'status': 'success', 'message': 'Chat history cleared'})

@app.route('/api/history', methods=['GET'])
def get_history():
    return jsonify({'history': chat_history})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
