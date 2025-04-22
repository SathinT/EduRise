import React, { useState } from 'react';
import { motion } from 'framer-motion';
import logo from '../../../assets/Home/Logo.png';
import loginMask from "../../../assets/Auth/loginMask.png";
import registerbg from "../../../assets/Auth/registerbg.png";

export function Register({ onNavigate }) {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        role: '',
        contact: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleRegister = () => {
        const { firstName, lastName, role, contact, email, password } = formData;
        if (!firstName || !lastName || !role || !contact || !email || !password) {
            alert('Please fill all the fields.');
            return;
        }

        // Here you would typically call an API to register the user
        console.log('Registering:', formData);
        alert('Registration Successful!');
        onNavigate('login');
    };

    return (
        <div className="w-full h-screen flex">
            {/* Left Form Side */}
            <div className="w-3/5 h-full bg-[#1E1E1E] p-8 pl-36 pr-36 flex flex-col relative overflow-hidden">
                <div className="absolute top-0 right-0 opacity-70">
                    <img src={loginMask} alt="Mask" className="w-64 h-64" />
                </div>

                {/* Logo */}
                <div
                    className="h-12 w-50 bg-contain bg-no-repeat"
                    style={{ backgroundImage: `url(${logo})` }}
                ></div>

                <motion.div
                    className="mt-20"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="text-yellow-500 text-4xl font-bold border-b-4 border-yellow-500 pb-1 inline-block">
                        REGISTER
                    </h1>

                    {/* Form Fields */}
                    <div className="mt-16 space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                placeholder="First Name"
                                className="p-3 rounded bg-white text-gray-800 w-full"
                            />
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                placeholder="Last Name"
                                className="p-3 rounded bg-white text-gray-800 w-full"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <select
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                className="p-3 rounded bg-white text-gray-800 w-full"
                            >
                                <option value="">Select Role</option>
                                <option value="Teacher">Teacher</option>
                                <option value="Student">Student</option>
                                <option value="Parent">Parent</option>
                            </select>
                            <input
                                type="text"
                                name="contact"
                                value={formData.contact}
                                onChange={handleChange}
                                placeholder="Contact No."
                                className="p-3 rounded bg-white text-gray-800 w-full"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Email"
                                className="p-3 rounded bg-white text-gray-800 w-full"
                            />
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Password"
                                className="p-3 rounded bg-white text-gray-800 w-full"
                            />
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            className="bg-yellow-500 text-black font-semibold py-2 px-10 rounded"
                            onClick={handleRegister}
                        >
                            Register
                        </motion.button>
                    </div>

                    {/* Divider */}
                    <div className="mt-16 flex items-center">
                        <div className="flex-grow h-px bg-gray-600"></div>
                        <div className="mx-4 text-gray-400">or</div>
                        <div className="flex-grow h-px bg-gray-600"></div>
                    </div>

                    {/* Google Sign In */}
                    <div className="mt-8 flex justify-center">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            className="border border-yellow-500 text-white py-2 px-4 rounded-full flex items-center hover:bg-yellow-600 hover:text-black transition"
                        >
                            <img
                            src="https://www.google.com/images/branding/googleg/1x/googleg_standard_color_128dp.png"
                            alt="Google"
                            className="w-5 h-5 mr-2"
                        />
                            Sign in with Google
                        </motion.button>
                    </div>
                </motion.div>
            </div>

            {/* Right Background */}
            <div
                className="w-2/5 h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${registerbg})` }}
            ></div>
        </div>
    );
}

export default Register;
