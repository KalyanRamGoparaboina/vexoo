# Vexoo Labs AI Engineer Assignment

This repository contains the implementation for the Vexoo Labs AI Engineer assignment.

## Project Structure
- `part1_ingestion/`: Ingestion system with Sliding Window and Knowledge Pyramid.
- `part2_training/`: LoRA-based fine-tuning script for GSM8K with Llama 3.2 1B.
- `app/`: Streamlit dashboard for visualizing the results.
- `docs/`: Summary report and detailed architecture documents.

## Setup Instructions

1. **Install Dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

2. **Run the Dashboard**:
   ```bash
   streamlit run app/main.py
   ```

3. **Run Training (Part 2)**:
   Ensure you have access to Llama 3.2 on Hugging Face and a GPU.
   ```bash
   python part2_training/train_gsm8k.py
   ```

## Key Features
- **Sliding Window**: Context-aware chunking with configurable overlap.
- **Knowledge Pyramid**: 4-layer abstraction for efficient RAG.
- **LoRA Fine-tuning**: Industrial-grade training script for reasoning models.
- **Reasoning Router**: Conceptual architecture for multi-adapter LLM systems.
