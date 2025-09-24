"use client";

import { useEffect, useMemo, useState } from "react";

type BlogPost = {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
};

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");

  const slug = useMemo(() =>
    title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-"),
  [title]);

  const resetForm = () => {
    setEditingId(null);
    setTitle("");
    setSummary("");
    setContent("");
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/blog", { cache: "no-store" });
        const data = await res.json();
        setPosts(data?.items || []);
      } catch {}
    })();
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;
    try {
      setLoading(true);
      if (editingId) {
        await fetch(`/api/blog/${editingId}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ title, slug, summary, content }) });
      } else {
        await fetch(`/api/blog`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ title, slug, summary, content }) });
      }
      const res = await fetch("/api/blog", { cache: "no-store" });
      const data = await res.json();
      setPosts(data?.items || []);
      resetForm();
    } catch {}
    finally {
      setLoading(false);
    }
  };

  const onEdit = (post: BlogPost) => {
    setEditingId(post.id);
    setTitle(post.title);
    setSummary(post.summary);
    setContent(post.content);
  };

  const onDelete = (id: string) => {
    setPosts((prev) => prev.filter((p) => p.id !== id));
    if (editingId === id) resetForm();
  };

  return (
    <section>
      <h1 className="text-2xl font-bold">Blog</h1>
      <p className="text-neutral-400 mt-2">Create and manage blog posts.</p>

      <form onSubmit={onSubmit} className="mt-6 space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Title"
            className="rounded-md border border-neutral-800 bg-neutral-900 text-neutral-100 placeholder:text-neutral-500 px-3 py-2"
            required
          />
          <input
            value={slug}
            onChange={() => {}}
            disabled
            type="text"
            placeholder="Slug (auto)"
            className="rounded-md border border-neutral-800 px-3 py-2 bg-neutral-800 text-neutral-400"
          />
        </div>
        <input
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          type="text"
          placeholder="Summary"
          className="rounded-md border border-neutral-800 bg-neutral-900 text-neutral-100 placeholder:text-neutral-500 px-3 py-2 w-full"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content (Markdown supported)"
          className="rounded-md border border-neutral-800 bg-neutral-900 text-neutral-100 placeholder:text-neutral-500 px-3 py-2 w-full"
          rows={8}
          required
        />
        <div className="flex gap-2">
          <button type="submit" className="rounded-md bg-neutral-200 text-neutral-900 hover:bg-white px-4 py-2">
            {editingId ? "Update Post" : "Add Post"}
          </button>
          {editingId && (
            <button type="button" onClick={resetForm} className="rounded-md border border-neutral-800 px-4 py-2">
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="mt-8">
        <h2 className="text-lg font-semibold">Posts</h2>
        {posts.length === 0 ? (
          <p className="text-neutral-500 mt-2">No posts yet.</p>
        ) : (
          <ul className="mt-3 space-y-3">
            {posts.map((post) => (
              <li key={post.id} className="rounded border border-neutral-800 bg-neutral-900 p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-semibold">{post.title}</p>
                    <p className="text-xs text-neutral-400">/{post.slug}</p>
                    {post.summary && (
                      <p className="text-sm text-neutral-300 mt-1">{post.summary}</p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => onEdit(post)} className="rounded-md border border-neutral-800 px-3 py-1 text-sm">Edit</button>
                    <button onClick={async () => { await fetch(`/api/blog/${post.id}`, { method: "DELETE" }); const res = await fetch("/api/blog", { cache: "no-store" }); const data = await res.json(); setPosts(data?.items || []); }} className="rounded-md border border-neutral-800 px-3 py-1 text-sm text-red-400">Delete</button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}


