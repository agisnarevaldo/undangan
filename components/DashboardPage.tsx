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
      <div className="flex justify-center items-center min-h-screen bg-[var(--bg-light-dark)] px-4">
        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8 w-full max-w-md">
          <h4 className="text-center text-2xl font-semibold mb-6">Dashboard Login</h4>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label htmlFor="loginEmail" className="block text-sm font-medium mb-2">
                <i className="fa-solid fa-envelope mr-2"></i>Email
              </label>
              <input
                type="email"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                id="loginEmail"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="loginPassword" className="block text-sm font-medium mb-2">
                <i className="fa-solid fa-lock mr-2"></i>Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                id="loginPassword"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg shadow-md transition-colors"
            >
              <i className="fa-solid fa-right-to-bracket mr-2"></i>Login
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <main className="container mx-auto mt-8 mb-12 px-4">
      {/* Header */}
      <div className="flex justify-between items-center mt-8 mb-12 pt-2">
        <h4 className="text-2xl font-bold flex items-center">
          Undangan<i className="fa-solid fa-fire text-red-500 ml-2"></i>
        </h4>
        <div className="text-xl">
          Dashboard
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="rounded-2xl shadow-lg p-6" style={{ background: '#8573F1' }}>
          <div className="flex items-center text-white">
            <div className="flex-1">
              <p className="font-bold text-sm mb-1">Comments</p>
              <div className="text-2xl font-bold">0</div>
            </div>
            <div>
              <i className="fa-solid fa-comments text-3xl opacity-80"></i>
            </div>
          </div>
        </div>

        <div className="rounded-2xl shadow-lg p-6" style={{ background: '#7A5CD9' }}>
          <div className="flex items-center text-white">
            <div className="flex-1">
              <p className="font-bold text-sm mb-1">Present</p>
              <div className="text-2xl font-bold">0</div>
            </div>
            <div>
              <i className="fa-solid fa-circle-check text-3xl opacity-80"></i>
            </div>
          </div>
        </div>

        <div className="rounded-2xl shadow-lg p-6" style={{ background: '#6546B1' }}>
          <div className="flex items-center text-white">
            <div className="flex-1">
              <p className="font-bold text-sm mb-1">Absent</p>
              <div className="text-2xl font-bold">0</div>
            </div>
            <div>
              <i className="fa-solid fa-circle-xmark text-3xl opacity-80"></i>
            </div>
          </div>
        </div>

        <div className="rounded-2xl shadow-lg p-6" style={{ background: '#4F3392' }}>
          <div className="flex items-center text-white">
            <div className="flex-1">
              <p className="font-bold text-sm mb-1">Likes</p>
              <div className="text-2xl font-bold">0</div>
            </div>
            <div>
              <i className="fa-solid fa-heart text-3xl opacity-80"></i>
            </div>
          </div>
        </div>
      </div>

      {/* Info Card */}
      <div className="mt-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg text-center">
          <h5 className="text-xl font-semibold mb-3">
            <i className="fa-solid fa-info-circle mr-2"></i>
            Dashboard Information
          </h5>
          <p className="text-gray-600 dark:text-gray-300">
            This is a simplified dashboard view for the Next.js migration.
            Full dashboard functionality can be implemented by integrating with your backend API.
          </p>
        </div>
      </div>

      {/* Logout Button */}
      <div className="mt-8 text-center">
        <button
          className="bg-red-600 hover:bg-red-700 text-white font-medium px-8 py-3 rounded-2xl shadow-lg transition-colors"
          onClick={() => setIsLoggedIn(false)}
        >
          <i className="fa-solid fa-right-from-bracket mr-2"></i>Logout
        </button>
      </div>
    </main>
  )
}

