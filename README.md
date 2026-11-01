# DigGit (`dig-git`)
> **Dig into Git Repositories**: Interactive architectural network visualization, cloud-native zero-disk in-memory streaming, and commit-history grounded AI context.

[![Live Web Application](https://img.shields.io/badge/Vercel-Live_App-000000?style=for-the-badge&logo=vercel)](https://diggit-raghav8218s-projects.vercel.app)
[![API Engine](https://img.shields.io/badge/Render-FastAPI_Backend-46E3B7?style=for-the-badge&logo=render)](https://diggit-backend.onrender.com)
[![GitHub Repository](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github)](https://github.com/raghav8218/diggit)

---

## 📌 Project Links & Deliverables

- **Public Code Repository**: [https://github.com/raghav8218/diggit](https://github.com/raghav8218/diggit)
- **Live Deployment**: [https://diggit-raghav8218s-projects.vercel.app](https://diggit-raghav8218s-projects.vercel.app)
- **Project Documentation & Presentation Deck**: [View Project Deck (Google Drive / PDF)](https://drive.google.com/drive/folders/diggit-project-deck) <!-- Replace with your public Google Drive / Canva link -->
- **Product Demonstration Video**: [Watch Demo Video (YouTube / Drive)](https://youtu.be/diggit-product-demo) <!-- Replace with your public video link -->

---

## 👥 Team Members & Contributions

| Member | Role | Key Contributions |
| :--- | :--- | :--- |
| **Raghav Sharma** | Lead Architect & Full-Stack Engineer | End-to-end system design; zero-disk in-memory streaming tarball pipeline; AST parsing (`tree-sitter`, Python `ast`); PyCG call graph resolution; NetworkX graph engine & PageRank keystones; SQLite WAL persistence schema; FastAPI backend; React/Vite frontend UI & SVG convex hull clustering; Vercel & Render cloud deployments. |
| **Shivang Kumar** | Research & Documentation | Domain research on software visual architecture; comparative analysis of CodeScene and Code2flow; test repository benchmarking and evaluation; documentation and presentation materials. |

---

## 📖 Table of Contents
1. [Introduction & Problem Statement](#-introduction--problem-statement)
2. [Key Objectives](#-key-objectives)
3. [System Architecture & Methodology](#-system-architecture--methodology)
4. [Core Features](#-core-features)
5. [Results & Benchmark Evaluation](#-results--benchmark-evaluation)
6. [Local Setup & Installation](#-local-setup--installation)
7. [Cloud Deployment Architecture](#-cloud-deployment-architecture)
8. [API Reference](#-api-reference)
9. [Key Findings & Learnings](#-key-findings--learnings)

---

## 🔍 Introduction & Problem Statement

### The Problem
Onboarding onto an unfamiliar or legacy software repository is notoriously difficult. Developers face:
- **Cognitive Overload**: Thousands of source lines, functions, and deeply nested modules without high-level architectural visibility.
- **Mental Disconnect from History**: Traditional static analysis tools ignore git commit churn, making it impossible to distinguish between stable core utilities and active maintenance hotspots.
- **Heavy Infrastructure Overhead**: Traditional code scanners require cloning multi-gigabyte repositories onto disk, consuming storage and posing security risks on shared machines.

### The Solution: DigGit
**DigGit** is an interactive, browser-based code intelligence platform. By simply inputting a public GitHub repository URL, DigGit:
1. Streams source code directly from GitHub CDN into RAM (**Zero-Disk Extraction**).
2. Parses syntax trees (ASTs) for Python, JavaScript, and TypeScript in memory.
3. Builds an interactive compound dependency graph with automated module clustering and CodeScene-inspired churn metrics.
4. Provides an AI Architectural Assistant grounded simultaneously in code syntax and git commit history via Google Gemini.

---

## 🎯 Key Objectives

- **Zero-Disk Ingestion**: Ingest and process git repositories directly via memory buffers (`io.BytesIO`) without writing temporary files to hard drives.
- **Compound Graph Architecture**: Construct directed graphs of classes, functions, and route handlers with PyCG-style call resolution.
- **Progressive Semantic Disclosure**: Mitigate graph clutter with three viewing scales:
  - **Backbone View**: Top-level classes, keystones, and API endpoints.
  - **Module Focus**: Isolated subsystem subgraphs.
  - **All Symbols View**: Comprehensive dependency exploration.
- **Git Churn & Blame Overlays**: Highlight maintenance hotspots (CodeScene metric: $\text{Complexity} \times \log_2(\text{Churn} + 1)$) and per-function blame history.
- **Architectural Keystone Detection**: Apply NetworkX PageRank and in-degree centrality to identify system-critical keystone symbols.
- **Downstream Blast Radius Tracing**: Interactive BFS traversal illustrating call cascades from any selected entry point.
- **Grounded Conversational AI**: Multi-turn Q&A powered by Google Gemini, grounded in AST symbol definitions and recent commits.

---

## 🏗️ System Architecture & Methodology

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              CLIENT TIER (Vercel)                          │
│                                                                             │
│   React 18 SPA + Vite  •  D3-Force / Custom Layout Engine  •  CSS Variables │
│   ├─ Dashboard View (Instant Cached SQLite Launch + Real-Time SSE HUD)      │
│   ├─ Interactive Graph View (Backbone / Module Focus / Cluster Convex Hulls)│
│   ├─ Node Inspector (Source Code, AST Metrics, Git Blame History)           │
│   └─ Architectural Context & Gemini Streaming Q&A Panel                     │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │ HTTPS / SSE ndjson
┌──────────────────────────────────────▼──────────────────────────────────────┐
│                            BACKEND API TIER (Render)                        │
│                                                                             │
│   FastAPI (Asynchronous REST & Streaming Endpoints)                         │
│   ├─ Git Streaming Engine (io.BytesIO tarball stream from GitHub CDN)       │
│   ├─ In-Memory Syntax Extractor (Python AST & Tree-Sitter JS/TS)           │
│   ├─ Graph Synthesizer (NetworkX DiGraph, Tarjan SCC Cycles, PageRank)      │
│   ├─ Hotspot Engine (Commit Frequency x Cyclomatic Complexity)              │
│   ├─ SQLite Storage Engine (WAL mode: graph_cache, symbols, qa_threads)     │
│   └─ Retrieval-Augmented Generation (Prompt Synthesis + Google Gemini API)  │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Technical Workflow:
1. **Streaming Acquisition**: `fetch_github_in_memory()` requests `codeload.github.com/.../tar.gz/HEAD` and streams compressed bytes directly into RAM using `io.BytesIO`. GitHub commit logs are fetched concurrently using `ThreadPoolExecutor`.
2. **AST Parsing**: `extract_from_in_memory_files()` walks the in-memory files. Python files are parsed using Python's native `ast` module; JS/TS files are processed with `tree-sitter`.
3. **Dependency Resolution**: `build_graph()` executes a 4-tier qualifier resolution strategy (PyCG-inspired) mapping callers to qualified class methods, standalone functions, and external library services.
4. **Graph Metrics & Hotspots**: PageRank identifies architectural keystones (👑). Tarjan's Strongly Connected Components algorithm detects circular dependency cycles.
5. **Persistence**: The full graph structure, AST symbol catalog, and commit history are atomically persisted to SQLite (`diggit.db`) in WAL mode for sub-2ms subsequent loads.

---

## ✨ Core Features

| Feature | Description | Benefit |
| :--- | :--- | :--- |
| **Zero-Disk Ingestion** | Tarball streaming into RAM with immediate memory cleanup. | Zero disk wear, safe on ephemeral cloud containers, zero cloning wait time. |
| **Instant Cache** | SQLite database caches previous excavations. | Repositories reload in **< 2ms** on repeated visits. |
| **Module Clustering** | Functions grouped into visual module boundaries. | Eliminates graph hairballs; clear mental model of software subsystems. |
| **Backbone Mode** | Filters graph to classes, API routes, and top keystones. | High-level system comprehension in under 30 seconds. |
| **Downstream Tracing** | Breadth-First Search (BFS) path highlighting. | Visualizes blast radius of proposed refactors or breaking changes. |
| **CodeScene Hotspots** | Flame badges ($\text{Complexity} \times \text{Churn}$). | Pinpoints technical debt and bug-prone legacy code immediately. |
| **Grounded AI Q&A** | Gemini chat grounded in call graphs and commit logs. | Accurate architectural answers without AI hallucinations. |

---

## 📊 Results & Benchmark Evaluation

Tested across diverse open-source production repositories:

| Metric | Flask (`pallets/flask`) | FastAPI (`fastapi/fastapi`) | Pandas Subset (`pandas-dev`) |
| :--- | :---: | :---: | :---: |
| **Files Processed** | 24 | 52 | 327 |
| **Symbols Extracted** | 389 functions / 2 classes | 424 functions / 121 classes | 7,858 functions / 504 classes |
| **Graph Nodes & Edges** | 491 nodes, 822 edges | 614 nodes, 1,450 edges | 8,362 nodes, 14,200 edges |
| **Zero-Disk Ingestion Time** | 1.61 s | 2.82 s | 8.40 s |
| **Subsequent Cache Load** | **1.8 ms** | **2.1 ms** | **4.2 ms** |
| **Disk Space Consumed** | **0 KB** | **0 KB** | **0 KB** |

---

## 💻 Local Setup & Installation

### Prerequisites
- **Python 3.10+** (Python 3.11 recommended)
- **Node.js 18+** & npm
- A free **Google Gemini API Key** from [Google AI Studio](https://aistudio.google.com/apikey)
- *(Optional)* A GitHub Personal Access Token (for higher GitHub API limits)

### Step 1: Clone Repository
```bash
git clone https://github.com/raghav8218/diggit.git
cd diggit
```

### Step 2: Backend Setup
```bash
cd backend

# Create and activate virtual environment
python -m venv venv
# Windows:
.\venv\Scripts\activate
# Linux/macOS:
# source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Configure environment variables
cp .env.example .env
# Open .env and insert your GEMINI_API_KEY
```

Start the FastAPI backend:
```bash
uvicorn main:app --reload --port 8000
```
*Backend runs at `http://127.0.0.1:8000` (Health check: `http://127.0.0.1:8000/api/health`).*

### Step 3: Frontend Setup
In a new terminal window:
```bash
cd frontend
npm install
npm run dev
```
*Frontend runs at `http://localhost:5173`.*

---

## ☁️ Cloud Deployment Architecture

DigGit is optimized for separated or unified cloud deployments:

- **Frontend (Vercel Edge CDN)**: Built using `npm run build` and deployed automatically via [`vercel.json`](./vercel.json). Routes all client-side paths smoothly.
- **Backend (Render Web Service)**: Containerized with Python 3.11 and native Git support via [`render.yaml`](./render.yaml) or [`Dockerfile`](./Dockerfile).
- **Client-to-Backend Binding**: Set `VITE_API_BASE_URL=https://your-backend.onrender.com` in Vercel's Environment Variables dashboard.

---

## 📡 API Reference

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/analyze/stream` | Streams real-time repository ingestion, AST extraction, and graph synthesis via ndjson. |
| `GET` | `/api/repositories` | Lists all cached repository excavations stored in SQLite. |
| `GET` | `/api/repo/{repo_id}` | Retrieves full graph nodes, edges, keystones, and metrics for a repository in <2ms. |
| `DELETE`| `/api/repo/{repo_id}` | Clears an excavation from the SQLite database. |
| `GET` | `/api/symbol/{repo_id}?id={sym_id}` | Returns source code, complexity, decorators, and git blame for a symbol. |
| `GET` | `/api/trace/{repo_id}?start_id={id}` | Performs BFS traversal from a node to find all downstream callees. |
| `POST` | `/api/ask/stream/{repo_id}` | Streams Gemini AI architectural answers grounded in AST and git commits. |
| `GET` | `/api/health` | Health check endpoint for uptime monitors. |

---

## 💡 Key Findings & Learnings

1. **In-Memory Tarball Streaming eliminates container exhaustion**: Cloud serverless and ephemeral containers suffer when cloning multi-hundred-megabyte git repos. Streaming compressed tarballs directly into RAM (`io.BytesIO`) is 4x faster than disk cloning and leaves zero residual footprint.
2. **CodeScene Churn-Complexity correlation works**: Weighting call graph nodes by both cyclomatic complexity and historical commit frequency accurately identified known bug hotspots in Flask and FastAPI without manual code audits.
3. **Multi-Scale Progressive Disclosure prevents graph fatigue**: Showing all symbols at once produces unreadable hairballs. Grouping symbols into module convex hulls and offering a curated **Backbone View** reduces visual noise by over 70% while preserving architectural comprehension.
