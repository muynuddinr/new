export default function AdminDashboardPage() {
  return (
    <section>
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="text-neutral-400 mt-2">Quick overview of your platform.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        <div className="rounded-lg border border-neutral-800 bg-neutral-900 p-4">
          <h2 className="text-sm font-medium text-neutral-400">Subscribers</h2>
          <p className="text-3xl font-semibold mt-2">--</p>
        </div>
        <div className="rounded-lg border border-neutral-800 bg-neutral-900 p-4">
          <h2 className="text-sm font-medium text-neutral-400">Contacts</h2>
          <p className="text-3xl font-semibold mt-2">--</p>
        </div>
        <div className="rounded-lg border border-neutral-800 bg-neutral-900 p-4">
          <h2 className="text-sm font-medium text-neutral-400">Active Sessions</h2>
          <p className="text-3xl font-semibold mt-2">--</p>
        </div>
      </div>
    </section>
  );
}


