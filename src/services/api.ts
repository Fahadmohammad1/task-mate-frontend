// src/services/api.ts
import axios from "axios";
import { ITask } from "../interface/common";

const API_URL = "http://localhost:5000/api/v1";

export const fetchTasks = async (): Promise<ITask[]> => {
  const response = await axios.get(API_URL + "/task/myTasks", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  if (response.status !== 200) {
    throw new Error("Failed to fetch tasks");
  }
  return response.data.data;
};

export const updateTaskStatus = async (
  taskId: string,
  status: string
): Promise<void> => {
  await axios.patch(
    `${API_URL}/task/${taskId}`,
    { status },
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
};

export const addTask = async (task: ITask): Promise<ITask> => {
  const response = await axios.post(API_URL + "/task/add", task, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  console.log(response);
  return response.data.data;
};
