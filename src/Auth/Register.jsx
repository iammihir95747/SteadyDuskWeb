import { useState } from 'react';
import React from 'react';
import './Register.css';
import { toast, ToastContainer, Bounce } from "react-toastify";

const API_BASE = import.meta.env.VITE_BASE_URL;


function Register() {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [cheak, setCheak] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setloading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "username") setUsername(value);
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
    if (name === "address") setAddress(value);  
    if (name === "phone") setPhone(value);      
    if (name === "cheak") setCheak(value);      
  };
  

  const validate = () => {
    const newErrors = {};
    if (!username) newErrors.username = "Username is required";
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
    }
    if (!password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setloading(true);


  
    try {
      const response = await fetch(`https://server-node-eef9.onrender.com/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(FormData),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.error || "Registration failed ❌");
      }
  
      toast.success("✅ Registration Successful!");
      setUsername("");
      setEmail("");
      setPassword("");
      setAddress("");
      setPhone("");
    } catch (error) {
      console.error("Registration error:", error);
      toast.error(error.message || "Something went wrong ❌");
    }
  };

    return (

        <div className='register-container'>
            <div className="register-aside"></div>
            <div className="register">
                <div className="form">
                    <form action="/" className='form-block' autoComplete='off'   
                    onSubmit={handleSubmit}
                    >
                        <h1 className='titilereg'>Create Your Account</h1>
                        <p className='para'>It's free for 14 days. No credit card required.</p>
                        
                        <label className='labelitem' htmlFor="username">Username *</label>
                        <input className='form-item'
                        name='username'
                        value={username}
                        onChange={handleChange}

                        type="text" placeholder="Username" required={true} />

                        <label className='labelitem' htmlFor="email">Email Address *</label>
                        <input className='form-item'
                        name='email'
                        value={email}
                        onChange={handleChange}
                        type="email" placeholder="Your email.com"   required={true} autoComplete='off' />

                        <label className='labelitem' htmlFor="password">Password *</label>
                        <input className='form-item'
                        name='password'
                        value={password}
                        onChange={handleChange}
                        type="password" placeholder="Password" required={true} autoComplete='new-password' />

                        <label className='labelitem' htmlFor="address">Address</label>
                        <input className='form-item'
                        name='address'
                        value={address}
                        onChange={handleChange}

                        type="text" placeholder="Address" />

                        <label className='labelitem' htmlFor="phone">Phone Number *</label>
                        <div className="phone-input" 
                        
                      
            style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              
                       
         <input className='form-item' type="tel" placeholder="XXX-XXX-XXXX" style={{ paddingLeft: '50px' }} required={true} 
                            name='phone'
                            value={phone}
                            onChange={handleChange}
                            />
                        </div>

                        <div className="cheakbox">
                            <input type="checkbox" className='cheakout' 
                            name='cheak'
                            value={cheak}
                            onChange={handleChange}
                            /> By creating a Classe365 account, you're agreeing to accept our terms of service.
                        </div>

                        <div className="subbtn">
                            <button className='sub' type='submit'>Register</button>
                            {loading && <div className="loader"></div>}
                      <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                theme="dark"
                transition={Bounce} />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Register;
