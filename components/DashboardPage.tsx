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
      <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-800">
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-0" style={{ maxWidth: '400px', width: '100%' }}>
          <div className="p-4">
            <h4 className="text-center mb-4">Dashboard Login</h4>
            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label htmlFor="loginEmail" className="block text-sm font-medium my-1">
                  <i className="fa-solid fa-envelope me-2"></i>Email
                </label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-3xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  id="loginEmail"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="loginPassword" className="block text-sm font-medium my-1">
                  <i className="fa-solid fa-lock me-2"></i>Password
                </label>
                <input
                  type="password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-3xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  id="loginPassword"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="w-full">
                <button type="submit" className="w-full px-4 py-2 bg-blue-600 text-white rounded-3xl shadow-sm hover:bg-blue-700 transition-colors">
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
    <main className="container mx-auto mt-4 mb-5 px-4">
      {/* Header */}
      <div className="flex justify-between items-center mt-4 mb-5 pt-1">
        <h4 className="m-0 p-0 flex-grow-1 font-bold">
          Undangan<i className="fa-solid fa-fire text-red-600 ms-2"></i>
        </h4>
        <div className="m-0 p-0 flex-grow-1 text-right text-2xl">
          Dashboard
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="rounded-3xl shadow p-3 border-0 bg-stat-comment">
          <div className="flex items-center justify-between text-gray-100">
            <div>
              <p className="font-bold m-0 p-0">Comments</p>
              <div className="font-bold m-0 p-0">0</div>
            </div>
            <div className="text-3xl">
              <i className="fa-solid fa-comments"></i>
            </div>
          </div>
        </div>

        <div className="rounded-3xl shadow p-3 border-0 bg-stat-present">
          <div className="flex items-center justify-between text-gray-100">
            <div>
              <p className="font-bold m-0 p-0">Present</p>
              <div className="font-bold m-0 p-0">0</div>
            </div>
            <div className="text-3xl">
              <i className="fa-solid fa-circle-check"></i>
            </div>
          </div>
        </div>

        <div className="rounded-3xl shadow p-3 border-0 bg-stat-absent">
          <div className="flex items-center justify-between text-gray-100">
            <div>
              <p className="font-bold m-0 p-0">Absent</p>
              <div className="font-bold m-0 p-0">0</div>
            </div>
            <div className="text-3xl">
              <i className="fa-solid fa-circle-xmark"></i>
            </div>
          </div>
        </div>

        <div className="rounded-3xl shadow p-3 border-0 bg-stat-likes">
          <div className="flex items-center justify-between text-gray-100">
            <div>
              <p className="font-bold m-0 p-0">Likes</p>
              <div className="font-bold m-0 p-0">0</div>
            </div>
            <div className="text-3xl">
              <i className="fa-solid fa-heart"></i>
            </div>
          </div>
        </div>
      </div>

      {/* Info Card */}
      <div className="grid grid-cols-1 mt-4">
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-3xl shadow text-center border border-gray-200 dark:border-gray-700">
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

      {/* Logout Button */}
      <div className="grid grid-cols-1 mt-4">
        <div className="text-center">
          <button
            className="px-6 py-2 bg-red-600 text-white rounded-3xl shadow-sm hover:bg-red-700 transition-colors"
            onClick={() => setIsLoggedIn(false)}
          >
            <i className="fa-solid fa-right-from-bracket me-2"></i>Logout
          </button>
        </div>
      </div>
    </main>
  )
}

