# Bonus: Reasoning-Aware Adapter Architecture

## 1. Concept
The **Reasoning-Aware Adapter (RAA)** is a plug-and-play component designed to dynamically route queries to specialized LoRA (Low-Rank Adaptation) modules based on the input's domain. This prevents "task interference" where a model fine-tuned for math might lose its legal reasoning capabilities.

## 2. Architecture Components

### A. Intent Router (Classification Layer)
- **Role**: Analyzes the incoming query to categorize it.
- **Implementation**: A lightweight frozen encoder (e.g., DistilBERT) with a linear classification head. 
- **Output**: A vector of probabilities $[P_{math}, P_{legal}, P_{general}]$.

### B. Adaptive Weights (LoRA Bank)
- **Role**: Stores specialized knowledge.
- **Implementation**: Using the `peft` library's multi-adapter support.
  - `adapter_math`: Trained on GSM8K / MATH.
  - `adapter_legal`: Trained on CUAD / LegalBench.
  - `base_model`: The original Llama 3.2 1B weights.

### C. Dynamic Dispatcher
- **Role**: Swaps active adapters in real-time.
- **Logic**:
  ```python
  def route_query(query):
      intent = router.predict(query)
      if intent == "math":
          model.set_adapter("adapter_math")
      elif intent == "legal":
          model.set_adapter("adapter_legal")
      else:
          model.disable_adapter()
      return model.generate(query)
  ```

## 3. Advantages
- **Efficiency**: Only 1% of parameters are active/specialized, keeping inference fast.
- **Modularity**: New domains (e.g., "Medical") can be added by simply training a new LoRA and updating the router.
- **Scalability**: One base model serves multiple expert functions.
