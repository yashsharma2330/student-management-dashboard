import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import {
  Plus,
  Search,
  Eye,
  Pencil,
  Trash2,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function Students({ students, setStudents, courses, batches }) {
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [viewStudent, setViewStudent] = useState(null);
  const [filterBatch, setFilterBatch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const emptyForm = {
    name: "",
    email: "",
    phone: "",
    course: "",
    batch: "",
  };

  const [form, setForm] = useState(emptyForm);

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(search.toLowerCase()) ||
      student.email.toLowerCase().includes(search.toLowerCase());

    const matchesBatch = !filterBatch || student.batch === filterBatch;

    return matchesSearch && matchesBatch;
  });

  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentStudents = filteredStudents.slice(startIndex, endIndex);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, filterBatch]);

  useEffect(() => {
    if (totalPages > 0 && currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingId) {
      setStudents(
        students.map((student) =>
          student.id === editingId ? { ...student, ...form } : student,
        ),
      );

      Swal.fire({
        title: "Updated!",
        text: "Student details updated successfully.",
        icon: "success",
        confirmButtonColor: "#2563eb",
      });
    } else {
      const newStudent = { id: Date.now(), ...form };

      setStudents([...students, newStudent]);

      // Show newly added student
      setCurrentPage(Math.ceil((filteredStudents.length + 1) / itemsPerPage));

      Swal.fire({
        title: "Added!",
        text: "New student added successfully.",
        icon: "success",
        confirmButtonColor: "#2563eb",
      });
    }

    setForm(emptyForm);
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (student) => {
    setForm({
      name: student.name,
      email: student.email,
      phone: student.phone,
      course: student.course,
      batch: student.batch,
    });

    setEditingId(student.id);
    setShowForm(true);

    Swal.fire({
      title: "Edit Mode",
      text: "You can now update student details.",
      icon: "info",
      confirmButtonColor: "#2563eb",
    });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to recover this student!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        setStudents(students.filter((student) => student.id !== id));

        Swal.fire({
          title: "Deleted!",
          text: "Student has been deleted successfully.",
          icon: "success",
          confirmButtonColor: "#2563eb",
        });
      }
    });
  };

  const inputStyle =
    "w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-blue-500";

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Students</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage all your institute students.
          </p>
        </div>

        <button
          onClick={() => {
            setForm(emptyForm);
            setEditingId(null);
            setShowForm(true);
          }}
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-medium text-white hover:bg-blue-700"
        >
          <Plus size={18} /> Add Student
        </button>
      </div>

      <div className="flex flex-col gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:flex-row">
        <div className="flex flex-1 items-center gap-2 rounded-xl border border-gray-200 px-3">
          <Search size={18} className="text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search student..."
            className="w-full py-3 text-sm outline-none"
          />
        </div>

        <select
          value={filterBatch}
          onChange={(e) => setFilterBatch(e.target.value)}
          className="rounded-xl border border-gray-200 px-4 py-3 text-sm"
        >
          <option value="">All Batches</option>
          {batches.map((batch) => (
            <option key={batch.id} value={batch.name}>
              {batch.name}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[750px] text-left text-sm">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                <th className="p-4">Student</th>
                <th className="p-4">Email</th>
                <th className="p-4">Phone</th>
                <th className="p-4">Course</th>
                <th className="p-4">Batch</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {currentStudents.map((student) => (
                <tr key={student.id} className="border-t border-gray-100">
                  <td className="p-4 font-semibold text-gray-800">
                    {student.name}
                  </td>
                  <td className="p-4 text-gray-500">{student.email}</td>
                  <td className="p-4 text-gray-500">{student.phone}</td>
                  <td className="p-4 text-gray-500">{student.course || "-"}</td>
                  <td className="p-4">
                    <span className="rounded-lg bg-blue-50 px-3 py-1 text-xs text-blue-600">
                      {student.batch || "Unassigned"}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setViewStudent(student)}
                        className="rounded-lg p-2 text-blue-600 hover:bg-blue-50"
                      >
                        <Eye size={17} />
                      </button>

                      <button
                        onClick={() => handleEdit(student)}
                        className="rounded-lg p-2 text-green-600 hover:bg-green-50"
                      >
                        <Pencil size={17} />
                      </button>

                      <button
                        onClick={() => handleDelete(student.id)}
                        className="rounded-lg p-2 text-red-500 hover:bg-red-50"
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredStudents.length === 0 && (
            <p className="p-10 text-center text-sm text-gray-400">
              No students found.
            </p>
          )}
        </div>

        {filteredStudents.length > 0 && (
          <div className="flex flex-col items-center justify-between gap-4 border-t border-gray-100 px-4 py-4 sm:flex-row">
            <p className="text-sm text-gray-500">
              Showing{" "}
              <span className="font-semibold text-gray-800">
                {startIndex + 1}
              </span>
              {" - "}
              <span className="font-semibold text-gray-800">
                {Math.min(endIndex, filteredStudents.length)}
              </span>
              {" of "}
              <span className="font-semibold text-gray-800">
                {filteredStudents.length}
              </span>
              {" students"}
            </p>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((prev) => prev - 1)}
                disabled={currentPage === 1}
                className="flex items-center gap-1 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronLeft size={16} />
                Previous
              </button>

              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index + 1}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`h-9 w-9 rounded-lg text-sm font-medium transition ${
                    currentPage === index + 1
                      ? "bg-blue-600 text-white"
                      : "border border-gray-200 text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {index + 1}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage((prev) => prev + 1)}
                disabled={currentPage === totalPages}
                className="flex items-center gap-1 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>

      {showForm && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto bg-black/40 p-4">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-lg space-y-4 rounded-2xl bg-white p-6 shadow-xl"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">
                {editingId ? "Edit Student" : "Add New Student"}
              </h2>
              <button type="button" onClick={() => setShowForm(false)}>
                <X />
              </button>
            </div>

            <input
              className={inputStyle}
              placeholder="Student Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />

            <input
              className={inputStyle}
              type="email"
              placeholder="Email Address"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />

            <input
              className={inputStyle}
              placeholder="Phone Number"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              required
            />

            <select
              className={inputStyle}
              value={form.course}
              onChange={(e) =>
                setForm({ ...form, course: e.target.value, batch: "" })
              }
            >
              <option value="">Select Course</option>
              {courses.map((course) => (
                <option key={course.id} value={course.name}>
                  {course.name}
                </option>
              ))}
            </select>

            <select
              className={inputStyle}
              value={form.batch}
              onChange={(e) => setForm({ ...form, batch: e.target.value })}
            >
              <option value="">Select Batch</option>
              {batches
                .filter((batch) => !form.course || batch.course === form.course)
                .map((batch) => (
                  <option key={batch.id} value={batch.name}>
                    {batch.name}
                  </option>
                ))}
            </select>

            <button className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700">
              {editingId ? "Update Student" : "Save Student"}
            </button>
          </form>
        </div>
      )}

      {viewStudent && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-bold">Student Details</h2>
              <button onClick={() => setViewStudent(null)}>
                <X />
              </button>
            </div>

            <div className="space-y-4 text-sm">
              {[
                ["Name", viewStudent.name],
                ["Email", viewStudent.email],
                ["Phone", viewStudent.phone],
                ["Course", viewStudent.course || "Not assigned"],
                ["Batch", viewStudent.batch || "Not assigned"],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="flex justify-between gap-4 border-b border-gray-100 pb-3"
                >
                  <span className="text-gray-400">{label}</span>
                  <span className="font-medium text-gray-800">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
