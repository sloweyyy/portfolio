import React from "react";
import { useState } from "react";
import Button from "../Button";
import { useTheme } from "next-themes";

const AdminLogin = ({ onLogin }) => {
    const { theme } = useTheme();
    const [loginData, setLoginData] = useState({
        username: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        await onLogin(loginData);
        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-2xl w-96">
                <h1 className="text-3xl font-bold mb-6 text-center dark:text-white">
                    Admin Login
                </h1>
                {error && (
                    <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                        {error}
                    </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                            Username
                        </label>
                        <input
                            type="text"
                            value={loginData.username}
                            onChange={(e) =>
                                setLoginData({
                                    ...loginData,
                                    username: e.target.value,
                                })
                            }
                            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            value={loginData.password}
                            onChange={(e) =>
                                setLoginData({
                                    ...loginData,
                                    password: e.target.value,
                                })
                            }
                            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            required
                        />
                    </div>
                    <Button
                        type="submit"
                        disabled={loading}
                        classes={`w-full ${
                            loading ? "opacity-50 cursor-not-allowed" : ""
                        } bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition-colors`}
                    >
                        {loading ? "Signing in..." : "Sign In"}
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
