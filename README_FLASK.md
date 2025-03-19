
# KnowAI Flask Application

This is a Flask-based implementation of the KnowAI application, providing similar functionality to the React version but built with Python Flask.

## Features

- Document ingestion and processing
- Code translation between programming languages 
- Conversational AI interface
- Azure OpenAI and AI Search integration
- Responsive web interface using Tailwind CSS

## Setup Instructions

1. Clone this repository

2. Create and activate a virtual environment (recommended):
```bash
# On Windows
python -m venv venv
venv\Scripts\activate

# On macOS/Linux
python3 -m venv venv
source venv/bin/activate
```

3. Install the required dependencies:
```bash
pip install -r requirements.txt
```

4. Run the Flask application:
```bash
python app.py
```

5. Open your browser and navigate to `http://127.0.0.1:5000`

## Project Structure

- `app.py` - Main Flask application 
- `templates/` - HTML templates
  - `base.html` - Base template with common elements
  - `index.html` - Landing page template
  - `dashboard.html` - Main application dashboard
- `uploads/` - Directory for storing uploaded files
- `static/` - Static files (not used in this basic implementation)

## Notes

This is a demonstration application and uses in-memory storage for documents, conversations, and configuration. In a production environment, you would want to:

1. Use a database like PostgreSQL or MongoDB for data persistence
2. Implement proper user authentication and authorization
3. Add proper error handling and logging
4. Use a production-ready WSGI server like Gunicorn
5. Implement actual integrations with Azure OpenAI and AI Search services

## Further Development

To enhance this application for production use:

1. Add a database layer using SQLAlchemy or another ORM
2. Implement user authentication with Flask-Login
3. Add proper file validation and security measures
4. Create actual Azure service integrations
5. Implement more robust error handling
6. Add unit and integration tests
