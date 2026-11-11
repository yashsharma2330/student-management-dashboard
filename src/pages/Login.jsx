
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GraduationCap, Eye, EyeOff, Lock, Mail } from "lucide-react";
import Swal from "sweetalert2";

export default function Login({ onLogin }) {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const adminEmail = "admin@studentmanager.com";
    const adminPassword = "admin123";

    if (email === adminEmail && password === adminPassword) {
      localStorage.setItem("isLoggedIn", "true");

      onLogin();

      Swal.fire({
        title: "Welcome Admin!",
        text: "Login successful.",
        icon: "success",
        timer: 1200,
        showConfirmButton: false,
      });

      navigate("/admin", { replace: true });
    } else {
      Swal.fire({
        title: "Login Failed",
        text: "Invalid email or password.",
        icon: "error",
        confirmButtonColor: "#2563eb",
      });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f8fafc] px-4 py-8">
      <div className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-7 shadow-sm sm:p-9">

        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white">
            <GraduationCap size={30} />
          </div>

          <h1 className="text-2xl font-bold text-gray-900">
            Student Manager
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Admin Login
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Email Address
            </label>

            <div className="flex items-center gap-3 rounded-xl border border-gray-200 px-4 focus-within:border-blue-500">
              <Mail size={18} className="text-gray-400" />

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full py-3 text-sm outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Password
            </label>

            <div className="flex items-center gap-3 rounded-xl border border-gray-200 px-4 focus-within:border-blue-500">
              <Lock size={18} className="text-gray-400" />

              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full py-3 text-sm outline-none"
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-400 hover:text-gray-700"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-blue-600 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Login to Dashboard
          </button>

        </form>

        <p className="mt-6 text-center text-xs text-gray-400">
          © 2026 Student Manager. All rights reserved.
        </p>

      </div>
    </div>
  );
}
