import React, { useContext, useState } from "react";
import { Modal, Form, Input, Button, Divider, message } from "antd";
import {
  IconEye,
  IconEyeOff,
  IconBrandGoogle,
  IconBrandFacebook,
} from "@tabler/icons-react";
import { ModalContext } from "../../context";
import axiosInstance from "../../utils/axios";
import GoogleButton from "../common/googleLoginBtn";

function SignupModal({ isVisible, setIsVisible }) {
  const [form] = Form.useForm();
  const { setLoginVisible } = useContext(ModalContext);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async (values) => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.post("/auth/signup", values);
      message.success("Please verify your email!");
      onClose();
    } catch (error) {
      console.log("Error while signing up", error);
      message.error(
        error.response?.data?.message || "Signup failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const onClose = () => {
    setIsVisible(false);
    form.resetFields();
  };

  const handleLogInClick = () => {
    onClose();
    setLoginVisible(true);
  };

  return (
    <Modal
      title={null}
      open={isVisible}
      onCancel={onClose}
      footer={null}
      className="rounded-xl overflow-hidden signup-modal"
      maskClosable={false}
      width={400}
    >
      {isLoading && (
        <div className="absolute inset-0 bg-white bg-opacity-80 flex items-center justify-center z-50 rounded-xl">
          <div className="flex flex-col items-center">
            <div className="loader border-t-4 border-red-600 w-12 h-12 rounded-full animate-spin mb-2"></div>
            <p className="text-gray-600">Creating your account...</p>
          </div>
        </div>
      )}

      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Join Us Today</h2>
        <p className="text-gray-500 mt-1">Create an account to get started</p>
      </div>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSignup}
        initialValues={{ username: "", email: "", password: "" }}
        className="space-y-4"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            { required: true, message: "Please enter your username!" },
            {
              min: 4,
              max: 12,
              message: "Username must be between 4 and 12 characters!",
            },
          ]}
        >
          <Input
            placeholder="Enter your username"
            className="p-3 border border-gray-300 rounded-lg focus:border-red-500 focus:shadow-md transition-all"
          />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please enter your email!" },
            { type: "email", message: "Please enter a valid email!" },
          ]}
        >
          <Input
            placeholder="Enter your email"
            className="p-3 border border-gray-300 rounded-lg focus:border-red-500 focus:shadow-md transition-all"
          />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            { required: true, message: "Please enter your password!" },
            {
              min: 6,
              message: "Password must be at least 6 characters long!",
            },
          ]}
        >
          <Input.Password
            placeholder="Enter your password"
            iconRender={(visible) =>
              visible ? <IconEye size={18} /> : <IconEyeOff size={18} />
            }
            className="p-3 border border-gray-300 rounded-lg focus:border-red-500 focus:shadow-md transition-all"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold p-3 h-12 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
            loading={isLoading}
          >
            Create Account
          </Button>
        </Form.Item>
        <GoogleButton/>

        {/* <Divider plain className="text-gray-400 text-xs">
          Or sign up with
        </Divider> */}

        {/* <div className="flex justify-center space-x-4 mb-4">
          <Button
            className="flex items-center justify-center w-12 h-12 rounded-full border border-gray-300 hover:border-gray-400 shadow-sm hover:shadow-md transition-all"
            icon={<IconBrandGoogle size={20} className="text-red-600" />}
          />
          <Button
            className="flex items-center justify-center w-12 h-12 rounded-full border border-gray-300 hover:border-gray-400 shadow-sm hover:shadow-md transition-all"
            icon={<IconBrandFacebook size={20} className="text-blue-600" />}
          />
        </div> */}

        <div className="text-center text-gray-500 pt-2">
          Already have an account?{" "}
          <span
            className="text-red-600 font-medium cursor-pointer hover:text-red-700 transition-colors"
            onClick={handleLogInClick}
          >
            Login
          </span>
        </div>
      </Form>
    </Modal>
  );
}

export default SignupModal;
