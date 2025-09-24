"use client";

import { useEffect, useState } from "react";

type Inquiry = {
  id: string;
  name: string;
  email: string;
  message: string;
  subject?: string;
  country?: string;
  phone?: string;
  createdAt?: string;
  status?: "pending" | "done";
};

export default function AdminContactPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [country, setCountry] = useState("IN");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<"all" | "pending" | "done">("all");
  const [editing, setEditing] = useState<Inquiry | null>(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/contacts", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to load");
        const data = await res.json();
        const items = (data?.items || []).map((d: any) => ({
          id: String(d.id),
          name: String(d.name || ""),
          email: String(d.email || ""),
          message: String(d.message || ""),
          subject: String(d.subject || ""),
          country: String(d.country || ""),
          phone: String(d.phone || ""),
          createdAt: String(d.createdAt || ""),
          status: d.status === "done" ? "done" : "pending",
        }));
        setInquiries(items);
      } catch {}
      finally {
        setLoading(false);
      }
    })();
  }, []);

  const addInquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/api/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, country, phone, message }),
      });
      if (!res.ok) throw new Error("Failed to create");
      setName("");
      setEmail("");
      setSubject("");
      setCountry("IN");
      setPhone("");
      setMessage("");
      // refresh list
      const reload = await fetch("/api/contacts", { cache: "no-store" });
      const data = await reload.json();
      const items = (data?.items || []).map((d: any) => ({
        id: String(d.id),
        name: String(d.name || ""),
        email: String(d.email || ""),
        message: String(d.message || ""),
        subject: String(d.subject || ""),
        country: String(d.country || ""),
        phone: String(d.phone || ""),
        createdAt: String(d.createdAt || ""),
        status: d.status === "done" ? "done" : "pending",
      }));
      setInquiries(items);
    } catch {}
    finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <h1 className="text-2xl font-bold">Contact</h1>
      <p className="text-neutral-400 mt-2">View, filter, update status, edit and delete inquiries.</p>

      <div className="mt-4 flex items-center gap-3">
        <label className="text-sm text-neutral-400">Filter</label>
        <select value={filter} onChange={(e) => setFilter(e.target.value as any)} className="rounded-md border border-neutral-800 bg-neutral-900 text-neutral-100 px-3 py-2">
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="done">Done</option>
        </select>
      </div>

      <form onSubmit={addInquiry} className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Name"
          className="rounded-md border border-neutral-800 bg-neutral-900 text-neutral-100 placeholder:text-neutral-500 px-3 py-2"
          required
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
          className="rounded-md border border-neutral-800 bg-neutral-900 text-neutral-100 placeholder:text-neutral-500 px-3 py-2"
          required
        />
        <input
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          type="text"
          placeholder="Subject"
          className="rounded-md border border-neutral-800 bg-neutral-900 text-neutral-100 placeholder:text-neutral-500 px-3 py-2 sm:col-span-2"
          required
        />
        <div className="grid grid-cols-2 gap-3 sm:col-span-2">
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="rounded-md border border-neutral-800 bg-neutral-900 text-neutral-100 px-3 py-2"
          >
            <option value="IN">India (+91)</option>
            <option value="US">United States (+1)</option>
            <option value="GB">United Kingdom (+44)</option>
            <option value="AE">United Arab Emirates (+971)</option>
            <option value="AU">Australia (+61)</option>
            <option value="CA">Canada (+1)</option>
            <option value="DE">Germany (+49)</option>
            <option value="FR">France (+33)</option>
            <option value="SG">Singapore (+65)</option>
          </select>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            type="tel"
            placeholder="Phone"
            className="rounded-md border border-neutral-800 bg-neutral-900 text-neutral-100 placeholder:text-neutral-500 px-3 py-2"
            required
          />
        </div>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Message"
          className="rounded-md border border-neutral-800 bg-neutral-900 text-neutral-100 placeholder:text-neutral-500 px-3 py-2 sm:col-span-2"
          rows={4}
          required
        />
        <div>
          <button
            type="submit"
            className="rounded-md bg-neutral-200 text-neutral-900 hover:bg-white px-4 py-2 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Saving..." : "Add Inquiry"}
          </button>
        </div>
      </form>

      <div className="mt-6">
        <h2 className="text-lg font-semibold">Recent Inquiries</h2>
        {inquiries.length === 0 ? (
          <p className="text-neutral-500 mt-2">No inquiries yet.</p>
        ) : (
          <ul className="mt-2 space-y-2">
            {inquiries
              .filter((q) => (filter === "all" ? true : q.status === filter))
              .map((q) => (
              <li key={q.id} className="rounded border border-neutral-800 p-3 bg-neutral-900">
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-medium truncate">{q.name} <span className="ml-2 text-xs px-2 py-0.5 rounded-full border border-neutral-700 text-neutral-300">{q.status || "pending"}</span></p>
                    <p className="text-xs text-neutral-400 truncate">{q.email} • {q.phone}</p>
                    {q.subject && <p className="text-sm text-neutral-300 mt-1 truncate">{q.subject}</p>}
                    <p className="mt-2 text-neutral-200 whitespace-pre-wrap break-words">{q.message}</p>
                  </div>
                  <div className="flex-shrink-0 flex flex-col gap-2">
                    <button onClick={async () => {
                      setLoading(true);
                      await fetch(`/api/contacts/${q.id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status: q.status === "done" ? "pending" : "done" }) });
                      const res = await fetch("/api/contacts", { cache: "no-store" });
                      const data = await res.json();
                      const items = (data?.items || []).map((d: any) => ({
                        id: String(d.id), name: String(d.name||""), email: String(d.email||""), message: String(d.message||""), subject: String(d.subject||""), country: String(d.country||""), phone: String(d.phone||""), createdAt: String(d.createdAt||""), status: d.status === "done" ? "done" : "pending",
                      }));
                      setInquiries(items);
                      setLoading(false);
                    }} className="rounded-md border border-neutral-800 px-3 py-1 text-sm">{q.status === "done" ? "Mark Pending" : "Mark Done"}</button>
                    <button onClick={() => setEditing(q)} className="rounded-md border border-neutral-800 px-3 py-1 text-sm">Edit</button>
                    <button onClick={async () => {
                      if (!confirm("Delete this inquiry?")) return;
                      setLoading(true);
                      await fetch(`/api/contacts/${q.id}`, { method: "DELETE" });
                      const res = await fetch("/api/contacts", { cache: "no-store" });
                      const data = await res.json();
                      const items = (data?.items || []).map((d: any) => ({
                        id: String(d.id), name: String(d.name||""), email: String(d.email||""), message: String(d.message||""), subject: String(d.subject||""), country: String(d.country||""), phone: String(d.phone||""), createdAt: String(d.createdAt||""), status: d.status === "done" ? "done" : "pending",
                      }));
                      setInquiries(items);
                      setLoading(false);
                    }} className="rounded-md border border-neutral-800 px-3 py-1 text-sm text-red-400">Delete</button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {editing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
          <div className="w-full max-w-xl rounded-lg border border-neutral-800 bg-neutral-900 p-4">
            <h3 className="text-lg font-semibold">Edit Inquiry</h3>
            <form className="mt-4 space-y-3" onSubmit={async (e) => {
              e.preventDefault();
              setLoading(true);
              await fetch(`/api/contacts/${editing.id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(editing) });
              const res = await fetch("/api/contacts", { cache: "no-store" });
              const data = await res.json();
              const items = (data?.items || []).map((d: any) => ({
                id: String(d.id), name: String(d.name||""), email: String(d.email||""), message: String(d.message||""), subject: String(d.subject||""), country: String(d.country||""), phone: String(d.phone||""), createdAt: String(d.createdAt||""), status: d.status === "done" ? "done" : "pending",
              }));
              setInquiries(items);
              setEditing(null);
              setLoading(false);
            }}>
              <input value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} className="w-full rounded-md border border-neutral-800 bg-neutral-900 text-neutral-100 px-3 py-2" />
              <input value={editing.email} onChange={(e) => setEditing({ ...editing, email: e.target.value })} className="w-full rounded-md border border-neutral-800 bg-neutral-900 text-neutral-100 px-3 py-2" />
              <input value={editing.phone || ""} onChange={(e) => setEditing({ ...editing, phone: e.target.value })} className="w-full rounded-md border border-neutral-800 bg-neutral-900 text-neutral-100 px-3 py-2" />
              <input value={editing.subject || ""} onChange={(e) => setEditing({ ...editing, subject: e.target.value })} className="w-full rounded-md border border-neutral-800 bg-neutral-900 text-neutral-100 px-3 py-2" />
              <textarea value={editing.message} onChange={(e) => setEditing({ ...editing, message: e.target.value })} rows={4} className="w-full rounded-md border border-neutral-800 bg-neutral-900 text-neutral-100 px-3 py-2" />
              <div className="flex justify-end gap-2">
                <button type="button" onClick={() => setEditing(null)} className="rounded-md border border-neutral-800 px-3 py-2">Cancel</button>
                <button type="submit" disabled={loading} className="rounded-md bg-neutral-200 text-neutral-900 hover:bg-white px-3 py-2 disabled:opacity-50">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}


