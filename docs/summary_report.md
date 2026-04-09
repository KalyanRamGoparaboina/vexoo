# Summary Report: Vexoo Labs AI Engineer Assignment

**Author:** [Your Name]
**Date:** April 2026

## 1. Document Ingestion & Knowledge Pyramid
My approach focuses on creating a multi-level index that allows for both coarse and fine-grained retrieval.
- **Sliding Window**: Implemented a character-mapped sliding window (default 2500 chars) with a 500-char overlap. This ensures that semantic context split at boundaries is preserved in the adjacent window.
- **Knowledge Pyramid**:
    - **Raw Text**: Preserves original data.
    - **Chunk Summary**: Provides a quick semantic overview.
    - **Category Label**: Rule-based thematic tagging (Technical, Legal, etc.).
    - **Distilled Knowledge**: Keyword-based entity extraction.
- **Retrieval Strategy**: Uses Jaccard Similarity (simulated semantic match) across all four layers. This allows the system to find relevant sections even if the query is a summary or a specific keyword.

## 2. GSM8K Training Setup
The training module is designed for efficient fine-tuning of Llama 3.2 1B.
- **Dataset**: Loaded 3,000 training and 1,000 evaluation samples from OpenAI's GSM8K.
- **LoRA Config**: Used Rank ($r=8$) and Alpha ($32$) to adapt `q_proj` and `v_proj` layers, significantly reducing VRAM requirements.
- **Hyperparameters**: 2e-4 learning rate with 1 epoch and gradient accumulation to simulate larger batch sizes on consumer hardware.

## 3. Key Design Decisions
- **Modularity**: Separation of ingestion logic from the UI allows for easy integration into existing pipelines.
- **Scalability**: The pyramid structure is designed to be storage-efficient while improving retrieval speed by searching summaries first.
- **Safety**: Training script includes checks for GPU availability and uses 4-bit quantization where applicable.

## 4. Bonus: Reasoning-Aware Adapter
Designed a "Router-Adapter" architecture where a lightweight classification layer detects query intent (Math, Legal, General) and dynamically activates the corresponding LoRA weights. This allows a single model instance to switch expertise without retraining the full weights.
