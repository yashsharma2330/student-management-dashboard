import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";

const COLORS = ["#2563eb", "#60a5fa", "#93c5fd", "#bfdbfe"];

export default function Charts({ students, courses, batches }) {
  const enrollmentData = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"].map(
    (month, index) => ({
      month,
      students: Math.round((students.length * (index + 1)) / 6),
    }),
  );

  const courseData = courses.map((course) => ({
    name: course.name,
    value: students.filter((student) => student.course === course.name).length,
  }));

  const batchData = batches.map((batch) => ({
    name: batch.name,
    students: students.filter((student) => student.batch === batch.name).length,
  }));

  return (
    <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
      <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
        <h3 className="font-bold text-gray-900">Student Enrollment</h3>
        <p className="mt-1 text-xs text-gray-400">Enrollment overview</p>

        <div className="mt-6 h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={enrollmentData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" axisLine={false} tickLine={false} />
              <YAxis allowDecimals={false} axisLine={false} tickLine={false} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="students"
                stroke="#2563eb"
                strokeWidth={3}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
        <h3 className="font-bold text-gray-900">Student Distribution</h3>
        <p className="mt-1 text-xs text-gray-400">Students by course</p>

        <div className="mt-6 h-64">
          {courseData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={courseData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  label
                >
                  {courseData.map((item, index) => (
                    <Cell
                      key={item.name}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-gray-400">
              Add courses to see distribution
            </div>
          )}
        </div>
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm xl:col-span-2">
        <h3 className="font-bold text-gray-900">Batch Performance</h3>
        <p className="mt-1 text-xs text-gray-400">
          Students enrolled in each batch
        </p>

        <div className="mt-6 h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={batchData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <YAxis allowDecimals={false} axisLine={false} tickLine={false} />
              <Tooltip />
              <Bar dataKey="students" fill="#60a5fa" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
