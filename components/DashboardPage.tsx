'use client'

import { useState } from 'react'

export default function DashboardPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Simplified login - in production, this would call an API
    if (email && password) {
      setIsLoggedIn(true)
    }
  }

  if (!isLoggedIn) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 bg-light-dark">
        <div className="card shadow" style={{ maxWidth: '400px', width: '100%' }}>
          <div className="card-body p-4">
            <h4 className="text-center mb-4">Dashboard Login</h4>
            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label htmlFor="loginEmail" className="form-label my-1">
                  <i className="fa-solid fa-envelope me-2"></i>Email
                </label>
                <input
                  type="email"
                  className="form-control shadow-sm rounded-4"
                  id="loginEmail"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="loginPassword" className="form-label my-1">
                  <i className="fa-solid fa-lock me-2"></i>Password
                </label>
                <input
                  type="password"
                  className="form-control shadow-sm rounded-4"
                  id="loginPassword"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="d-grid">
                <button type="submit" className="btn btn-primary shadow-sm rounded-4">
                  <i className="fa-solid fa-right-to-bracket me-2"></i>Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }

  return (
    <main className="container mt-4 mb-5">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mt-4 mb-5 pt-1">
        <h4 className="m-0 p-0 flex-grow-1 fw-bold">
          Undangan<i className="fa-solid fa-fire text-danger ms-2"></i>
        </h4>
        <div className="m-0 p-0 flex-grow-1 text-end" style={{ fontSize: '1.4rem' }}>
          Dashboard
        </div>
      </div>

      {/* Stats */}
      <div className="row">
        <div className="col col-xl-3 col-6 mb-3">
          <div className="rounded-4 shadow p-3 border-0" style={{ background: '#8573F1' }}>
            <div className="row align-items-center" style={{ color: 'var(--bs-gray-100)' }}>
              <div className="col-9">
                <p className="fw-bold m-0 p-0">Comments</p>
                <div className="fw-bold m-0 p-0">0</div>
              </div>
              <div className="col-3 p-0">
                <i className="fa-solid fa-comments fa-2xl me-2"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="col col-xl-3 col-6 mb-3">
          <div className="rounded-4 shadow p-3 border-0" style={{ background: '#7A5CD9' }}>
            <div className="row align-items-center" style={{ color: 'var(--bs-gray-100)' }}>
              <div className="col-9">
                <p className="fw-bold m-0 p-0">Present</p>
                <div className="fw-bold m-0 p-0">0</div>
              </div>
              <div className="col-3 p-0">
                <i className="fa-solid fa-circle-check fa-2xl me-2"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="col col-xl-3 col-6 mb-3">
          <div className="rounded-4 shadow p-3 border-0" style={{ background: '#6546B1' }}>
            <div className="row align-items-center" style={{ color: 'var(--bs-gray-100)' }}>
              <div className="col-9">
                <p className="fw-bold m-0 p-0">Absent</p>
                <div className="fw-bold m-0 p-0">0</div>
              </div>
              <div className="col-3 p-0">
                <i className="fa-solid fa-circle-xmark fa-2xl me-2"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="col col-xl-3 col-6 mb-3">
          <div className="rounded-4 shadow p-3 border-0" style={{ background: '#4F3392' }}>
            <div className="row align-items-center" style={{ color: 'var(--bs-gray-100)' }}>
              <div className="col-9">
                <p className="fw-bold m-0 p-0">Likes</p>
                <div className="fw-bold m-0 p-0">0</div>
              </div>
              <div className="col-3 p-0">
                <i className="fa-solid fa-heart fa-2xl me-2"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Info Card */}
      <div className="row mt-4">
        <div className="col-12">
          <div className="bg-theme-auto p-4 rounded-4 shadow text-center">
            <h5 className="mb-3">
              <i className="fa-solid fa-info-circle me-2"></i>
              Dashboard Information
            </h5>
            <p className="mb-0">
              This is a simplified dashboard view for the Next.js migration.
              Full dashboard functionality can be implemented by integrating with your backend API.
            </p>
          </div>
        </div>
      </div>

      {/* Logout Button */}
      <div className="row mt-4">
        <div className="col-12 text-center">
          <button
            className="btn btn-danger rounded-4 shadow-sm"
            onClick={() => setIsLoggedIn(false)}
          >
            <i className="fa-solid fa-right-from-bracket me-2"></i>Logout
          </button>
        </div>
      </div>
    </main>
  )
}
