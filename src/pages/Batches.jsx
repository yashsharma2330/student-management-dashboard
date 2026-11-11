
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import {
  Plus,
  Search,
  Eye,
  Pencil,
  Trash2,
  X,
  Clock,
  Users,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function Batches({
  batches,
  setBatches,
  courses,
  students,
  setStudents,
}) {
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [viewBatch, setViewBatch] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const emptyForm = {
    name: "",
    course: "",
    timing: "",
    startDate: "",
  };

  const [form, setForm] = useState(emptyForm);

  const inputStyle =
    "w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-blue-500";


  const filteredBatches = batches.filter(
    (batch) =>
      batch.name.toLowerCase().includes(search.toLowerCase()) ||
      batch.course.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredBatches.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentBatches = filteredBatches.slice(startIndex, endIndex);


  useEffect(() => {
    setCurrentPage(1);
  }, [search]);


  useEffect(() => {
    if (totalPages > 0 && currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingId) {
      const oldBatch = batches.find((batch) => batch.id === editingId);

      setBatches(
        batches.map((batch) =>
          batch.id === editingId ? { ...batch, ...form } : batch
        )
      );

      if (oldBatch && oldBatch.name !== form.name) {
        setStudents(
          students.map((student) =>
            student.batch === oldBatch.name
              ? { ...student, batch: form.name }
              : student
          )
        );
      }

      Swal.fire({
        title: "Updated!",
        text: "Batch updated successfully.",
        icon: "success",
        confirmButtonColor: "#2563eb",
      });
    } else {
      setBatches([...batches, { id: Date.now(), ...form }]);

 
      setCurrentPage(Math.ceil((filteredBatches.length + 1) / itemsPerPage));

      Swal.fire({
        title: "Added!",
        text: "New batch added successfully.",
        icon: "success",
        confirmButtonColor: "#2563eb",
      });
    }

    setForm(emptyForm);
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (batch) => {
    setForm({
      name: batch.name,
      course: batch.course,
      timing: batch.timing,
      startDate: batch.startDate,
    });

    setEditingId(batch.id);
    setShowForm(true);

    Swal.fire({
      title: "Edit Mode",
      text: "You can now update batch details.",
      icon: "info",
      confirmButtonColor: "#2563eb",
    });
  };

  const handleDelete = (batch) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to delete ${batch.name}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        setBatches(batches.filter((item) => item.id !== batch.id));

        setStudents(
          students.map((student) =>
            student.batch === batch.name
              ? { ...student, batch: "" }
              : student
          )
        );

        Swal.fire({
          title: "Deleted!",
          text: "Batch deleted successfully.",
          icon: "success",
          confirmButtonColor: "#2563eb",
        });
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Batches</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your institute batches and schedules.
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
          <Plus size={18} /> Create Batch
        </button>
      </div>

      <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4">
        <Search size={18} className="text-gray-400" />

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search batches..."
          className="w-full py-3 text-sm outline-none"
        />
      </div>

      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[750px] text-left text-sm">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                <th className="p-4">Batch Name</th>
                <th className="p-4">Course</th>
                <th className="p-4">Timing</th>
                <th className="p-4">Start Date</th>
                <th className="p-4">Students</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {currentBatches.map((batch) => {
                const totalStudents = students.filter(
                  (student) => student.batch === batch.name
                ).length;

                return (
                  <tr key={batch.id} className="border-t border-gray-100">
                    <td className="p-4 font-semibold text-gray-800">
                      {batch.name}
                    </td>

                    <td className="p-4 text-gray-500">{batch.course}</td>

                    <td className="p-4 text-gray-500">
                      <span className="flex items-center gap-2">
                        <Clock size={15} />
                        {batch.timing}
                      </span>
                    </td>

                    <td className="p-4 text-gray-500">{batch.startDate}</td>

                    <td className="p-4">
                      <span className="flex items-center gap-2 text-gray-600">
                        <Users size={16} />
                        {totalStudents}
                      </span>
                    </td>

                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setViewBatch(batch)}
                          className="rounded-lg p-2 text-blue-600 hover:bg-blue-50"
                        >
                          <Eye size={17} />
                        </button>

                        <button
                          onClick={() => handleEdit(batch)}
                          className="rounded-lg p-2 text-green-600 hover:bg-green-50"
                        >
                          <Pencil size={17} />
                        </button>

                        <button
                          onClick={() => handleDelete(batch)}
                          className="rounded-lg p-2 text-red-500 hover:bg-red-50"
                        >
                          <Trash2 size={17} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {filteredBatches.length === 0 && (
            <p className="p-10 text-center text-sm text-gray-400">
              No batches found.
            </p>
          )}
        </div>

        {filteredBatches.length > 0 && (
          <div className="flex flex-col items-center justify-between gap-4 border-t border-gray-100 px-4 py-4 sm:flex-row">
            <p className="text-sm text-gray-500">
              Showing{" "}
              <span className="font-semibold text-gray-800">
                {startIndex + 1}
              </span>
              {" - "}
              <span className="font-semibold text-gray-800">
                {Math.min(endIndex, filteredBatches.length)}
              </span>
              {" of "}
              <span className="font-semibold text-gray-800">
                {filteredBatches.length}
              </span>
              {" batches"}
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
            className="w-full max-w-lg space-y-4 rounded-2xl bg-white p-6"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">
                {editingId ? "Edit Batch" : "Create New Batch"}
              </h2>

              <button type="button" onClick={() => setShowForm(false)}>
                <X />
              </button>
            </div>

            <input
              className={inputStyle}
              placeholder="Batch Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />

            <select
              className={inputStyle}
              value={form.course}
              onChange={(e) => setForm({ ...form, course: e.target.value })}
              
            >
              <option value="">Select Course</option>

              {courses.map((course) => (
                <option key={course.id} value={course.name}>
                  {course.name}
                </option>
              ))}
            </select>

            <input
              className={inputStyle}
              placeholder="Batch Timing (e.g. 10 AM - 12 PM)"
              value={form.timing}
              onChange={(e) => setForm({ ...form, timing: e.target.value })}
              required
            />

            <input
              className={inputStyle}
              type="date"
              value={form.startDate}
              onChange={(e) =>
                setForm({ ...form, startDate: e.target.value })
              }
              required
            />

            <button className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700">
              {editingId ? "Update Batch" : "Create Batch"}
            </button>
          </form>
        </div>
      )}

      {viewBatch && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-bold">Batch Details</h2>

              <button onClick={() => setViewBatch(null)}>
                <X />
              </button>
            </div>

            <div className="space-y-4 text-sm">
              {[
                ["Batch Name", viewBatch.name],
                ["Course", viewBatch.course],
                ["Timing", viewBatch.timing],
                ["Start Date", viewBatch.startDate],
                [
                  "Total Students",
                  students.filter(
                    (student) => student.batch === viewBatch.name
                  ).length,
                ],
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
