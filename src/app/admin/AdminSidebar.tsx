"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback } from "react";

const navItems = [
  { label: "Dashboard", href: "/admin" },
  { label: "Newsletter", href: "/admin/newsletter" },
  { label: "Contact", href: "/admin/contact" },
  { label: "Blog", href: "/admin/blog" },
  { label: "Early Bird", href: "/admin/early-bird" },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = useCallback(async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch {}
    router.push('/login');
  }, [router]);

  return (
    <aside className="h-full w-64 border-r border-neutral-800 bg-neutral-900">
      <div className="px-6 py-5 border-b border-neutral-800">
        <Link href="/admin" className="block">
          <span className="text-xl font-semibold">Admin Panel</span>
        </Link>
        <p className="text-xs text-neutral-400 mt-1">Manage your site content</p>
      </div>

      <nav className="p-3 space-y-1">
        {navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={
                `block rounded-md px-3 py-2 text-sm font-medium transition ` +
                (active
                  ? "bg-neutral-800 text-white"
                  : "text-neutral-300 hover:bg-neutral-800 hover:text-white")
              }
            >
              {item.label}
            </Link>
          );
        })}

        <button
          type="button"
          onClick={handleLogout}
          className="w-full text-left rounded-md px-3 py-2 text-sm font-medium text-red-400 hover:bg-neutral-800 border-t border-neutral-800 mt-3 pt-3"
        >
          Logout
        </button>
      </nav>
    </aside>
  );
}


