'use client'

import React, { useState } from 'react'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data?.message || 'Login failed')
      window.location.href = '/admin'
    } catch (err: any) {
      setError(err?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-neutral-950 px-4">
      <div className="w-full max-w-sm bg-neutral-900 border border-neutral-800 rounded-xl shadow p-6">
        <h1 className="text-xl font-semibold text-neutral-100 mb-1">Admin Login</h1>
        <p className="text-sm text-neutral-400 mb-6">Sign in to access the admin panel.</p>
        {error && (
          <div className="mb-4 rounded-md border border-red-900 bg-red-950 text-red-200 px-3 py-2 text-sm">{error}</div>
        )}
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-300">Username</label>
            <input className="mt-1 block w-full rounded-md border border-neutral-800 bg-neutral-900 text-neutral-100 placeholder:text-neutral-500 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600" value={username} onChange={(e)=>setUsername(e.target.value)} required />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-300">Password</label>
            <input type="password" className="mt-1 block w-full rounded-md border border-neutral-800 bg-neutral-900 text-neutral-100 placeholder:text-neutral-500 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600" value={password} onChange={(e)=>setPassword(e.target.value)} required />
          </div>
          <button type="submit" disabled={loading} className={`w-full rounded-md px-4 py-2 text-sm font-medium text-white ${loading ? 'bg-neutral-700' : 'bg-blue-600 hover:bg-blue-700'}`}>{loading ? 'Signing in...' : 'Sign in'}</button>
        </form>
      </div>
    </main>
  )
}


