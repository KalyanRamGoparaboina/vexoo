# Deep-Dive: Vexoo Labs AI Engineering Project

This document provides the theoretical foundation and technical explanation for the systems implemented in this project.

## 1. Document Ingestion: The Sliding Window Strategy
Standard RAG systems often chunk documents based on single pages or fixed-length blocks. This is problematic:
- **Semantic Boundary Loss**: If a key fact is split across two chunks, the retriever might miss it.
- **Context Fragmentation**: Without overlap, the LLM loses the "connective tissue" of the text.

**Our Solution**: 
We implement a **2-page sliding window** (approx. 2500 characters). 
- **Overlap (500 chars)**: Each chunk contains the end of the previous chunk and the start of the next. This ensures that every semantic unit is represented in its full context in at least one chunk.

## 2. Knowledge Pyramid Architecture
This is a hierarchical RAG strategy designed to optimize retrieval speed and accuracy.

| Layer | Type | Theory |
| :--- | :--- | :--- |
| **Level 1: Distilled Knowledge** | Metadata | Compact keywords/entities. Fast search for specific terms. |
| **Level 2: Category/Theme** | Contextual | High-level labels (Technical, Legal). Used for initial routing/filtering. |
| **Level 3: Chunk Summary** | Semantic | A compressed version of the chunk. Best for matching intent and general queries. |
| **Level 4: Raw Text** | Source | The original data. Used for the final generation to ensure accuracy. |

**Retrieval Logic**: Our system performs a "pyramid search." It queries all four layers. Matches at higher levels (Distilled/Summary) are given higher priority because they represent the "essence" of the content rather than just a keyword match.

## 3. GSM8K Reasoning & LoRA
The project fine-tunes **Llama 3.2 1B** on the GSM8K dataset.

### Why LoRA (Low-Rank Adaptation)?
Fine-tuning a billion-parameter model normally requires massive VRAM. LoRA solves this by:
1.  **Freezing** the original weights of the model.
2.  **Adding Rank-Decomposition Matrices**: Injecting small trainable layers into the transformer's attention blocks (`q_proj`, `v_proj`).
3.  **Efficiency**: We only train ~1% of total parameters, allowing for rapid adaptation to mathematical reasoning without the "catastrophic forgetting" of general knowledge.

**The Training Objective**: We use **Supervised Fine-Tuning (SFT)** to teach the model to generate step-by-step "Chain of Thought" reasoning before outputting the final answer (formatted with the `####` delimiter standard in GSM8K).

## 4. Bonus: Reasoning-Aware Adapter Architecture
The "Reasoning-Aware" component is the most advanced part of the system.

### How it Works:
1.  **Query Analysis**: A router scrutinizes the prompt for domain keywords (e.g., "solve", "contract", "research").
2.  **Dynamic Weight Swapping**: Using the `peft` library, we swap between specialized LoRA weights (e.g., `math-lora`, `legal-lora`) on-the-fly.
3.  **Result**: A single model instance can act as a Math Expert, a Legal Expert, or a General Assistant without needing to run separate GPU instances for each task.

## 5. Modern Dashboard Design
The **React + Vite** dashboard serves as the observability layer. By visualizing the Knowledge Pyramid and the Neural Switch, we provide transparency into how the "black box" of the LLM is operating, which is a key requirement for enterprise AI engineering.
