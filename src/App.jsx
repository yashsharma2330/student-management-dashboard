import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import Courses from "./pages/Courses";
import Batches from "./pages/Batches";

function getSavedData(key, defaultData) {
  try {
    const savedData = localStorage.getItem(key);

    if (savedData !== null) {
      return JSON.parse(savedData);
    }

    return defaultData;
  } catch {
    return defaultData;
  }
}

function App() {
  const demoCourses = [
    {
      id: 1,
      name: "Full Stack Web Development",
      duration: "6 Months",
      fees: 25000,
      description: "Learn HTML, CSS, JavaScript, React and Node.js.",
    },
    {
      id: 2,
      name: "Frontend Development",
      duration: "4 Months",
      fees: 18000,
      description: "Learn HTML, CSS, JavaScript and React.",
    },
    {
      id: 3,
      name: "Python Programming",
      duration: "3 Months",
      fees: 12000,
      description: "Learn Python programming from basics.",
    },
    {
      id: 4,
      name: "UI UX Design",
      duration: "3 Months",
      fees: 15000,
      description: "Learn Figma and modern UI UX design.",
    },
  ];

  const demoBatches = [
    {
      id: 1,
      name: "FSWD-01",
      course: "Full Stack Web Development",
      timing: "10:00 AM - 12:00 PM",
      startDate: "2026-10-01",
    },
    {
      id: 2,
      name: "FED-01",
      course: "Frontend Development",
      timing: "12:00 PM - 02:00 PM",
      startDate: "2026-10-05",
    },
    {
      id: 3,
      name: "PY-01",
      course: "Python Programming",
      timing: "02:00 PM - 04:00 PM",
      startDate: "2026-10-10",
    },
    {
      id: 4,
      name: "UIUX-01",
      course: "UI UX Design",
      timing: "04:00 PM - 06:00 PM",
      startDate: "2026-10-15",
    },
  ];

  const demoStudents = [
    {
      id: 1,
      name: "Rahul Sharma",
      email: "rahulsharma@gmail.com",
      phone: "8776543210",
      course: "Full Stack Web Development",
      batch: "FSWD-01",
    },
    {
      id: 2,
      name: "Priya Verma",
      email: "priyaverma@gmail.com",
      phone: "7523965821",
      course: "Frontend Development",
      batch: "FED-01",
    },
    {
      id: 3,
      name: "Aman Singh",
      email: "amansingh@gmail.com",
      phone: "9896872852",
      course: "Python Programming",
      batch: "PY-01",
    },
    {
      id: 4,
      name: "Sneha Gupta",
      email: "snehagupta@gmail.com",
      phone: "9678521486",
      course: "UI UX Design",
      batch: "UIUX-01",
    },
    {
      id: 5,
      name: "Arjun Mehta",
      email: "arjunmehta@gmail.com",
      phone: "8529659836",
      course: "Full Stack Web Development",
      batch: "FSWD-01",
    },
  ];

  const [isLoggedIn, setIsLoggedIn] = useState(
    () => localStorage.getItem("isLoggedIn") === "true",
  );

  const [students, setStudents] = useState(() =>
    getSavedData("students", demoStudents),
  );

  const [courses, setCourses] = useState(() =>
    getSavedData("courses", demoCourses),
  );

  const [batches, setBatches] = useState(() =>
    getSavedData("batches", demoBatches),
  );

  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem("courses", JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    localStorage.setItem("batches", JSON.stringify(batches));
  }, [batches]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    setSidebarOpen(false);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            isLoggedIn ? (
              <Navigate to="/admin" replace />
            ) : (
              <Login onLogin={() => setIsLoggedIn(true)} />
            )
          }
        />

        <Route
          path="/*"
          element={
            isLoggedIn ? (
              <div className="min-h-screen bg-[#f8fafc]">
                <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

                <div className="min-h-screen lg:ml-64">
                  <Navbar setOpen={setSidebarOpen} onLogout={handleLogout} />

                  <main className="p-4 md:p-8">
                    <Routes>
                      <Route
                        path="/"
                        element={<Navigate to="/admin" replace />}
                      />

                      <Route
                        path="/admin"
                        element={
                          <Dashboard
                            students={students}
                            courses={courses}
                            batches={batches}
                          />
                        }
                      />

                      <Route
                        path="/admin/students"
                        element={
                          <Students
                            students={students}
                            setStudents={setStudents}
                            courses={courses}
                            batches={batches}
                          />
                        }
                      />

                      <Route
                        path="/admin/courses"
                        element={
                          <Courses
                            courses={courses}
                            setCourses={setCourses}
                            students={students}
                            setStudents={setStudents}
                          />
                        }
                      />

                      <Route
                        path="/admin/batches"
                        element={
                          <Batches
                            batches={batches}
                            setBatches={setBatches}
                            students={students}
                            setStudents={setStudents}
                            courses={courses}
                          />
                        }
                      />

                      <Route
                        path="*"
                        element={<Navigate to="/admin" replace />}
                      />
                    </Routes>
                  </main>
                </div>
              </div>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
