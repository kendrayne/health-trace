'use client';
import { signIn } from "next-auth/react";
import { useState } from "react";
import { LoginSchema } from "@/schemas";

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const result = await signIn("credentials", {
      redirect: false,
      email: formData.email,
      password: formData.password,
    });

    setLoading(false);

    if (result?.error) {
      setError("Invalid email or password");
    } else if (result?.ok) {
      // redirect manually or reload
      window.location.href = "/dashboard";
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-pacific-50 dark:bg-surface-dark p-6">
      <div className="w-full max-w-md bg-white dark:bg-pacific-900 rounded-3xl p-10 shadow-xl border border-pacific-100">
        <h2 className="text-3xl font-bold mb-2">Welcome back</h2>
        <p className="text-pacific-600 mb-8">Access your digital health archive.</p>

        <button
          className="w-full flex items-center justify-center gap-3 border-2 border-pacific-100 py-3 rounded-xl mb-6 hover:bg-pacific-50 transition-all font-medium"
          onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
        >
          <img src="/google-icon.svg" className="w-5 h-5" alt="Google" />
          Continue with Google
        </button>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-pacific-100"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white dark:bg-pacific-900 px-4 text-pacific-400">Or email</span>
          </div>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-pacific-50 border-none focus:ring-2 focus:ring-pacific-400 outline-none"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-pacific-50 border-none focus:ring-2 focus:ring-pacific-400 outline-none"
          />
          {error && <p className="text-red-500">{error}</p>}
          <button
            type="submit"
            className="w-full bg-pacific-500 text-white py-4 rounded-xl font-bold hover:bg-pacific-600 transition-all"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
