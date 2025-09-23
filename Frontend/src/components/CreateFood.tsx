import React from "react";
import { Button, Form, Input, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useForm } from "antd/es/form/Form";
import { api } from "../httpClient";
import { useNavigate } from "react-router-dom";

export const FoodItemCreate: React.FC = () => {
    const [form] = useForm();
    const navigate = useNavigate();

    const handleFormSubmit = async () => {
        const data = form.getFieldsValue();
        console.log("data: ", data);

        // if using Upload, extract file manually
        const videoFile = data.video?.[0]?.originFileObj;

        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        if (videoFile) formData.append("video", videoFile);

        const result = await api.post("/food/create-food-item", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });

        if (result.status === 200) {
            navigate(`/food-partner/${result.data.foodPartner}`); // go back to homepage or food items page
        }
        
        console.log("Food created:", result.data);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-yellow-200 via-red-200 to-pink-200 p-6">
            <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8 space-y-6">
                {/* Heading */}
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-800">
                        Create Food Item 🍔
                    </h2>
                    <p className="text-gray-500 text-sm mt-1">
                        Add your food details to showcase
                    </p>
                </div>

                {/* Form */}
                <Form layout="vertical" className="space-y-5" form={form}>
                    {/* Food Name */}
                    <Form.Item
                        label="Food Name"
                        name="name"
                        rules={[{ required: true, message: "Please enter food name" }]}
                    >
                        <Input
                            placeholder="e.g. Margherita Pizza"
                            className="rounded-xl py-2 px-4 border focus:ring-2 focus:ring-red-400"
                        />
                    </Form.Item>

                    {/* Video Upload */}
                    <Form.Item
                        label="Food Video"
                        name="video"
                        valuePropName="fileList"
                        getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
                        rules={[{ required: true, message: "Please upload a video" }]}
                    >
                        <Upload beforeUpload={() => false} listType="text">
                            <Button
                                icon={<UploadOutlined />}
                                className="rounded-xl shadow-sm hover:scale-105 transform transition"
                            >
                                Upload Video
                            </Button>
                        </Upload>
                    </Form.Item>

                    {/* Description */}
                    <Form.Item
                        label="Description"
                        name="description"
                        rules={[{ required: true, message: "Please enter description" }]}
                    >
                        <Input.TextArea
                            rows={4}
                            placeholder="Describe your food item..."
                            className="rounded-xl px-4 border focus:ring-2 focus:ring-red-400"
                        />
                    </Form.Item>

                    {/* Submit */}
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            block
                            onClick={handleFormSubmit}
                            className="bg-gradient-to-r from-red-400 to-pink-400 h-12 font-semibold rounded-xl shadow-lg hover:scale-105 transform transition"
                        >
                            Create Food
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};
