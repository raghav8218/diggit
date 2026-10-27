# DigGit (dig-git)

> **Dig into Git repositories**: Interactive architectural network visualization, in-memory streaming extraction, and commit-history grounded AI context.

Paste a GitHub URL for any repository and get back a clickable interactive architecture graph, source-on-click, git-blame history per function, CodeScene hotspot overlays, PageRank keystone identification, downstream call tracing, and natural-language Q&A grounded in both the code **and** its commit history — answered by Gemini.

## Introduction

DigGit is an interactive code intelligence tool that helps developers understand and explore unfamiliar codebases by combining code structure, visual dependency relationships, source code, and Git history in one unified interface.

## Problem Statement

Understanding an unfamiliar codebase is notoriously time-consuming because developers must manually navigate through thousands of files, functions, dependencies, and commit logs. DigGit streamlines this discovery through an interactive, multi-scale visual exploration interface.

## Objectives

- **Zero-Disk In-Memory Streaming**: Ingest and parse code directly from GitHub CDN streams into RAM without cloning heavy packfiles onto the host machine.
- **Organic Clustered Graph Visualization**: Visualize relationships between functions, classes, and routes with non-overlapping module hulls.
- **Progressive Semantic Disclosure**: Switch seamlessly between curated Backbone View, single-subsystem Module Focus, and full repository exploration.
- **Inspect Source & Blame**: Inspect source code and git blame history directly from graph nodes.
- **Hotspot & Keystone Detection**: Identify high-churn/high-complexity code hotspots and PageRank architectural keystones (👑).
- **Downstream Call Tracing**: Trace execution blast radius from any function or route handler.
- **Grounded AI Architectural Q&A**: Ask natural-language questions with answers grounded in both static code structure and Git commit history.

## Team Members

- Shivang Kumar
- Raghav Sharma

## Setup

### 1. Backend

```bash
cd backend
python -m venv venv
# Windows:
.\venv\Scripts\activate
# Linux/macOS:
# source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
# Edit .env and paste your Gemini API key from https://aistudio.google.com/apikey
uvicorn main:app --reload --port 8000
```

Backend will be running at [http://localhost:8000](http://localhost:8000) (verify at [http://localhost:8000/api/health](http://localhost:8000/api/health)).

### 2. Frontend

In a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at [http://localhost:5173](http://localhost:5173) and proxies `/api` calls to the backend.

## How to Use

1. Open [http://localhost:5173](http://localhost:5173)
2. Enter any GitHub repository URL (e.g. `pallets/flask` or `https://github.com/fastapi/fastapi`)
3. Click **"Excavate Repository"** — DigGit streams the source tarball in memory, parses the AST, calculates centrality and hotspots, and builds the visual graph.
4. Explore the **Backbone View** for high-level system comprehension, or use **Module Focus** to drill into a specific subsystem.
5. Click any node to inspect its source code, complexity metrics, churn score, and git blame history.
6. Use **Trace from here** to highlight downstream call flows across the graph.
7. Ask questions in the **Architectural Context** tab — Gemini streams real-time explanations grounded directly in the codebase and its commit logs.
