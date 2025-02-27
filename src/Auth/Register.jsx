import { useState } from "react";
import "./Register.css";
import { toast, Toaster } from "react-hot-toast";


const API_BASE = "https://server-node-eef9.onrender.com";


const Register = () => {
  const [formData, setFormData] = useState({
    username: "", email: "", password: "", address: "", phone: "", agreeTerms: false
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE}/Auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Registration failed ❌");

      toast.success("✅ Registration Successful!");
      setFormData({ username: "", email: "", password: "", address: "", phone: "", agreeTerms: false });
    } catch (error) {
      toast.error(error.message || "Something went wrong ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-aside"><img src="register-img" alt="" /></div>
      <div className="register">
        <form className="form-block" autoComplete="off" onSubmit={handleSubmit}>
          <h1 className="titilereg">Create Your Account</h1>
          <p className="para">It's free for 14 days. No credit card required.</p>

          <div>
            <label className="labelitem" htmlFor="username">Username *</label>
            <input className="form-item" type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Enter username" required />
          </div>

          <div>
            <label className="labelitem" htmlFor="email">Email *</label>
            <input className="form-item" type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter email" required />
          </div>

          <div>
            <label className="labelitem" htmlFor="password">Password *</label>
            <input className="form-item" type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Enter password" required />
          </div>

          <div>
            <label className="labelitem" htmlFor="address">Address *</label>
            <input className="form-item" type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Enter address" required />
          </div>

          <div>
            <label className="labelitem" htmlFor="phone">Phone *</label>
            <input className="form-item" type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Enter phone" required />
          </div>

          <div className="checkbox">
            <input type="checkbox" name="agreeTerms" checked={formData.agreeTerms} onChange={handleChange} />
            <span className="cheakout">By creating an account, you agree to our terms of service.</span>
          </div>

          <button className="sub" type="submit" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
          <div><Toaster position="top-right"
           reverseOrder={false}
           color='#fff'
          /></div>
        </form>
      </div>
    </div>
  );
};

export default Register;
