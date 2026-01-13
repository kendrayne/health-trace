"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { register } from "../lib/actions/register";
import { signIn } from "next-auth/react";
export default function RegisterPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    disclaimer: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError("");
  setSuccess("");
  setLoading(true);

  try {
    const values = {
      name: formData.firstName + " " + formData.lastName,
      email: formData.email,
      password: formData.password,
      disclaimer: formData.disclaimer,
    };

    const registerRes = await register(values); 

    if (!registerRes.success) {
      throw new Error("Account creation failed");
    }

    const signInResult = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
    });

    if (signInResult?.error) {
      setError("Account created but login failed: " + signInResult.error);
    } else {
      setSuccess("Account created and logged in! Redirecting...");
      setTimeout(() => router.push("/dashboard"), 2000);
    }

  } catch (err: any) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen flex bg-surface-light dark:bg-surface-dark">
      {/* MARKETING */}
      <div className="hidden lg:flex lg:w-1/2 bg-pacific-500 p-16 flex-col justify-between text-white">
        <div>
          <div className="w-12 h-12 bg-white/20 rounded-xl backdrop-blur-md flex items-center justify-center font-bold text-2xl mb-8">H</div>
          <h2 className="text-4xl font-bold mb-6 leading-tight">
            Start bridging the <br /> clinical gap today.
          </h2>
          <ul className="space-y-6 text-pacific-100">
            <li className="flex gap-4">
              <div className="w-6 h-6 rounded-full bg-mint/30 flex items-center justify-center text-mint">✓</div>
              <p>Log symptoms, diet, habits, and meds in under 60 seconds.</p>
            </li>
            <li className="flex gap-4">
              <div className="w-6 h-6 rounded-full bg-mint/30 flex items-center justify-center text-mint">✓</div>
              <p>Smart pattern recognition designed to note correlations and displayed beautifully on a chart to make personal analysis easier.</p>
            </li>
            <li className="flex gap-4">
              <div className="w-6 h-6 rounded-full bg-mint/30 flex items-center justify-center text-mint">✓</div>
              <p>Generate clinician-ready PDF dashboards and secure, private, and descriptive reports analyzed by AI.</p>
            </li>
          </ul>
        </div>
      </div>

      {/* FORM */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-16">
        <div className="w-full max-w-md">
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-pacific-900 dark:text-pacific-50 mb-2">Create your account</h1>
            <p className="text-pacific-600 dark:text-pacific-400">Join a more objective health journey.</p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-pacific-700 ml-1">First Name</label>
                <input
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  type="text"
                  className="w-full px-4 py-3 rounded-xl bg-pacific-50 border border-pacific-100 focus:ring-2 focus:ring-pacific-400 outline-none transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-pacific-700 ml-1">Last Name</label>
                <input
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  type="text"
                  className="w-full px-4 py-3 rounded-xl bg-pacific-50 border border-pacific-100 focus:ring-2 focus:ring-pacific-400 outline-none transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-pacific-700 ml-1">Email</label>
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                type="email"
                placeholder="name@example.com"
                className="w-full px-4 py-3 rounded-xl bg-pacific-50 border border-pacific-100 focus:ring-2 focus:ring-pacific-400 outline-none transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-pacific-700 ml-1">Password</label>
              <input
                name="password"
                value={formData.password}
                onChange={handleChange}
                type="password"
                placeholder=""
                className="w-full px-4 py-3 rounded-xl bg-pacific-50 border border-pacific-100 focus:ring-2 focus:ring-pacific-400 outline-none transition-all"
              />
            </div>

            {/* DISCLAIMER!!! */}
            <div className="flex gap-3 p-4 bg-peach-50 rounded-xl border border-peach-100 mt-6">
              <input
                name="disclaimer"
                checked={formData.disclaimer}
                onChange={handleChange}
                type="checkbox"
                className="mt-1 accent-peach-500"
                id="disclaimer"
              />
              <label htmlFor="disclaimer" className="text-xs text-peach-900 leading-tight">
                I understand that <strong>health-trace</strong> is a descriptive, pattern-recognition tool and does not provide medical advice or diagnostic assessments. By signing up, you agree to the <Link href={"/terms-and-conditions"}><strong>terms and conditions</strong></Link>
              </label>
            </div>

            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            {success && <p className="text-green-500 text-sm mt-2">{success}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-peach-500 hover:bg-peach-600 text-white py-4 rounded-xl font-bold shadow-lg shadow-peach-100 transition-all mt-6 disabled:opacity-50"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <p className="text-center mt-8 text-pacific-500 text-sm">
            Already have an account? <Link href="/login" className="text-pacific-700 font-bold hover:underline">Log In</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
