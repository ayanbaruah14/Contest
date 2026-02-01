import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SignupApi } from "../api/auth";
import { Link } from "react-router-dom";
export default function Signup() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    role: "user",
    name: "",
    email: "",
password:"",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload =
      form.role === "user"
        ? {
            role: form.role,
            name: form.name,
            email: form.email,
password:form.password,
          }
        : {
            role: form.role,
            name: form.name,
            email: form.email
          };

    try {
      const res = await SignupApi(payload);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate(
        res.data.user.role === "company"
          ? "/provider"
          : "/jobs"
      );
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = "w-full bg-slate-900 border border-slate-800 text-white rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all placeholder:text-slate-600";
  const labelStyle = "block mb-1.5 text-sm font-medium text-slate-400 ml-1";

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
      <div className="w-full max-w-lg">
        
        {/* Role Toggle Switch */}
        <div className="flex bg-slate-900 p-1.5 rounded-2xl mb-8 border border-slate-800 shadow-inner">
          <button 
            type="button"
            onClick={() => setForm({...form, role: "user"})}
            className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all duration-200 ${form.role === "user" ? "bg-indigo-600 text-white shadow-lg" : "text-slate-500 hover:text-slate-300"}`}
          >
            Candidate
          </button>
          <button 
            type="button"
            onClick={() => setForm({...form, role: "company"})}
            className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all duration-200 ${form.role === "company" ? "bg-indigo-600 text-white shadow-lg" : "text-slate-500 hover:text-slate-300"}`}
          >
            Company / Employer
          </button>
        </div>

        {/* Signup Form Card */}
        <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-2xl relative overflow-hidden">
            {/* Soft decorative glow */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-600/10 blur-[80px] rounded-full"></div>

          <div className="mb-8">
            <h2 className="text-3xl font-extrabold text-white tracking-tight">Create Account</h2>
            <p className="text-slate-500 mt-2 italic text-sm">
                {form.role === 'user' ? "Join as a candidate to find top tech jobs." : "Join as a provider to hire world-class talent."}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className={labelStyle}>{form.role === 'user' ? "Full Name" : "Company Name"}</label>
              <input name="name" placeholder={form.role === 'user' ? "John Doe" : "TechCorp Inc."} onChange={handleChange} className={inputStyle} required />
            </div>

            <div>
              <label className={labelStyle}>Email Address</label>
              <input name="email" type="email" placeholder="name@domain.com" onChange={handleChange} className={inputStyle} required />
            </div>
            <div>
              <label className={labelStyle}>Password</label>
              <input name="password" type="password" placeholder="abc123_@" onChange={handleChange} className={inputStyle} required />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-4 bg-indigo-600 hover:bg-indigo-500 text-white py-4 rounded-xl font-bold transition-all shadow-lg shadow-indigo-500/20 active:scale-[0.98] disabled:opacity-70"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  Processing...
                </span>
              ) : "Create Professional Account"}
            </button>
          </form>

<p className="mt-8 text-center text-sm text-slate-500">
  Already have an account?{" "}
  <Link
    to="/login"
    className="text-indigo-400 hover:underline"
  >
    Log in
  </Link>
</p>

        </div>
      </div>
    </div>
  );
}