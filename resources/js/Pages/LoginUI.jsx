import { useState } from "react";
import { router } from "@inertiajs/react";
import React from "react";
import axios from "axios";
export default function LoginUI() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("Loading...");
        
        try {
            const response = await axios.post('/login-secure',{
                username : username,
                password : password
            })
            
            const data = await response.data;
            setMessage(data.message);
        } catch (error) {
            console.log(error);
            
            setMessage("Error: Tidak dapat menghubungi server");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm">
                <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Login UI (Test SQL Injection)</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Username</label>
                        <input
                            type="text"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300 focus:outline-none transition"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Masukkan username"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300 focus:outline-none transition"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Masukkan password"
                        />
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition font-semibold">
                        Login
                    </button>
                </form>
                {message && <p className="mt-4 text-center text-sm font-semibold text-red-600">{message}</p>}
            </div>
        </div>
    );
}
