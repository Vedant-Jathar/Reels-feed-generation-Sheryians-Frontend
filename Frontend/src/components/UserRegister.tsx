import React from "react";
import { Link } from "react-router-dom";
import { Button, Form, Input } from "antd";
import { useForm } from "antd/es/form/Form";
import { api } from "../httpClient";

export const UserRegister: React.FC = () => {

    const [registerForm] = useForm()

    const handleFormSubmit = async () => {
        const data = registerForm.getFieldsValue()
        const result = await api.post("/auth/user/register", data)

        console.log("result.data: ", result.data);
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-pink-200 via-red-200 to-yellow-200 p-6">
            <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8 space-y-6">
                {/* Tabs */}
                <div className="flex justify-center space-x-4">
                    <button className="px-4 py-2 bg-gradient-to-r from-red-400 to-pink-400 rounded-xl bg-gray-100 text-gray-200 font-semibold hover:bg-gray-200">
                        Signup
                    </button>
                </div>

                {/* Heading */}
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-800">
                        Welcome to FeedView 🍕
                    </h2>
                    <p className="text-gray-500 text-sm mt-1">Please enter your details</p>
                </div>

                {/* Login / Signup Form */}
                <Form layout="vertical" className="space-y-5" form={registerForm}>
                    {/* Name */}
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: "Please enter your name" }]}
                    >
                        <Input
                            placeholder="John Doe"
                            className="rounded-xl py-2 px-4 border focus:ring-2 focus:ring-red-400"
                        />
                    </Form.Item>

                    {/* Email */}
                    <Form.Item
                        label="Email Address"
                        name="email"
                        rules={[
                            { required: true, message: "Please enter your email" },
                            { type: "email", message: "Enter a valid email" },
                        ]}
                    >
                        <Input
                            placeholder="you@example.com"
                            className="rounded-xl py-2 px-4 border focus:ring-2 focus:ring-red-400"
                        />
                    </Form.Item>

                    {/* Password */}
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: "Please enter your password" }]}
                    >
                        <Input.Password
                            placeholder="••••••••"
                            className="rounded-xl py-2 px-4 border focus:ring-2 focus:ring-red-400"
                        />
                    </Form.Item>

                    {/* Submit Button */}
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            block
                            onClick={handleFormSubmit}
                            className="bg-gradient-to-r from-red-400 to-pink-400 h-12 font-semibold rounded-xl shadow-lg hover:scale-105 transform transition"
                        >
                            Continue
                        </Button>
                    </Form.Item>
                </Form>
                {/* Footer */}
                <div className="text-center text-sm text-gray-500">
                    Already have an account?
                    <Link to={"/user/login"} className="text-pink-400">Login</Link>
                </div>
            </div>
        </div>
    );
};

