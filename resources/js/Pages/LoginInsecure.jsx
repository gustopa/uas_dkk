import { Link } from "@inertiajs/react";
import axios from "axios";
import React from "react";
import { useState } from "react";

export default function NonSecureLoginUI() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("Loading...");
        
        try {
            const response = await axios.post("/login-insecure", {
                username : username,
                password : password
            });
            
            const data = await response.data
            setMessage(data.message);
        } catch (error) {
            console.log(error);
            
            setMessage("Error: Tidak dapat menghubungi server");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-red-100 p-4">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm">
                <h2 className="text-2xl font-bold text-red-600 text-center mb-6">Non-Secure Login</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Username</label>
                        <input
                            type="text"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-red-300 focus:outline-none transition"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Masukkan username"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-red-300 focus:outline-none transition"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Masukkan password"
                        />
                    </div>
                    <button type="submit" className="w-full bg-red-500 text-white p-3 rounded-lg hover:bg-red-600 transition font-semibold">
                        Login
                    </button>
                    <Link href="/login-secure">Login secure</Link>
                </form>
                {message && <p className="mt-4 text-center text-sm font-semibold text-red-600">{message}</p>}
            </div>
        </div>
    );
}
