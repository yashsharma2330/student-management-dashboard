import { useState } from "react";
import Swal from "sweetalert2";
import { Plus, Search, Eye, Pencil, Trash2, X, BookOpen } from "lucide-react";

export default function Courses({
  courses,
  setCourses,
  students,
  setStudents,
}) {
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [viewCourse, setViewCourse] = useState(null);

  const emptyForm = {
    name: "",
    duration: "",
    fees: "",
    description: "",
  };

  const [form, setForm] = useState(emptyForm);

  const filteredCourses = courses.filter((course) =>
    course.name.toLowerCase().includes(search.toLowerCase()),
  );

  const inputStyle =
    "w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-blue-500";

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingId) {
      setCourses(
        courses.map((course) =>
          course.id === editingId ? { ...course, ...form } : course,
        ),
      );

      Swal.fire({
        title: "Updated!",
        text: "Course updated successfully.",
        icon: "success",
        confirmButtonColor: "#2563eb",
      });
    } else {
      setCourses([...courses, { id: Date.now(), ...form }]);

      Swal.fire({
        title: "Added!",
        text: "New course added successfully.",
        icon: "success",
        confirmButtonColor: "#2563eb",
      });
    }

    setForm(emptyForm);
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (course) => {
    setForm({
      name: course.name,
      duration: course.duration,
      fees: course.fees,
      description: course.description || "",
    });

    setEditingId(course.id);
    setShowForm(true);

    Swal.fire({
      title: "Edit Mode",
      text: "You can now update course details.",
      icon: "info",
      confirmButtonColor: "#2563eb",
    });
  };

  const handleDelete = (course) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to delete ${course.name}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        setCourses(courses.filter((item) => item.id !== course.id));

        const relatedBatches = JSON.parse(
          localStorage.getItem("batches") || "[]",
        ).filter((batch) => batch.course === course.name);

        const relatedBatchNames = relatedBatches.map((batch) => batch.name);

        setStudents(
          students.map((student) =>
            student.course === course.name
              ? { ...student, course: "", batch: "" }
              : student,
          ),
        );

        Swal.fire({
          title: "Deleted!",
          text: "Course deleted successfully.",
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
          <h1 className="text-2xl font-bold text-gray-900">Courses</h1>
          <p className="mt-1 text-sm text-gray-500">
            Create and manage institute courses.
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
          <Plus size={18} /> Add Course
        </button>
      </div>

      <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4">
        <Search size={18} className="text-gray-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search courses..."
          className="w-full py-3 text-sm outline-none"
        />
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filteredCourses.map((course) => {
          const totalStudents = students.filter(
            (student) => student.course === course.name,
          ).length;

          return (
            <div
              key={course.id}
              className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
                  <BookOpen size={23} />
                </div>

                <div className="flex gap-1">
                  <button
                    onClick={() => setViewCourse(course)}
                    className="rounded-lg p-2 text-blue-600 hover:bg-blue-50"
                  >
                    <Eye size={17} />
                  </button>

                  <button
                    onClick={() => handleEdit(course)}
                    className="rounded-lg p-2 text-green-600 hover:bg-green-50"
                  >
                    <Pencil size={17} />
                  </button>

                  <button
                    onClick={() => handleDelete(course)}
                    className="rounded-lg p-2 text-red-500 hover:bg-red-50"
                  >
                    <Trash2 size={17} />
                  </button>
                </div>
              </div>

              <h3 className="mt-5 text-lg font-bold text-gray-900">
                {course.name}
              </h3>

              <p className="mt-2 line-clamp-2 min-h-10 text-sm text-gray-400">
                {course.description || "No description added."}
              </p>

              <div className="mt-5 grid grid-cols-3 gap-2 border-t border-gray-100 pt-4">
                <div>
                  <p className="text-xs text-gray-400">Duration</p>
                  <p className="mt-1 text-sm font-semibold">
                    {course.duration}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-400">Fees</p>
                  <p className="mt-1 text-sm font-semibold">₹{course.fees}</p>
                </div>

                <div>
                  <p className="text-xs text-gray-400">Students</p>
                  <p className="mt-1 text-sm font-semibold">{totalStudents}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredCourses.length === 0 && (
        <div className="rounded-2xl bg-white p-10 text-center text-sm text-gray-400">
          No courses found.
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto bg-black/40 p-4">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-lg space-y-4 rounded-2xl bg-white p-6"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">
                {editingId ? "Edit Course" : "Add New Course"}
              </h2>

              <button type="button" onClick={() => setShowForm(false)}>
                <X />
              </button>
            </div>

            <input
              className={inputStyle}
              placeholder="Course Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />

            <input
              className={inputStyle}
              placeholder="Duration (e.g. 6 Months)"
              value={form.duration}
              onChange={(e) => setForm({ ...form, duration: e.target.value })}
              required
            />

            <input
              className={inputStyle}
              type="number"
              min="0"
              placeholder="Course Fees"
              value={form.fees}
              onChange={(e) => setForm({ ...form, fees: e.target.value })}
              required
            />

            <textarea
              className={inputStyle}
              rows="3"
              placeholder="Course Description"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />

            <button className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700">
              {editingId ? "Update Course" : "Save Course"}
            </button>
          </form>
        </div>
      )}

      {viewCourse && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-bold">Course Details</h2>

              <button onClick={() => setViewCourse(null)}>
                <X />
              </button>
            </div>

            <div className="space-y-4 text-sm">
              {[
                ["Course", viewCourse.name],
                ["Duration", viewCourse.duration],
                ["Fees", `₹${viewCourse.fees}`],
                ["Description", viewCourse.description || "No description"],
              ].map(([label, value]) => (
                <div key={label} className="border-b border-gray-100 pb-3">
                  <p className="text-gray-400">{label}</p>
                  <p className="mt-1 font-medium text-gray-800">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
