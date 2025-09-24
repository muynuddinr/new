"use client";

import { useEffect, useState } from "react";

type Signup = { id: string; email: string; createdAt?: string };

export default function EarlyBirdAdminPage() {
  const [email, setEmail] = useState("");
  const [signups, setSignups] = useState<Signup[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/early-bird", { cache: "no-store" });
        const data = await res.json();
        setSignups((data?.items || []).map((d: any) => ({ id: String(d.id), email: String(d.email), createdAt: String(d.createdAt || "") })));
      } catch {}
    })();
  }, []);

  const add = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    try {
      setLoading(true);
      await fetch("/api/early-bird", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email }) });
      setEmail("");
      const reload = await fetch("/api/early-bird", { cache: "no-store" });
      const data = await reload.json();
      setSignups((data?.items || []).map((d: any) => ({ id: String(d.id), email: String(d.email), createdAt: String(d.createdAt || "") })));
    } catch {}
    finally { setLoading(false); }
  };

  return (
    <section>
      <h1 className="text-2xl font-bold">Early Bird Access</h1>
      <p className="text-neutral-400 mt-2">Manage early access signups.</p>

      <form onSubmit={add} className="mt-6 flex gap-2">
        <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" placeholder="Enter email" required className="flex-1 rounded-md border border-neutral-800 bg-neutral-900 text-neutral-100 placeholder:text-neutral-500 px-3 py-2" />
        <button type="submit" disabled={loading} className="rounded-md bg-neutral-200 text-neutral-900 hover:bg-white px-4 py-2 disabled:opacity-50">{loading ? "Saving..." : "Add"}</button>
      </form>

      <div className="mt-6">
        <h2 className="text-lg font-semibold">Signups</h2>
        {signups.length === 0 ? (
          <p className="text-neutral-500 mt-2">No signups yet.</p>
        ) : (
          <ul className="mt-2 space-y-2">
            {signups.map((s) => (
              <li key={s.id} className="rounded border border-neutral-800 p-2 bg-neutral-900 flex items-center justify-between">
                <span>{s.email}</span>
                <button className="rounded-md border border-neutral-800 px-3 py-1 text-sm text-red-400" onClick={async ()=>{
                  if (!confirm('Remove signup?')) return;
                  await fetch(`/api/early-bird/${s.id}`, { method: 'DELETE' });
                  const reload = await fetch("/api/early-bird", { cache: "no-store" });
                  const data = await reload.json();
                  setSignups((data?.items || []).map((d: any) => ({ id: String(d.id), email: String(d.email), createdAt: String(d.createdAt || "") })));
                }}>Delete</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}


