import React, { useState, useEffect } from 'react'
import { API_BASE } from '../apiConfig.js'
import {
  GitBranch,
  Terminal,
  Compass,
  ArrowRight,
  Clock,
  Trash2,
  Sparkles,
  ExternalLink,
  Code2,
  Flame,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react'

const EXAMPLE_REPOS = [
  { name: 'fastapi/fastapi', branch: 'master', desc: 'Modern async Python API framework' },
  { name: 'pallets/flask', branch: 'main', desc: 'Python WSGI micro web framework' },
  { name: 'psf/requests', branch: 'main', desc: 'A simple, elegant HTTP library' },
  { name: 'encode/starlette', branch: 'master', desc: 'Lightweight ASGI framework' },
]

export default function DashboardView({
  onAnalyze,
  onOpenCached,
  loading = false,
  progress = {},
  error = '',
}) {
  const [repoInput, setRepoInput] = useState('')
  const [branchInput, setBranchInput] = useState('')
  const [recents, setRecents] = useState([])
  const [validationError, setValidationError] = useState('')

  // Load recents from both backend SQLite and localStorage
  useEffect(() => {
    let isMounted = true
    const loadRecents = async () => {
      let localItems = []
      try {
        const stored = localStorage.getItem('diggit_recents') || localStorage.getItem('code_archaeologist_recents')
        if (stored) localItems = JSON.parse(stored)
      } catch {}

      try {
        const res = await fetch(`${API_BASE}/api/repositories`)
        if (res.ok) {
          const data = await res.json()
          const dbRepos = data.repositories || []

          // Combine DB repos with local items (DB repos take precedence)
          const merged = [...dbRepos]
          localItems.forEach((loc) => {
            const locId = loc.repo_id || loc.id
            if (!merged.some((m) => (m.repo_id || m.id) === locId || m.repo_name === loc.repo_name)) {
              merged.push(loc)
            }
          })
          if (isMounted) setRecents(merged)
          return
        }
      } catch (e) {
        console.warn('Could not fetch cached repos from backend:', e)
      }

      if (isMounted) setRecents(localItems)
    }

    loadRecents()
    return () => { isMounted = false }
  }, [])

  const validateRepo = (value) => {
    const val = value.trim()
    if (!val) {
      setValidationError('Please enter a GitHub repository URL or owner/repo')
      return false
    }
    // Allow owner/repo or github url
    const isOwnerRepo = /^[\w.-]+\/[\w.-]+$/.test(val)
    const isGithubUrl = /^https?:\/\/(www\.)?github\.com\/[\w.-]+\/[\w.-]+(\.git)?\/?$/.test(val)
    if (!isOwnerRepo && !isGithubUrl) {
      setValidationError('Please enter a valid GitHub repo (e.g. owner/repo or https://github.com/owner/repo)')
      return false
    }
    setValidationError('')
    return true
  }

  const handleSubmit = (e) => {
    e?.preventDefault()
    if (!validateRepo(repoInput)) return
    onAnalyze(repoInput.trim(), branchInput.trim())
  }

  const handleSelectExample = (ex) => {
    setRepoInput(ex.name)
    setBranchInput(ex.branch || '')
    setValidationError('')
  }

  const handleRemoveRecent = async (repoId, e) => {
    e.stopPropagation()
    const updated = recents.filter((r) => (r.repo_id || r.id) !== repoId)
    setRecents(updated)
    try {
      localStorage.setItem('diggit_recents', JSON.stringify(updated))
      if (repoId) {
        await fetch(`${API_BASE}/api/repo/${repoId}`, { method: 'DELETE' })
      }
    } catch (err) {
      console.warn('Error removing repo:', err)
    }
  }

  const handleClearRecents = async () => {
    const toDelete = [...recents]
    setRecents([])
    localStorage.removeItem('diggit_recents')
    localStorage.removeItem('code_archaeologist_recents')
    for (const r of toDelete) {
      const rId = r.repo_id || r.id
      if (rId) {
        try {
          await fetch(`${API_BASE}/api/repo/${rId}`, { method: 'DELETE' })
        } catch {}
      }
    }
  }

  return (
    <div className="dashboard-container">
      {/* Background Dot Grid Canvas */}
      <div className="dot-grid-canvas" />

      {/* Hero Content */}
      <div className="dashboard-hero">
        <div className="hero-pill-badge">
          <Sparkles size={13} className="hero-sparkle-icon" />
          <span>DIG INTO GIT REPOSITORIES • CODE INTELLIGENCE</span>
        </div>

        <div className="hero-logo-row">
          <div className="hero-brand-icon-shield" aria-hidden="true">
            <GitBranch size={32} className="hero-brand-branch-icon" />
          </div>
          <h1 className="hero-title">
            Dig<span className="hero-gradient-text">Git</span>
          </h1>
        </div>
        <p className="hero-subtitle">
          Dig into git repositories with interactive architectural graphs,
          semantic code clustering, and commit-history grounded AI context.
        </p>

        {/* Command Search Box */}
        <form onSubmit={handleSubmit} className="hero-command-card">
          <div className="command-input-row">
            <div className="repo-input-wrapper">
              <Terminal size={18} className="terminal-prefix-icon" />
              <input
                type="text"
                placeholder="github.com/owner/repo or owner/repo"
                value={repoInput}
                onChange={(e) => {
                  setRepoInput(e.target.value)
                  if (validationError) validateRepo(e.target.value)
                }}
                disabled={loading}
                className="repo-text-input"
                autoFocus
              />
            </div>

            <div className="branch-input-wrapper">
              <GitBranch size={15} className="branch-prefix-icon" />
              <input
                type="text"
                placeholder="branch (optional)"
                value={branchInput}
                onChange={(e) => setBranchInput(e.target.value)}
                disabled={loading}
                className="branch-text-input"
              />
            </div>

            <button
              type="submit"
              disabled={loading || !repoInput.trim()}
              className="probe-trigger-btn"
            >
              {loading ? (
                <>
                  <span className="spinner-dot" />
                  <span>Excavating…</span>
                </>
              ) : (
                <>
                  <span>Archaeologize / Probe</span>
                  <ArrowRight size={15} />
                </>
              )}
            </button>
          </div>

          {(validationError || error) && (
            <div className="dashboard-error-banner" role="alert">
              <AlertCircle size={15} />
              <span>{validationError || error}</span>
            </div>
          )}

          {/* Live Excavation Progress HUD */}
          {loading && (
            <div className="excavation-hud" role="status" aria-live="polite">
              <div className="excavation-hud-header">
                <div className="excavation-hud-title-group">
                  <span className="excavation-pulse-dot" />
                  <span className="excavation-hud-title">
                    {progress?.message || 'Archaeological Excavation in Progress…'}
                  </span>
                </div>
                <span className="excavation-percentage">{progress?.percent || 15}%</span>
              </div>

              {/* Progress Bar */}
              <div
                className="excavation-progress-bar-bg"
                role="progressbar"
                aria-valuenow={progress?.percent || 15}
                aria-valuemin="0"
                aria-valuemax="100"
              >
                <div
                  className="excavation-progress-bar-fill"
                  style={{ width: `${progress?.percent || 15}%` }}
                />
              </div>

              {/* Step Badges */}
              <div className="excavation-steps-row">
                {[
                  { id: 1, label: 'Clone', icon: GitBranch },
                  { id: 2, label: 'Scan', icon: Compass },
                  { id: 3, label: 'AST & Trees', icon: Code2 },
                  { id: 4, label: 'Call Graph', icon: Sparkles },
                  { id: 5, label: 'Git Churn', icon: Flame },
                  { id: 6, label: 'Architectural Index', icon: CheckCircle2 },
                ].map((st) => {
                  const isDone = (progress?.step || 1) > st.id
                  const isCurrent = (progress?.step || 1) === st.id
                  const Icon = st.icon
                  return (
                    <div
                      key={st.id}
                      className={`excavation-step-pill ${isDone ? 'done' : ''} ${isCurrent ? 'current' : ''}`}
                    >
                      <Icon size={12} />
                      <span>{st.label}</span>
                    </div>
                  )
                })}
              </div>

              {/* Live Terminal Log Stream */}
              {progress?.logs && progress.logs.length > 0 && (
                <div className="excavation-logs-console">
                  <Terminal size={12} className="console-icon" />
                  <div className="console-text-window">
                    {progress.logs.map((logMsg, i) => (
                      <div key={i} className="console-log-line">
                        <span className="console-prompt">&gt;</span>
                        <span>{logMsg}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </form>

        {/* Quick Launch Examples */}
        <div className="examples-section">
          <span className="examples-label">Try popular repositories:</span>
          <div className="example-chips">
            {EXAMPLE_REPOS.map((ex) => (
              <button
                key={ex.name}
                type="button"
                className="example-chip"
                onClick={() => handleSelectExample(ex)}
              >
                <code>{ex.name}</code>
              </button>
            ))}
          </div>
        </div>

        {/* Recent Analyzed Repositories Section */}
        {recents.length > 0 && (
          <div className="recents-section">
            <div className="recents-header-row">
              <div className="recents-title-group">
                <Clock size={16} />
                <h3>Recent Analyzed Repositories</h3>
              </div>
              <button
                type="button"
                className="clear-recents-btn"
                onClick={handleClearRecents}
              >
                Clear all
              </button>
            </div>

            <div className="recents-grid">
              {recents.map((item) => {
                const itemId = item.repo_id || item.id || item.repo_name
                return (
                  <div
                    key={itemId}
                    className="recent-card"
                    onClick={() => onOpenCached(item)}
                  >
                    <div className="recent-card-top">
                      <span className="recent-repo-name">{item.repo_name}</span>
                      <button
                        type="button"
                        className="delete-recent-btn"
                        onClick={(e) => handleRemoveRecent(item.repo_id || item.id, e)}
                        title="Remove from recents"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>

                    <div className="recent-card-pills">
                      <span className="recent-pill language-pill">Python</span>
                      <span className="recent-pill branch-pill">
                        <GitBranch size={11} />
                        {item.branch || 'main'}
                      </span>
                      {item.num_files ? (
                        <span className="recent-pill files-pill">
                          {item.num_files} files
                        </span>
                      ) : null}
                    </div>

                    <div className="recent-card-footer">
                      <span className="recent-date">
                        {item.timestamp ? new Date(item.timestamp).toLocaleDateString() : 'Cached'}
                      </span>
                      <span className="quick-launch-link">
                        Open Workspace <ArrowRight size={12} />
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
