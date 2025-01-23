import React, { useContext, useState } from "react";
import { Modal, Form, Input, Button } from "antd";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import { ModalContext } from "../../context";
import axiosInstance from "../../utils/axios";

function SignupModal({ isVisible, setIsVisible }) {
  const [form] = Form.useForm();
  const { setLoginVisible } = useContext(ModalContext);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async (values) => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.post("/auth/signup", values);
    } catch (error) {
      console.log("Error while signing", error);
    } finally {
      setIsLoading(false);
      onClose();
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
    <>
    <Modal
      title={
        <div className="text-xl font-bold text-red-600 text-center">
          Welcome To Our Website
        </div>
      }
      open={isVisible}
      onCancel={onClose}
      footer={null}
      className="rounded-lg overflow-hidden relative"
      maskClosable={false} // Prevent closing the modal by clicking outside

    >
            {isLoading && (
        <div className="absolute inset-0 bg-white bg-opacity-60 flex items-center justify-center z-[2000]">
          <div className="loader border-t-4 border-red-600 w-12 h-12 rounded-full animate-spin"></div>
        </div>
      )}
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSignup}
        initialValues={{ username: "", email: "", password: "" }}
        className="space-y-4"
      >
        <Form.Item
          label={<span className="font-semibold">Username</span>}
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
            className="p-3 border border-gray-300 rounded-lg"
          />
        </Form.Item>

        <Form.Item
          label={<span className="font-semibold">Email</span>}
          name="email"
          rules={[
            { required: true, message: "Please enter your email!" },
            { type: "email", message: "Please enter a valid email!" },
          ]}
        >
          <Input
            placeholder="Enter your email"
            className="p-3 border border-gray-300 rounded-lg"
          />
        </Form.Item>

        <Form.Item
          label={<span className="font-semibold">Password</span>}
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
            iconRender={(visible) => (visible ? <IconEye /> : <IconEyeOff />)}
            className="p-3 border border-gray-300 rounded-lg"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            className="bg-red-600 hover:bg-red-700 text-white font-bold p-3 rounded-lg transition-all duration-300"
          >
            {isLoading ? "Loading..." : "Sign up"}
          </Button>
        </Form.Item>

        <div className="text-center text-gray-500">
          Already have an account?{" "}
          <span
            className="text-red-600 font-medium cursor-pointer hover:underline"
            onClick={handleLogInClick}
          >
            Login
          </span>
        </div>
      </Form>
    </Modal>
    </>

  );
}

export default SignupModal;
