import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const cycleData = Array.from({ length: 28 }, (_, index) => {
  const day = index + 1;
  const probability =
    day <= 5
      ? 15
      : day <= 10
      ? 35
      : day <= 16
      ? 90
      : day <= 20
      ? 40
      : 20;
  return { day, probability };
});

export function TrackerChart() {
  return (
    <div className="bg-white rounded-3xl p-4 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-sm text-gray-500">Cycle probability</p>
          <h3 className="text-lg font-semibold">Fertility & phases</h3>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={240}>
        <LineChart data={cycleData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis dataKey="day" tick={{ fill: '#6B7280', fontSize: 12 }} />
          <YAxis tick={{ fill: '#6B7280', fontSize: 12 }} domain={[0, 100]} />
          <Tooltip formatter={(value: number) => `${value}%`} />
          <Line type="monotone" dataKey="probability" stroke="#8B5CF6" strokeWidth={3} dot={{ r: 3 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}