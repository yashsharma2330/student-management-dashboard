export default function StatCard({ title, value, icon: Icon, color }) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-gray-500">{title}</p>

        <div className={`rounded-xl p-3 ${color}`}>
          <Icon size={21} />
        </div>
      </div>

      <h2 className="mt-5 text-3xl font-bold text-gray-900">{value}</h2>

      <p className="mt-2 text-xs text-gray-400">Current total records</p>
    </div>
  );
}
