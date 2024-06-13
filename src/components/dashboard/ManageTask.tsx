import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaPlus } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { ITask, Priorities, Status } from "../../interface/common";
import { addTask, fetchTasks, updateTaskStatus } from "../../services/api";

const ManageTask: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ITask>();
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [newTask, setNewTask] = useState<Omit<ITask, "_id">>({
    title: "",
    deadline: "",
    priority: Priorities.Low,
    status: Status.todo,
    user: "User1",
  });

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const fetchedTasks: ITask[] = await fetchTasks();
        setTasks(fetchedTasks);
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
        setTasks([]);
      }
    };
    loadTasks();
  }, []);

  const { ref: titleRef, ...titleRest } = register("title", { required: true });
  const { ref: deadlineRef, ...deadlineRest } = register("deadline", {
    required: true,
  });
  const { ref: priorityRef, ...priorityRest } = register("priority", {
    required: true,
  });

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    taskId: string
  ) => {
    e.dataTransfer.setData("text/plain", taskId);
  };

  const handleDragOver = (
    e: React.DragEvent<HTMLDivElement>,
    status: Status
  ) => {
    e.preventDefault();
    const draggedTaskId = e.dataTransfer.getData("text/plain");
    const draggedTaskIndex = tasks.findIndex(
      (task) => task._id === draggedTaskId
    );
    const taskList = tasks.filter((task) => task.status === status);

    const mouseY = e.clientY;

    let newIndex = taskList.length; // default to the end of the list
    for (let i = 0; i < taskList.length; i++) {
      const taskElement = document.getElementById(taskList[i]._id!);
      if (!taskElement) continue;

      const taskRect = taskElement.getBoundingClientRect();
      const taskTop = taskRect.top + window.scrollY;

      // Calculate middle position of the task
      const taskMiddle = taskTop + taskRect.height / 2;

      // Determine if mouseY is in the upper half or lower half of the task
      if (mouseY < taskMiddle) {
        newIndex = i;
        break;
      }
    }

    if (draggedTaskIndex !== newIndex) {
      const updatedTasks = [...tasks];
      const [draggedTask] = updatedTasks.splice(draggedTaskIndex, 1);
      updatedTasks.splice(newIndex, 0, draggedTask);
      setTasks(updatedTasks);
    }
  };

  const handleDrop = async (
    e: React.DragEvent<HTMLDivElement>,
    newStatus: Status
  ) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData("text/plain");
    const task = tasks.find((t) => t._id === taskId);
    if (task && task.status !== newStatus) {
      try {
        await updateTaskStatus(taskId, newStatus);
        const updatedTasks = tasks.map((t) =>
          t._id === taskId ? { ...t, status: newStatus } : t
        );
        setTasks(updatedTasks);
      } catch (error) {
        console.error("Failed to update task status:", error);
      }
    }
  };

  const onSubmit = async (data: ITask) => {
    try {
      const addedTask: ITask = await addTask(data);
      setTasks([...tasks, addedTask]);
      reset({
        title: "",
        deadline: "",
        priority: Priorities.Low,
        status: Status.todo,
        user: "User1",
      });
    } catch (error) {
      console.error("Failed to add task:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">To-Do App</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mb-4 flex space-x-4 items-center"
      >
        <input
          className={`border p-2 flex-1 ${
            errors.title ? "border-red-500" : ""
          }`}
          type="text"
          placeholder="Title"
          {...titleRest}
          ref={(e) => {
            titleRef(e);
            if (e) e.value = newTask.title;
          }}
        />
        {errors.title && (
          <span className="text-red-500">Title is required</span>
        )}
        <input
          className={`border p-2 ${errors.deadline ? "border-red-500" : ""}`}
          type="date"
          {...deadlineRest}
          ref={(e) => {
            deadlineRef(e);
            if (e) e.value = newTask.deadline;
          }}
        />
        {errors.deadline && (
          <span className="text-red-500">Deadline is required</span>
        )}
        <select
          className={`border p-2 ${errors.priority ? "border-red-500" : ""}`}
          {...priorityRest}
          ref={(e) => {
            priorityRef(e);
            if (e) e.value = newTask.priority;
          }}
        >
          <option value={Priorities.Low}>{Priorities.Low}</option>
          <option value={Priorities.Moderate}>{Priorities.Moderate}</option>
          <option value={Priorities.High}>{Priorities.High}</option>
        </select>
        {errors.priority && (
          <span className="text-red-500">Priority is required</span>
        )}
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded flex items-center"
        >
          <FaPlus className="mr-1" />
          Add Task
        </button>
      </form>
      <div className="flex space-x-4">
        {Object.values(Status).map((status) => (
          <div
            key={status}
            className="flex-1 p-4 border rounded"
            onDragOver={(e) => handleDragOver(e, status)}
            onDrop={(e) => handleDrop(e, status)}
          >
            <h2 className="text-xl font-semibold mb-4">{status}</h2>
            {tasks
              .filter((task) => task.status === status)
              .map((task) => (
                <motion.div
                  key={task._id}
                  id={task._id || ""}
                  className="p-4 mb-2 bg-white rounded shadow cursor-grab"
                  draggable
                  onDragStart={(e) => handleDragStart(e, task._id!)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }}
                >
                  <h3 className="text-lg font-semibold">{task.title}</h3>
                  <p className="text-gray-500">{task.deadline}</p>
                  <p className="text-gray-700">{task.priority}</p>
                  {task.description && (
                    <p className="text-gray-600">{task.description}</p>
                  )}
                </motion.div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageTask;
