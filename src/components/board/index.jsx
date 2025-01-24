import React, { useEffect, useRef, useState } from "react";
import BoardCard from "./boardCard";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchBoardsList } from "../../store/actions/board";
import { IconPlus } from "@tabler/icons-react";
import {Button , Form , Modal , Input} from 'antd'
import axiosInstance from "../../utils/axios";

const Board = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { boardList, boardLoading } = useSelector((state) => state.boards);
  const apiCalled = useRef(false);
  const [isLoading ,setIsLoading] = useState(false);
  const [isVisible , setIsVisible] = useState(false);

  const handleCardClick = ({ _id, name }) => {
    navigate(`/task/${_id}?name=${encodeURIComponent(name)}`);
  };

  useEffect(() => {
      dispatch(fetchBoardsList());
  }, []);

  const onClose = () => {
    setIsVisible(false);
    form.resetFields();
  }

  const handleAddNewProject = async (values) => {
    try {
      setIsLoading(true);
       const response = await axiosInstance.post('/boards/create',values);
       dispatch(fetchBoardsList());
       onClose();
    } catch (error) {
        console.log('Error while creating project',error);
    }finally {
      setIsLoading(false);
    }
  };



  return (<>
           <Modal
      title={
        <div className="text-xl font-bold text-red-600 text-center">
          Create New Project
        </div>
      }
      open={isVisible}
      onCancel={onClose}
      footer={null}
      className="rounded-lg overflow-hidden relative"
      maskClosable={false}

    >
      {isLoading && (
        <div className="absolute inset-0 bg-white bg-opacity-60 flex items-center justify-center z-[2000]">
          <div className="loader border-t-4 border-red-600 w-12 h-12 rounded-full animate-spin"></div>
        </div>
      )}
      <Form
        form={form}
        layout="vertical"
        onFinish={handleAddNewProject}
        initialValues={{name : ""}}
        className="space-y-4"
      >
        <Form.Item
          label={<span className="font-semibold">Project Name</span>}
          name="name"
          rules={[
            { required: true, message: "Please enter your project name" },
          ]}
        >
          <Input
            placeholder="Enter your project name"
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
            {
              isLoading ? 'Loading...':'Create'
            }
          </Button>
        </Form.Item>
      </Form>
    </Modal>
      <div className="relative">
      {boardLoading && (
        <div className="absolute h-screen inset-0 bg-white bg-opacity-60 flex items-center justify-center z-[2000]">
          <div className="loader border-t-4 border-red-600 w-12 h-12 rounded-full animate-spin"></div>
        </div>
      )}
      <div className="text-3xl text-gray-700 text-center my-2 font-bold">
        Your Projects
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 p-4">
        <div
          onClick={() => setIsVisible(true)}
          className="flex items-center flex-col justify-center border-2 border-dashed border-gray-400 rounded-lg p-6 bg-gray-100 cursor-pointer hover:bg-gray-200  hover:shadow-2xl hover:scale-105 transition-all duration-300 ease-in-out"
        >
          <div className="text-red-700">
            <IconPlus size={25} strokeWidth={2}  />
          </div>
          <div className="d-flex text-red-700 font-semibold text-xl">Add Project</div>
        </div>
        {!boardLoading &&
          boardList.map((board) => (
            <BoardCard
              key={board._id}
              board={board}
              onClick={() => handleCardClick(board)}
            />
          ))}
      </div>
    </div>
  </>

  );
};

export default Board;
