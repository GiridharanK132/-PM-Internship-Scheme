from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Dict
from recommendation import get_recommendations

app = FastAPI()

class UserProfile(BaseModel):
    skills: List[str]
    interests: List[str]
    domain: str

class Internship(BaseModel):
    id: str
    title: str
    skills: List[str]
    description: str

class RecommendRequest(BaseModel):
    user: UserProfile
    internships: List[Internship]

@app.post("/recommend")
async def recommend(request: RecommendRequest):
    try:
        recommendations = get_recommendations(request.user, request.internships)
        return {"recommendations": recommendations}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
