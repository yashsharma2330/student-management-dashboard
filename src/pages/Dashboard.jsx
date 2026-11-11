import { Users, BookOpen, Layers, GraduationCap } from "lucide-react";

import StatCard from "../components/StatCard";
import Charts from "../components/Charts";

export default function Dashboard({ students, courses, batches }) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="mt-1 text-sm text-gray-500">
          Here's what's happening in your institute today.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Students"
          value={students.length}
          icon={Users}
          color="bg-blue-50 text-blue-600"
        />

        <StatCard
          title="Total Courses"
          value={courses.length}
          icon={BookOpen}
          color="bg-indigo-50 text-indigo-600"
        />

        <StatCard
          title="Total Batches"
          value={batches.length}
          icon={Layers}
          color="bg-sky-50 text-sky-600"
        />

        <StatCard
          title="Active Students"
          value={students.length}
          icon={GraduationCap}
          color="bg-cyan-50 text-cyan-600"
        />
      </div>

      <Charts students={students} courses={courses} batches={batches} />

      <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-gray-900">Recent Students</h3>
            <p className="mt-1 text-xs text-gray-400">
              Recently added students
            </p>
          </div>
          <Users size={21} className="text-blue-500" />
        </div>

        {students.length === 0 ? (
          <p className="py-8 text-center text-sm text-gray-400">
            No students added yet.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px] text-left text-sm">
              <thead className="border-b bg-gray-50 text-gray-500">
                <tr>
                  <th className="p-3">Name</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Phone</th>
                  <th className="p-3">Batch</th>
                </tr>
              </thead>

              <tbody>
                {students
                  .slice(-5)
                  .reverse()
                  .map((student) => (
                    <tr key={student.id} className="border-b border-gray-100">
                      <td className="p-3 font-medium text-gray-800">
                        {student.name}
                      </td>
                      <td className="p-3 text-gray-500">{student.email}</td>
                      <td className="p-3 text-gray-500">{student.phone}</td>
                      <td className="p-3 text-gray-500">
                        {student.batch || "Not assigned"}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
