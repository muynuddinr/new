"use client";

import { useState } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    try {
      setLoading(true);
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.message || "Subscribe failed");
      setMessage(data?.message || "Subscribed!");
      setEmail("");
    } catch (err: any) {
      setMessage(err?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="flex w-full md:w-auto">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        required
        className="bg-gray-900 border border-gray-800 text-white rounded-l-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-64 text-sm"
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 px-6 rounded-r-lg transition-all duration-300 text-sm disabled:opacity-50"
      >
        {loading ? "Submitting..." : "Subscribe"}
      </button>
      {message && (
        <span className="ml-3 text-sm text-gray-400">{message}</span>
      )}
    </form>
  );
}


