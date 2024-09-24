"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";

// Define a Task type to store task text and completion status
interface Task {
  text: string;
  isCompleted: boolean;
  isEditing: boolean; // Track whether the task is being edited
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<string>("");

  // Load tasks from local storage when the component mounts
  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
      console.log("Loaded tasks from local storage:", JSON.parse(savedTasks)); // Debug log
    } else {
      console.log("No tasks found in local storage."); // Debug log
    }
  }, []);

  // Save tasks to local storage whenever tasks change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    console.log("Tasks saved to local storage:", tasks); // Debug log
  }, [tasks]);

  // Add a new task
  const AddTask = () => {
    if (newTask.trim()) {
      const updatedTasks = [
        ...tasks,
        { text: newTask, isCompleted: false, isEditing: false },
      ];
      setTasks(updatedTasks);
      setNewTask("");
      console.log("Added new task:", updatedTasks); // Debug log
    }
  };

  // Toggle task completion
  const toggleComplete = (index: number) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, isCompleted: !task.isCompleted } : task
    );
    setTasks(updatedTasks);
  };

  // Delete a task
  const deleteTask = (index: number) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  // Edit a task
  const editTask = (index: number) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, isEditing: true } : task
    );
    setTasks(updatedTasks);
  };

  // Save the edited task
  const saveTask = (index: number, newText: string) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, text: newText, isEditing: false } : task
    );
    setTasks(updatedTasks);
  };

  // Separate active and completed tasks
  const activeTasks = tasks.filter((task) => !task.isCompleted);
  const completedTasks = tasks.filter((task) => task.isCompleted);

  return (
    <>
      {/* Input Section */}
      <div className="bg-slate-900 grid place-items-center my-5 mx-auto shadow-2xl shadow-slate-700 rounded-2xl max-w-4xl w-full p-8">
        <div className="p-3 lg:-ml-16 bg-slate-900">
          <h1 className="lg:text-2xl  text-blue-600 bg-slate-900">
            ALPHA - Manage Your Tasks At ALPHA
          </h1>
          <h2 className="text-xl text-blue-600 bg-slate-900">Add Tasks:</h2>
        </div>
        <div>
          <div className="flex flex-col md:flex-row w-full items-center gap-5 bg-slate-900">
            <Input
              type="text"
              placeholder="Enter Your Task"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              className="rounded-2xl flex-1 lg:w-96 max-w-64 border-blue-700"
            />
            <Button
              onClick={AddTask}
              className="rounded-full border text-blue-700 border-blue-700 w-20"
            >
              Add
            </Button>
          </div>
        </div>
      </div>

      {/* Active Tasks Section */}
      <div className="bg-slate-900 grid place-items-center my-5 mx-auto rounded-2xl shadow-2xl shadow-slate-700 border border-transparent max-w-4xl w-full p-8">
        <div className="mt-5 w-full bg-slate-900">
          <h1 className="bg-slate-900 text-blue-600 -my-10 text-lg text-center border border-transparent rounded-xl p-2">
            Active Tasks
          </h1>
          <hr className="w-32 mx-auto mt-7 " />
          <ul className="bg-slate-900 mt-5 w-full">
            {activeTasks.length > 0 ? (
              activeTasks.map((task, index) => (
                <li
                  key={index}
                  className="lg:p-2 border-b bg-slate-900 border-gray-300 max-w-40 lg:max-w-full flex items-center justify-between"
                >
                  {task.isEditing ? (
                    <div className="flex gap-2 w-full bg-slate-900">
                        <Input
                          type="text"
                          defaultValue={task.text}
                          onChange={(e) => saveTask(index, e.target.value)}
                          className="rounded-2xl border-blue-700 flex-1"
                        />
                      <Button
                        onClick={() => saveTask(index, task.text)}
                        className="rounded-full w-16 border bg-slate-900 border-green-500"
                      >
                        Save
                      </Button>
                    </div>
                  ) : (
                    <>
                      <span className="w-full bg-slate-900">{task.text}</span>
                      <div className="flex gap-3 bg-slate-900">
                        <input
                          type="checkbox"
                          checked={task.isCompleted}
                          onChange={() => toggleComplete(index)} // Update task completion
                          className="ml-4"
                        />
                        <Button
                          onClick={() => editTask(index)}
                          className="rounded-full border bg-slate-900 text-blue-700 border-blue-700"
                        >
                          Edit
                        </Button>
                        <Button
                          onClick={() => deleteTask(index)}
                          className="rounded-full border bg-slate-900 text-red-700 border-red-700"
                        >
                          Delete
                        </Button>
                      </div>
                    </>
                  )}
                </li>
              ))
            ) : (
              <p className="text-gray-500 bg-slate-900 text-center">
                No active tasks.
              </p>
            )}
          </ul>
        </div>
      </div>

      {/* Completed Tasks Section */}
      <div className="bg-slate-900 grid place-items-center mt-8 mx-auto rounded-2xl shadow-2xl shadow-slate-700 max-w-4xl w-full p-8">
        <div className="bg-slate-900 mt-5 w-full">
          <h1 className="bg-slate-900 text-blue-600 -my-10 text-lg text-center border border-transparent rounded-xl p-2">
            Completed Tasks
          </h1>
          <hr className="w-44 mx-auto mt-7" />
          <ul className="bg-slate-900 mt-5 w-full">
            {completedTasks.length > 0 ? (
              completedTasks.map((task, index) => (
                <li
                  key={index}
                  className="p-2 border-b border-gray-300 bg-slate-900 w-full flex items-center justify-between text-gray-500"
                >
                  <span className="w-full bg-slate-900 line-through">{task.text}</span>
                  <div className="flex gap-3 bg-slate-900">
                    <input
                      type="checkbox"
                      checked={task.isCompleted}
                      onChange={() => toggleComplete(index)} // Update task completion
                      className="ml-4"
                    />
                    <Button
                      onClick={() => deleteTask(index)}
                      className="rounded-full border bg-slate-900 text-red-700 border-red-700"
                    >
                      Delete
                    </Button>
                  </div>
                </li>
              ))
            ) : (
              <p className="text-gray-500 text-center bg-slate-900">
                No completed tasks yet.
              </p>
            )}
          </ul>
        </div>
      </div>
    </>
  );
}
