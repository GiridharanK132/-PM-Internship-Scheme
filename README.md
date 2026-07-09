# PM Internship Recommendation Engine

A full-stack AI-powered web application that recommends suitable internships to students based on their skills, interests, and location.

## Technology Stack
- **Frontend**: React.js, Tailwind CSS, Lucide React, Axios, React Router.
- **Backend**: Node.js, Express.js, MongoDB (Mongoose), JWT.
- **AI Engine**: Python, FastAPI, Scikit-learn (TF-IDF, Cosine Similarity), Pandas.

## Features
- **Secure Authentication**: JWT-based login and signup.
- **AI Matching**: Matches student profiles with internship requirements using machine learning.
- **Modern Dashboard**: View all internships, filter by domain, and see top AI recommendations.
- **Detailed Listings**: View comprehensive information about each internship and "Apply" (mock).
- **Profile Management**: Update skills and interests to see better matches.

## Prerequisites
- Node.js (v18+)
- MongoDB (running locally or a cloud URI)
- Python 3.10+ (for AI Engine)

## Installation & Setup

### 1. Backend Setup
```bash
cd backend
npm install
# Create/Edit .env file with your variables (already provided)
node seed.js # To populate the database with 50+ internships
npm start
```

### 2. AI Engine Setup
```bash
cd .. # Go to project root
python -m venv venv
.\venv\Scripts\activate
pip install -r ai-engine/requirements.txt
python ai-engine/main.py
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## API Documentation
- `POST /api/auth/register`: Register a new student.
- `POST /api/auth/login`: Authenticate and get a JWT token.
- `GET /api/auth/user`: Get current user profile (Private).
- `GET /api/internships`: List all internships.
- `GET /api/internships/:id`: Get detailed information for an internship.
- `POST /api/internships/recommendations`: Get top 5 AI-matched internships (Private).

## AI Logic
The recommendation engine uses **TF-IDF (Term Frequency-Inverse Document Frequency)** to vectorize both student profiles and internship data. **Cosine Similarity** is then used to calculate the similarity score between the student's vector and each internship's vector, returning the top matches.
