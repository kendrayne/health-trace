


export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-pacific-50 dark:bg-surface-dark p-6">
      <div className="w-full max-w-md bg-white dark:bg-pacific-900 rounded-3xl p-10 shadow-xl border border-pacific-100">
        <h2 className="text-3xl font-bold mb-2">Welcome back</h2>
        <p className="text-pacific-600 mb-8">Access your digital health archive.</p>
        
        <button className="w-full flex items-center justify-center gap-3 border-2 border-pacific-100 py-3 rounded-xl mb-6 hover:bg-pacific-50 transition-all font-medium">
          <img src="/google-icon.svg" className="w-5 h-5" alt="Google" />
          Continue with Google
        </button>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-pacific-100"></div></div>
          <div className="relative flex justify-center text-sm"><span className="bg-white dark:bg-pacific-900 px-4 text-pacific-400">Or email</span></div>
        </div>

        <form className="space-y-4">
          <input type="email" placeholder="Email address" className="w-full px-4 py-3 rounded-xl bg-pacific-50 border-none focus:ring-2 focus:ring-pacific-400 outline-none" />
          <input type="password" placeholder="Password" className="w-full px-4 py-3 rounded-xl bg-pacific-50 border-none focus:ring-2 focus:ring-pacific-400 outline-none" />
          <button className="w-full bg-pacific-500 text-white py-4 rounded-xl font-bold hover:bg-pacific-600 transition-all">Sign In</button>
        </form>
      </div>
    </div>
  );
}