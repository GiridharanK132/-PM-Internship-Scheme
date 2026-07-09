import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

def get_recommendations(user, internships):
    if not internships:
        return []

    # Prepare data for TF-IDF
    inter_data = []
    for inter in internships:
        # Combine title, skills and description for a richer feature set
        text = f"{inter.title} {' '.join(inter.skills)} {inter.description}"
        inter_data.append({
            'id': inter.id,
            'text': text
        })

    df = pd.DataFrame(inter_data)
    
    # User text
    user_text = f"{user.domain} {' '.join(user.skills)} {' '.join(user.interests)}"
    
    # Add user to the end of the dataframe for vectorization
    texts = df['text'].tolist() + [user_text]
    
    # TF-IDF Vectorization
    tfidf = TfidfVectorizer(stop_words='english')
    tfidf_matrix = tfidf.fit_transform(texts)
    
    # Cosine Similarity
    # Compare the last row (user) with all other rows (internships)
    cosine_sim = cosine_similarity(tfidf_matrix[-1], tfidf_matrix[:-1])
    
    # Get top 5 indices
    sim_scores = list(enumerate(cosine_sim[0]))
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
    
    top_indices = [i[0] for i in sim_scores[:5]]
    
    recommended_ids = df.iloc[top_indices]['id'].tolist()
    
    return recommended_ids
