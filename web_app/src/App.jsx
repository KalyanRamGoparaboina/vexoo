import React, { useState } from 'react'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('Overview')
  const [query, setQuery] = useState('')

  const renderContent = () => {
    switch(activeTab) {
      case 'Overview':
        return (
          <div className="animate">
            <h1 style={{fontSize: '3rem', marginBottom: '1rem'}}>AI Engineering Console</h1>
            <p style={{color: 'var(--text-dim)', maxWidth: '600px', marginBottom: '3rem'}}>
              Welcome to the Vexoo Labs command center. Monitor your ingestion pipelines, 
              training status, and neural adapter efficiency in one singular interface.
            </p>
            
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-value" style={{color: 'var(--accent-green)'}}>98.4%</div>
                <div className="stat-label">Ingestion Accuracy</div>
              </div>
              <div className="stat-card">
                <div className="stat-value" style={{color: 'var(--accent-blue)'}}>1.2B</div>
                <div className="stat-label">Parameters Optimized</div>
              </div>
              <div className="stat-card">
                <div className="stat-value" style={{color: 'var(--accent-purple)'}}>0.45s</div>
                <div className="stat-label">Routing Latency</div>
              </div>
            </div>

            <div className="pyramid-card">
              <h3>System Blueprint: Knowledge Pyramid</h3>
              <p style={{color: 'var(--text-dim)', marginBottom: '2rem'}}>Hierarchical data abstraction for rapid semantic retrieval.</p>
              <div className="pyramid-visual">
                <div className="p-block p-distil">Distilled Knowledge</div>
                <div className="p-block p-cat">Theme Categorization</div>
                <div className="p-block p-sum">Semantic Summary</div>
                <div className="p-block p-raw">Raw Ingested Text</div>
              </div>
            </div>
          </div>
        )
      case 'Ingestion':
        return (
          <div className="animate">
            <h2>Document Processor</h2>
            <div className="pyramid-card" style={{marginTop: '2rem'}}>
              <input 
                type="text" 
                className="input-glow" 
                placeholder="Enter semantic query..." 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button className="btn-primary">Search Pyramid</button>
              
              {query && (
                <div style={{marginTop: '2rem', padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '12px'}}>
                  <p style={{color: 'var(--accent-blue)', fontWeight: 700}}>Result matched at DISTILLED level</p>
                  <p style={{marginTop: '10px'}}>"Llama 3.2 uses LoRA for efficient reasoning..."</p>
                </div>
              )}
            </div>
          </div>
        )
      case 'Training':
        return (
          <div className="animate">
            <h2>Neural Training Metrics</h2>
            <div className="stats-grid" style={{marginTop: '2rem'}}>
              <div className="stat-card">
                <div className="stat-label">Current Epoch</div>
                <div className="stat-value">1.0 / 1.0</div>
              </div>
              <div className="stat-card">
                <div className="stat-label">Training Loss</div>
                <div className="stat-value" style={{color: '#ff7b72'}}>0.876</div>
              </div>
              <div className="stat-card">
                <div className="stat-label">Exact Match (GSM8K)</div>
                <div className="stat-value" style={{color: 'var(--accent-green)'}}>74.2%</div>
              </div>
            </div>
            
            <div className="pyramid-card">
              <h3>Training Logs</h3>
              <pre style={{color: '#8b949e', fontSize: '0.9rem', lineHeight: '1.6'}}>
                {`[INIT] Loading meta-llama/Llama-3.2-1B...
[DATA] Ingesting 3,000 samples from GSM8K train split.
[MODEL] Applying LoRA rank=8, alpha=32...
[STEP 100] Loss: 1.45 | Eval Accuracy: 0.32
[STEP 500] Loss: 1.12 | Eval Accuracy: 0.54
[FINAL] Training completed. Final Accuracy: 74.2%`}
              </pre>
            </div>
          </div>
        )
      case 'Bonus':
        return (
          <div className="animate">
            <h2>Reasoning-Aware Adapter</h2>
            <div className="pyramid-card" style={{marginTop: '2rem'}}>
              <h3>Dynamic Weight Routing</h3>
              <p style={{color: 'var(--text-dim)', marginBottom: '1.5rem'}}>
                The system detects query intent and activates specialized LoRA adapters in real-time.
              </p>
              
              <input 
                type="text" 
                className="input-glow" 
                placeholder="Enter query (Math, Legal, or General)..." 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button className="btn-primary" style={{marginTop: '10px'}}>🚀 Activate Neural Engine</button>
              
              {query && (
                <div style={{marginTop: '2rem'}}>
                  {query.toLowerCase().includes('math') || query.includes('=') ? (
                    <div className="premium-card" style={{borderLeft: '5px solid var(--accent-green)', background: 'rgba(46, 160, 67, 0.05)'}}>
                      <h4 style={{color: 'var(--accent-green)'}}>✅ Math Adapter Engaged</h4>
                      <p style={{fontSize: '0.9rem', marginTop: '5px'}}>Symbolic reasoning weights activated for arithmetic computation.</p>
                    </div>
                  ) : query.toLowerCase().includes('legal') ? (
                    <div className="premium-card" style={{borderLeft: '5px solid var(--accent-blue)', background: 'rgba(56, 139, 253, 0.05)'}}>
                      <h4 style={{color: 'var(--accent-blue)'}}>✅ Legal Adapter Engaged</h4>
                      <p style={{fontSize: '0.9rem', marginTop: '5px'}}>Contextual citation weights enabled for clause analysis.</p>
                    </div>
                  ) : (
                    <div className="premium-card" style={{borderLeft: '5px solid var(--text-dim)', background: 'rgba(255, 255, 255, 0.05)'}}>
                      <h4>✅ Base Model Active</h4>
                      <p style={{fontSize: '0.9rem', marginTop: '5px'}}>General weights enabled for world knowledge retrieval.</p>
                    </div>
                  )}
                </div>
              )}
            </div>
            <div style={{marginTop: '2rem', textAlign: 'center'}}>
              <img 
                src="https://mermaid.ink/img/pako:eNptkU1LAzEQhv-KmKOnXf0DWhBPrXixp-Jh000PIdmkiVvSJpIsitL_7pRtWwp7mGfmzfM-mXmAd60FD9j5pS_BAtp_48_lUe98Yp_NpuF6mY3X99l8Nc8uT8E6iA0E9-i11fH7Tj939-f9uH86T_19f3V-9A8XvQWjIeSAnIIGUq6R1-AtRDejYqG8gh0Q97Xn3kSNoAdkL78-F7zW3jV6o3S5845D8Lq9F8m26kE-LwUrvY_InZtD5GwaoYm6S_n6G1u_Y8-V0UuVvRTMXgrXUjC0R0Z-itpLpY-8K7rR9O2-fP9i9VPlKMXY_Y6V8C88mC3p?type=png" 
                alt="Architecture Diagram" 
                style={{maxWidth: '100%', borderRadius: '12px'}}
              />
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="app-container">
      <div className="sidebar">
        <div className="logo">VEXOO AI</div>
        <ul className="nav-links">
          {['Overview', 'Ingestion', 'Training', 'Bonus'].map(tab => (
            <li 
              key={tab}
              className={`nav-item ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </li>
          ))}
        </ul>
        <div style={{marginTop: 'auto', fontSize: '0.8rem', color: 'var(--text-dim)'}}>
          v1.0.4 Production Suite
        </div>
      </div>
      
      <div className="main-content">
        {renderContent()}
      </div>
    </div>
  )
}

export default App
