import { Link, useNavigate } from "react-router-dom"
import { Form, Button, Input } from "antd"
import { useForm } from "antd/es/form/Form"
import { api } from "../httpClient"

export const FoodPartnerLogin = () => {
    const [fpLoginForm] = useForm()
    const navigate = useNavigate()

    async function handleFormSubmit() {
        const data = fpLoginForm.getFieldsValue()
        const response = await api.post("/auth/food-partner/login-food-partner", data)
        if (response.status === 200) {
            navigate("/food-partner/create-food-item")
        }
        console.log("response.data: ", response.data);
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-pink-200 via-red-200 to-yellow-200 p-6">
            <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8 space-y-6">
                {/* Tabs */}
                <div className="flex justify-center space-x-4">
                    <button className="px-4 py-2 bg-gradient-to-r from-red-400 to-pink-400 rounded-xl bg-gray-100 text-gray-200 font-semibold hover:bg-gray-200">
                        Login as Food Partner
                    </button>
                </div>

                {/* Heading */}
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-800">
                        Welcome to FeedView 🍕
                    </h2>
                    <p className="text-gray-500 text-sm mt-1">Please enter your details</p>
                </div>

                <Form
                    form={fpLoginForm}
                    layout="vertical"
                    className="space-y-5"
                >
                    {/* Email */}
                    <Form.Item
                        label="Email Address"
                        name="email"
                        rules={[
                            { required: true, message: "Please enter your email!" },
                            { type: "email", message: "Please enter a valid email!" },
                        ]}
                    >
                        <Input placeholder="you@example.com" />
                    </Form.Item>

                    {/* Password */}
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: "Please enter your password!" }]}
                    >
                        <Input.Password placeholder="••••••••" />
                    </Form.Item>

                    {/* Submit Button */}
                    <Form.Item>
                        <Button
                            type="primary"
                            onClick={handleFormSubmit}
                            htmlType="submit"
                            className="w-full py-3 rounded-xl shadow-lg bg-gradient-to-r from-red-400 to-pink-400 border-0"
                        >
                            Continue
                        </Button>
                    </Form.Item>
                </Form>

                {/* Footer */}
                <div className="text-center text-sm text-gray-500">
                    Don't have an account?
                    <Link to={"/food-partner/register"} className="text-pink-400">Signup</Link>
                </div>
            </div>
        </div>
    )
}

export default FoodPartnerLogin