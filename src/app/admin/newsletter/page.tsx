"use client";

import { useEffect, useState } from "react";

export default function AdminNewsletterPage() {
  const [email, setEmail] = useState("");
  const [subscribers, setSubscribers] = useState<{ id: string; email: string; createdAt?: string }[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/newsletter", { cache: "no-store" });
        const data = await res.json();
        setSubscribers((data?.items || []).map((d: any) => ({ id: String(d.id), email: String(d.email), createdAt: String(d.createdAt || "") })));
      } catch {}
    })();
  }, []);

  const addSubscriber = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    try {
      setLoading(true);
      const res = await fetch("/api/newsletter", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email }) });
      if (!res.ok) throw new Error("Failed");
      setEmail("");
      const reload = await fetch("/api/newsletter", { cache: "no-store" });
      const data = await reload.json();
      setSubscribers((data?.items || []).map((d: any) => ({ id: String(d.id), email: String(d.email), createdAt: String(d.createdAt || "") })));
    } catch {}
    finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <h1 className="text-2xl font-bold">Newsletter</h1>
      <p className="text-neutral-400 mt-2">Manage newsletter subscribers.</p>

      <form onSubmit={addSubscriber} className="mt-6 flex gap-2">
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Enter email"
          className="flex-1 rounded-md border border-neutral-800 bg-neutral-900 text-neutral-100 placeholder:text-neutral-500 px-3 py-2"
          required
        />
        <button
          type="submit"
          className="rounded-md bg-neutral-200 text-neutral-900 hover:bg-white px-4 py-2"
        >
          Add
        </button>
      </form>

      <div className="mt-6">
        <h2 className="text-lg font-semibold">Subscribers</h2>
        {subscribers.length === 0 ? (
          <p className="text-neutral-500 mt-2">No subscribers yet.</p>
        ) : (
          <ul className="mt-2 space-y-2">
            {subscribers.map((s) => (
              <li key={s.id} className="rounded border border-neutral-800 p-2 bg-neutral-900 flex items-center justify-between">
                <span>{s.email}</span>
                <button
                  className="rounded-md border border-neutral-800 px-3 py-1 text-sm text-red-400"
                  onClick={async () => {
                    if (!confirm("Remove subscriber?")) return;
                    await fetch(`/api/newsletter/${s.id}`, { method: "DELETE" });
                    const reload = await fetch("/api/newsletter", { cache: "no-store" });
                    const data = await reload.json();
                    setSubscribers((data?.items || []).map((d: any) => ({ id: String(d.id), email: String(d.email), createdAt: String(d.createdAt || "") })));
                  }}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}


