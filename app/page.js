"use client";
import Todo from "@/Components/Todo";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  // creating useState() for storing data
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  // we create onchange handler function that will take the data from
  // input filed text box and it will store in the titile and description

  const onChangHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((form) => ({ ...form, [name]: value }));
    // console.log(formData);
  };
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      // api
      const response = await axios.post("/api", formData);
      toast.success(response.data.message);
      // after adding the input and textbox will automatically clear
      setFormData({ title: "", description: "" });
      // call the function after adding new todo it will render don't need to referesh manually
      await fetchTodos();
    } catch (error) {
      toast.error("Error");
    }
  };

  // create one state variable where stroe the todos data
  const [todoData, setTodoData] = useState([]);

  const fetchTodos = async (req) => {
    const response = await axios("/api");
    setTodoData(response.data.todos);
  };

  const deleteTodo = async (id) => {
    try {
      // Send DELETE request with 'mongo' as the query parameter
      const response = await axios.delete("/api", {
        params: {
          mongo: id, // Use 'mongo' as the query parameter based on your backend API route
        },
      });

      // Show success message
      toast.success(response.data.message);

      // Reload or refresh the list of Todos
      fetchTodos();
    } catch (error) {
      // Show error message if the request fails
      toast.error(error.response?.data?.message || "Error deleting Todo");
    }
  };

  const completeTodo = async (id) => {
    try {
      // Send DELETE request with 'mongo' as the query parameter
      const response = await axios.put(
        "/api",
        {},
        {
          params: {
            mongo: id, // Use 'mongo' as the query parameter based on your backend API route
          },
        }
      );

      // Show success message
      toast.success(response.data.message);

      // Reload or refresh the list of Todos
      fetchTodos();
    } catch (error) {
      // Show error message if the request fails
      toast.error(error.response?.data?.message || "Error Doneing Todo");
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);
  return (
    <>
      <ToastContainer theme="dark" />
      <form
        onSubmit={onSubmitHandler}
        className="flex items-start flex-col gap-2 w-[80%] max-w-[600px] mt-24 px-2  mx-auto"
      >
        <input
          type="text"
          name="title"
          value={formData.title}
          placeholder="enter title"
          className="px-3 py-2 border-2 w-full"
          onChange={onChangHandler}
        />
        <textarea
          name="description"
          value={formData.description}
          placeholder="Enter Description"
          className="px-3 py-2 border-2 w-full"
          onChange={onChangHandler}
        ></textarea>
        <button type="submit" className="bg-orange-600 py-3 px-11 text-white">
          Add Todo
        </button>
      </form>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-20 w-[60%] mx-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
          <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                Id
              </th>
              <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                Title
              </th>
              <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                Description
              </th>
              <th
                scope="col"
                className="px-6 py-3  bg-gray-50 dark:bg-gray-800"
              >
                Status
              </th>
              <th
                scope="col"
                className="px-6 py-3  bg-gray-50 dark:bg-green-800 text-center"
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {todoData.map((item, index) => {
              return (
                <Todo
                  key={index}
                  id={index}
                  title={item.title}
                  description={item.description}
                  complete={item.isCompleted}
                  mongoId={item._id}
                  deleteTodo={deleteTodo}
                  completeTodo={completeTodo}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
