import { Button, Form, Input } from "antd"
import { useForm } from "antd/es/form/Form"
import { Link } from "react-router-dom"
import { api } from "../httpClient"
import { useNavigate } from "react-router-dom"

const FoodPartnerRegister = () => {
    const [fpRegisterForm] = useForm()
    const navigate = useNavigate()

    async function handleFormSubmit() {
        const data = fpRegisterForm.getFieldsValue()
        const response = await api.post("/auth/food-partner/register-food-partner", data)
        if (response.status === 200) {
            navigate("/food-partner/create-food-item")
        }
        console.log("response.data: ", response.data);
    }

    return (
        <>
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-pink-200 via-red-200 to-yellow-200 p-6">
                <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8 space-y-6">
                    {/* Tabs */}
                    <div className="flex justify-center space-x-4">
                        <button className="px-4 py-2 bg-gradient-to-r from-red-400 to-pink-400 rounded-xl bg-gray-100 text-gray-200 font-semibold hover:bg-gray-200">
                            Signup as Food Partner
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
                        form={fpRegisterForm}
                        layout="vertical"
                        className="space-y-5"
                    >
                        {/* Business Name */}
                        <Form.Item
                            label="Business Name"
                            name="name"
                            rules={[{ required: true, message: "Please enter your business name!" }]}
                        >
                            <Input placeholder="John Doe" />
                        </Form.Item>

                        {/* Email */}
                        <Form.Item
                            label="Email Address"
                            name="email"
                            rules={[
                                { required: true, message: "Please enter your email address!" },
                                { type: "email", message: "Please enter a valid email!" },
                            ]}
                        >
                            <Input placeholder="you@example.com" />
                        </Form.Item>

                        {/* Description */}
                        <Form.Item
                            label="Description"
                            name="description"
                            rules={[{ required: true, message: "Please enter a description!" }]}
                        >
                            <Input placeholder="description" />
                        </Form.Item>

                        {/* Contact No */}
                        <Form.Item
                            label="Contact No"
                            name="contactNo"
                            rules={[
                                { required: true, message: "Please enter your contact number!" },
                                { pattern: /^[0-9]{10}$/, message: "Please enter a valid 10-digit number!" },
                            ]}
                        >
                            <Input type="number" placeholder="9876543210" />
                        </Form.Item>

                        {/* Address */}
                        <Form.Item
                            label="Address"
                            name="address"
                            rules={[{ required: true, message: "Please enter your address!" }]}
                        >
                            <Input placeholder="address" />
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
                                htmlType="submit"
                                onClick={handleFormSubmit}
                                className="w-full py-3 rounded-xl shadow-lg bg-gradient-to-r from-red-400 to-pink-400 border-0"
                            >
                                Continue
                            </Button>
                        </Form.Item>
                    </Form>


                    {/* Footer */}
                    <div className="text-center text-sm text-gray-500">
                        Already have an account?
                        <Link to={"/food-partner/login"} className="text-pink-400">Login</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FoodPartnerRegister