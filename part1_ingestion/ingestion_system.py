import re
import numpy as np
from typing import List, Dict, Any
from collections import Counter

class KnowledgePyramid:
    """
    Implements a 4-layer Knowledge Pyramid for a document chunk.
    Layers: Raw Text, Chunk Summary, Category/Theme, Distilled Knowledge.
    """
    def __init__(self, raw_text: str, chunk_id: int):
        self.chunk_id = chunk_id
        self.raw_text = raw_text
        self.summary = self._generate_summary(raw_text)
        self.category = self._classify_category(raw_text)
        self.distilled_knowledge = self._extract_keywords(raw_text)
        
    def _generate_summary(self, text: str, max_sentences: int = 2) -> str:
        """Placeholder summarization taking the first N sentences."""
        sentences = re.split(r'(?<=[.!?]) +', text)
        return " ".join(sentences[:max_sentences]) + ("..." if len(sentences) > max_sentences else "")

    def _classify_category(self, text: str) -> str:
        """Rule-based classification for Category/Theme."""
        text_lower = text.lower()
        categories = {
            "Technical": ["algorithm", "code", "software", "api", "database", "system", "training"],
            "Business": ["market", "profit", "revenue", "strategy", "growth", "company"],
            "Legal": ["contract", "agreement", "law", "regulation", "legal", "compliance"],
            "Scientific": ["research", "experiment", "data", "hypothesis", "analysis", "result"]
        }
        
        scores = {cat: sum(1 for word in keywords if word in text_lower) for cat, keywords in categories.items()}
        best_cat = max(scores, key=scores.get)
        return best_cat if scores[best_cat] > 0 else "General"

    def _extract_keywords(self, text: str, top_n: int = 5) -> List[str]:
        """Simple keyword extraction (Distilled Knowledge)."""
        words = re.findall(r'\w+', text.lower())
        stopwords = {"the", "and", "is", "in", "to", "of", "a", "with", "for", "on", "as"}
        keywords = [word for word in words if word not in stopwords and len(word) > 3]
        return [k for k, v in Counter(keywords).most_common(top_n)]

    def to_dict(self) -> Dict[str, Any]:
        return {
            "chunk_id": self.chunk_id,
            "raw_text": self.raw_text,
            "summary": self.summary,
            "category": self.category,
            "distilled_knowledge": self.distilled_knowledge
        }

class DocumentIngestor:
    """
    Handles PDF/Text ingestion with a sliding window strategy and 
    Knowledge Pyramid construction.
    """
    def __init__(self, window_size: int = 2500, overlap: int = 500):
        self.window_size = window_size
        self.overlap = overlap
        self.pyramid_index: List[KnowledgePyramid] = []

    def process_text(self, text: str):
        """Applies sliding window and builds the pyramid."""
        self.pyramid_index = []
        start = 0
        chunk_id = 0
        
        while start < len(text):
            end = start + self.window_size
            chunk_content = text[start:end]
            
            # Create pyramid entry for this chunk
            pyramid = KnowledgePyramid(chunk_content, chunk_id)
            self.pyramid_index.append(pyramid)
            
            chunk_id += 1
            start += (self.window_size - self.overlap)
            
    def retrieve(self, query: str) -> Dict[str, Any]:
        """Simple semantic retrieval using fuzzy string matching (simulated)."""
        query_words = set(re.findall(r'\w+', query.lower()))
        best_match = None
        highest_score = -1
        matched_level = ""

        for entry in self.pyramid_index:
            # Check levels
            levels = {
                "raw_text": entry.raw_text,
                "summary": entry.summary,
                "category": entry.category,
                "distilled_knowledge": " ".join(entry.distilled_knowledge)
            }
            
            for level, content in levels.items():
                content_words = set(re.findall(r'\w+', content.lower()))
                # Jaccard similarity as a simple semantic measure
                if not content_words: continue
                score = len(query_words.intersection(content_words)) / len(query_words.union(content_words))
                
                if score > highest_score:
                    highest_score = score
                    best_match = entry
                    matched_level = level

        if best_match:
            return {
                "score": highest_score,
                "level": matched_level,
                "content": best_match.to_dict(),
                "chunk_id": best_match.chunk_id
            }
        return {"error": "No relevant match found"}

if __name__ == "__main__":
    # Example usage
    sample_text = """
    Llama 3.2 is a state-of-the-art large language model designed for reasoning and efficiency. 
    It supports various fine-tuning methods like LoRA (Low-Rank Adaptation) which reduces memory footprint. 
    In the context of document ingestion, sliding window strategies help maintain context across large texts. 
    The Knowledge Pyramid approach further distills this information into hierarchical layers for better retrieval.
    Vexoo Labs is pioneering AI engineering solutions that focus on modularity and scalability.
    """ * 10 # Repeat to simulate a larger document
    
    ingestor = DocumentIngestor(window_size=500, overlap=100)
    ingestor.process_text(sample_text)
    
    result = ingestor.retrieve("How does Llama 3.2 handle reasoning?")
    print(f"Retrieved from level: {result['level']}")
    print(f"Content: {result['content']['summary']}")
