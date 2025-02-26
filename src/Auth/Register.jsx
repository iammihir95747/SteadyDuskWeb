import { useState } from "react";
import { toast, ToastContainer, Bounce } from "react-toastify";
import "./Register.css";

const API_BASE = import.meta.env.VITE_BASE_URL || "http://localhost:10000";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    address: "",
    phone: "",
    agreeTerms: false,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.username) newErrors.username = "Username is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.password) newErrors.password = "Password is required";
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Invalid phone number (10 digits required)";
    }
    if (!formData.agreeTerms) newErrors.agreeTerms = "You must agree to the terms";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    try {
      const response = await fetch(`${API_BASE}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "Registration failed ❌");

      toast.success("✅ Registration Successful!");
      setFormData({
        username: "",
        email: "",
        password: "",
        address: "",
        phone: "",
        agreeTerms: false,
      });
    } catch (error) {
      toast.error(error.message || "Something went wrong ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-aside">
        <img src="register-img" alt="" />
      </div>
      <div className="register">
        <div className="form">
          <form className="form-block" autoComplete="off" onSubmit={handleSubmit}>
            <h1 className="titilereg">Create Your Account</h1>
            <p className="para">It's free for 14 days. No credit card required.</p>

            {["username", "email", "password", "address", "phone"].map((field) => (
              <div key={field}>
                <label className="labelitem" htmlFor={field}>
                  {field.charAt(0).toUpperCase() + field.slice(1)} *
                </label>
                <input
                  className="form-item"
                  type={field === "email" ? "email" : field === "password" ? "password" : "text"}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  placeholder={`Enter ${field}`}
                  required
                  autoComplete="off"
                />
                {errors[field] && <p className="error">{errors[field]}</p>}
              </div>
            ))}


            <div className="checkbox">
              <input type="checkbox" name="agreeTerms" checked={formData.agreeTerms} onChange={handleChange} />
              <span>By creating an account, you agree to our terms of service.</span>
              {errors.agreeTerms && <p className="error">{errors.agreeTerms}</p>}
            </div>

            <div className="subbtn">
              <button className="sub" type="submit" disabled={loading}>
                {loading ? "Registering..." : "Register"}
              </button>
            </div>

            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} theme="dark" transition={Bounce} />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
