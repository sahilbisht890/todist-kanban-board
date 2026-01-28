import React, { useEffect, useRef, useState } from "react";
import BoardCard from "./boardCard";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchBoardsList } from "../../store/actions/board";
import { IconPlus } from "@tabler/icons-react";
import { Button, Form, Modal, Input, Skeleton } from "antd";
import axiosInstance from "../../utils/axios";
import Loader from "../common/loader";

const Board = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { boardList, boardLoading } = useSelector((state) => state.boards);
  const apiCalled = useRef(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const handleCardClick = ({ _id, name }) => {
    navigate(`/task/${_id}?name=${encodeURIComponent(name)}`);
  };

  useEffect(() => {
    dispatch(fetchBoardsList());
  }, []);

  const onClose = () => {
    setIsVisible(false);
    form.resetFields();
  };

  const handleAddNewProject = async (values) => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.post("/boards/create", values);
      dispatch(fetchBoardsList());
      onClose();
    } catch (error) {
      console.log("Error while creating project", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
    {
      boardLoading && <Loader/>
    }
      <Modal
        title={
          <div className="text-xl font-bold text-gray-800 text-center">
            Create New Project
          </div>
        }
        open={isVisible}
        onCancel={onClose}
        footer={null}
        className="rounded-xl overflow-hidden relative modal-shadow"
        maskClosable={false}
        width={400}
      >
        {isLoading && (
          <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center z-[2000] backdrop-blur-sm">
            <div className="loader border-t-4 border-blue-500 w-12 h-12 rounded-full animate-spin"></div>
          </div>
        )}
        <Form
          form={form}
          layout="vertical"
          onFinish={handleAddNewProject}
          initialValues={{ name: "" }}
          className="space-y-5 p-1"
        >
          <Form.Item
            label={<span className="font-medium text-gray-700">Project Name</span>}
            name="name"
            rules={[
              { required: true, message: "Please enter your project name" },
            ]}
          >
            <Input
              placeholder="Enter your project name"
              className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium p-3 h-auto rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
              size="large"
            >
              {isLoading ? "Creating..." : "Create Project"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      
      <div className="relative mt-20 md:mt-32 px-4 max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Your Projects</h1>
          <p className="text-gray-500 max-w-lg mx-auto">
            Organize your tasks and collaborate with your team in one place
          </p>
        </div>
         
         {
          !boardLoading && boardList.length !== 0  && 
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <div
            onClick={() => setIsVisible(true)}
            className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-8 bg-white cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all duration-300 group"
          >
            <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-200 group-hover:scale-110 transition-all duration-300">
              <IconPlus size={28} className="text-blue-500" strokeWidth={2} />
            </div>
            <div className="text-blue-600 font-semibold text-lg">Add Project</div>
            <p className="text-gray-500 text-sm mt-2 text-center">Create a new project board</p>
          </div>
          
          {boardList.map((board) => (
            <BoardCard
              key={board._id}
              board={board}
              onClick={() => handleCardClick(board)}
            />
          ))}
          
          {boardLoading && (
            <>
              {[...Array(8)].map((_, i) => (
                <div key={i} className="border border-gray-200 rounded-xl p-5 bg-white h-44">
                  <Skeleton active paragraph={{ rows: 3 }} />
                </div>
              ))}
            </>
          )}
        </div>
         }

        
        {!boardLoading && boardList.length === 0 && (
          <div className="text-center py-12  rounded-xl mt-4">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <IconPlus size={40} className="text-gray-500" />
            </div>
            <h3 className="text-xl font-medium text-gray-700 mb-2">No projects yet</h3>
            <p className="text-gray-500 mb-6">Get started by creating your first project</p>
            <Button
              type="primary"
              onClick={() => setIsVisible(true)}
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-4 h-auto rounded-lg"
              size="large"
            >
              Create Your First Project
            </Button>
          </div>
        )}
      </div>
      
      <style jsx>{`
        .modal-shadow {
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
        }
        .loader {
          border: 3px solid #f3f3f3;
          border-top: 3px solid #3b82f6;
          border-radius: 50%;
          width: 50px;
          height: 50px;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
};

export default Board;