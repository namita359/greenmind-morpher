
from flask import Flask, render_template, request, jsonify, redirect, url_for, session
from werkzeug.utils import secure_filename
import os
import uuid
import json
from datetime import datetime
import time

app = Flask(__name__)
app.secret_key = os.urandom(24)  # For session management
app.config['UPLOAD_FOLDER'] = 'uploads'
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max upload size
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

# Mock storage (in a production app, use a database)
documents = []
conversations = []
azure_config = {
    'openAiEndpoint': '',
    'openAiKey': '',
    'aiSearchEndpoint': '',
    'aiSearchKey': '',
    'isConfigured': False
}

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/app')
def dashboard():
    return render_template('dashboard.html')

@app.route('/api/documents/upload', methods=['POST'])
def upload_document():
    if 'file' not in request.files:
        return jsonify({'success': False, 'error': 'No file part'}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({'success': False, 'error': 'No selected file'}), 400
    
    if file:
        filename = secure_filename(file.filename)
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)
        
        doc_id = str(uuid.uuid4())
        document = {
            'id': doc_id,
            'name': filename,
            'size': os.path.getsize(file_path),
            'type': file.content_type,
            'uploadedAt': datetime.now().isoformat(),
            'status': 'ready',
        }
        documents.append(document)
        
        return jsonify({'success': True, 'document': document}), 200

@app.route('/api/documents/process', methods=['POST'])
def process_documents():
    # Simulate processing delay
    time.sleep(2)
    
    # Update status for all documents
    for doc in documents:
        doc['status'] = 'processed'
    
    return jsonify({'success': True, 'message': f'{len(documents)} documents processed'}), 200

@app.route('/api/documents', methods=['GET'])
def get_documents():
    return jsonify(documents)

@app.route('/api/documents/<document_id>', methods=['DELETE'])
def delete_document(document_id):
    global documents
    documents = [doc for doc in documents if doc['id'] != document_id]
    return jsonify({'success': True}), 200

@app.route('/api/conversation/start', methods=['POST'])
def start_conversation():
    conv_id = str(uuid.uuid4())
    new_conversation = {
        'id': conv_id,
        'title': 'New Conversation',
        'messages': [],
        'createdAt': datetime.now().isoformat(),
        'updatedAt': datetime.now().isoformat(),
    }
    conversations.append(new_conversation)
    return jsonify(new_conversation), 200

@app.route('/api/conversation/<conv_id>/message', methods=['POST'])
def send_message(conv_id):
    data = request.json
    message_content = data.get('content', '')
    
    # Find the conversation
    conversation = next((c for c in conversations if c['id'] == conv_id), None)
    if not conversation:
        return jsonify({'error': 'Conversation not found'}), 404
    
    # Add user message
    user_message = {
        'id': str(uuid.uuid4()),
        'role': 'user',
        'content': message_content,
        'timestamp': datetime.now().isoformat(),
    }
    conversation['messages'].append(user_message)
    
    # Simulate AI response
    time.sleep(1)
    
    # Add AI response
    ai_message = {
        'id': str(uuid.uuid4()),
        'role': 'assistant',
        'content': f"This is a simulated response to: \"{message_content}\". In production, this would call Azure OpenAI.",
        'timestamp': datetime.now().isoformat(),
    }
    conversation['messages'].append(ai_message)
    
    # Update conversation title if it's the first message
    if len(conversation['messages']) == 2:
        conversation['title'] = message_content[:30] + "..."
    
    conversation['updatedAt'] = datetime.now().isoformat()
    
    return jsonify({
        'success': True,
        'conversation': conversation,
        'message': ai_message
    }), 200

@app.route('/api/conversations', methods=['GET'])
def get_conversations():
    return jsonify(conversations)

@app.route('/api/conversation/<conv_id>', methods=['GET'])
def get_conversation(conv_id):
    conversation = next((c for c in conversations if c['id'] == conv_id), None)
    if not conversation:
        return jsonify({'error': 'Conversation not found'}), 404
    return jsonify(conversation), 200

@app.route('/api/conversation/<conv_id>', methods=['DELETE'])
def delete_conversation(conv_id):
    global conversations
    conversations = [c for c in conversations if c['id'] != conv_id]
    return jsonify({'success': True}), 200

@app.route('/api/translate-code', methods=['POST'])
def translate_code():
    data = request.json
    source_code = data.get('sourceCode', '')
    source_language = data.get('sourceLanguage', '')
    target_language = data.get('targetLanguage', '')
    
    # Simulate processing delay
    time.sleep(2)
    
    # Mock translation result
    result = {
        'targetCode': f"# Translated from {source_language} to {target_language}\n" +
                     f"# Original code: {source_code[:50]}...\n\n" +
                     f"print(\"This is a simulated translation. In production, this would use Azure OpenAI.\")",
        'explanation': f"This is a simulated explanation of the translation from {source_language} to {target_language}."
    }
    
    return jsonify(result), 200

@app.route('/api/azure-config', methods=['GET'])
def get_azure_config():
    return jsonify(azure_config)

@app.route('/api/azure-config', methods=['POST'])
def update_azure_config():
    data = request.json
    global azure_config
    
    azure_config.update(data)
    azure_config['isConfigured'] = all([
        azure_config.get('openAiEndpoint'),
        azure_config.get('openAiKey'),
        azure_config.get('aiSearchEndpoint'),
        azure_config.get('aiSearchKey')
    ])
    
    return jsonify(azure_config), 200

@app.route('/api/azure-config/test', methods=['POST'])
def test_azure_config():
    # Simulate connection test
    time.sleep(1.5)
    return jsonify({'success': True}), 200

if __name__ == '__main__':
    app.run(debug=True)
