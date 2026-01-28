import React, { useContext, useState } from "react";
import { Modal, Form, Input, Button, Divider, message } from "antd";
import { IconEye, IconEyeOff, IconBrandGoogle, IconBrandFacebook } from "@tabler/icons-react";
import { ModalContext } from "../../context";
import { loginUser } from "../../store/actions/user";
import { useDispatch } from "react-redux";

function LoginModal({ isVisible, setIsVisible }) {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { setSignupVisible } = useContext(ModalContext);
  const [isLoading, setIsLoading] = useState(false);

const handleLogin = async (values) => {
  try {
    setIsLoading(true);

    const response = await dispatch(loginUser(values));
    console.log("Login response:", response);

    message.success("Login successful!");
    onClose();

  } catch (error) {
    console.log("Error while logging in:", error);

    const errorMessage =
      typeof error === "string"
        ? error
        : error?.message || "Login failed. Please check your credentials.";

    message.error(errorMessage);

  } finally {
    setIsLoading(false);
  }
};


  const onClose = () => {
    setIsVisible(false);
    form.resetFields();
  };

  const handleSignUpClick = () => {
    onClose();
    setSignupVisible(true);
  };

  return (
    <Modal
      title={null}
      open={isVisible}
      onCancel={onClose}
      footer={null}
      className="rounded-xl overflow-hidden login-modal"
      maskClosable={false}
      width={400}
    >
      {isLoading && (
        <div className="absolute inset-0 bg-white bg-opacity-80 flex items-center justify-center z-50 rounded-xl">
          <div className="flex flex-col items-center">
            <div className="loader border-t-4 border-red-600 w-12 h-12 rounded-full animate-spin mb-2"></div>
            <p className="text-gray-600">Logging in...</p>
          </div>
        </div>
      )}
      
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Welcome Back</h2>
        <p className="text-gray-500 mt-1">Sign in to continue to your account</p>
      </div>
      
      <Form
        form={form}
        layout="vertical"
        onFinish={handleLogin}
        initialValues={{ email: "", password: "" }}
        className="space-y-4"
      >
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
          rules={[{ required: true, message: "Please enter your password!" }]}
        >
          <Input.Password
            placeholder="Enter your password"
            iconRender={(visible) => (visible ? <IconEye size={18} /> : <IconEyeOff size={18} />)}
            className="p-3 border border-gray-300 rounded-lg focus:border-red-500 focus:shadow-md transition-all"
          />
        </Form.Item>

        <div className="text-right mb-2">
          <a href="#" className="text-sm text-red-600 hover:text-red-700 font-medium">
            Forgot password?
          </a>
        </div>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
className="bg-blue-600 hover:bg-blue-700 text-white font-bold p-3 h-12 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
            loading={isLoading}
          >
            Sign In
          </Button>
        </Form.Item>

        {/* <Divider plain className="text-gray-400 text-xs">Or continue with</Divider> */}
{/* 
        <div className="flex justify-center space-x-4 mb-4">
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
          Don't have an account?{" "}
          <span
            className="text-red-600 font-medium cursor-pointer hover:text-red-700 transition-colors"
            onClick={handleSignUpClick}
          >
            Sign up
          </span>
        </div>
      </Form>
    </Modal>
  );
}

export default LoginModal;