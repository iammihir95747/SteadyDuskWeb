import React from 'react';
import './Register.css';
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer, Bounce } from "react-toastify";
import { useState } from 'react';

const API_BASE = "https://server-node-eef9.onrender.com";


function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!email || !password) {
      toast.error("❌ Email and Password are required");
      return;
    }

    try {
      console.log("Sending Login Request:", { email, password });

      const response = await fetch(`${API_BASE}/Auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log("Login Response:", data);

      if (!response.ok) {
        throw new Error(data.error || "Login Failed ❌");
      }

      toast.success("✅ Login Successful");
      localStorage.setItem("token", data.token);
      navigate("/Homepage");
    } catch (error) {
      toast.error(error.message);
      console.error("Login Error:", error.message);
    }
    finally {
      setLoading(false);
    }
  };

  return (

    <div className='register-container'>
    
           <div className="register">
             <div className="form">
              <form action="/" className='form-block' autoComplete='off'
            onSubmit={handleLogin}
             >
            <h1 className='titilereg'>Login</h1>
            <p className='para'>It's free for 14 days. No credit card required.</p>



            <input className='form-item-log' type="email" name='email' placeholder="Your email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required={true} autoComplete='off' />

            <input className='form-item-log' type="password" name='password' placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required={true} autoComplete='new-password' />

            <button type="submit" className="sub" disabled={loading}>
              {loading ? "Logging..." : "Login"}
            </button>
            <ToastContainer
              position="top-right"
              autoClose={5000} hideProgressBar={false}
              theme="dark"
              transition={Bounce} />

          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
