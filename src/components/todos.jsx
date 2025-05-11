import React, { useState, useEffect } from "react";
import axios from "axios";
import ErrorPage from "./errorPage";
import LogoutButton from "./logout";

function Todos() {
   const url = 'http://localhost:5000/api'
  const [todos, setTodos] = useState([]);
  const [formdata, setFormData] = useState({ title: "", description: "" });
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ title: "", description: "" });
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [currentTodo, setCurrentTodo] = useState(null);
  console.log(editingId);

  useEffect(() => {
    const fetchTodos = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found. Please log in.");
        return;
      }
      try {
        const response = await axios.get(`${url}/todos`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTodos(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch todos");
      }
    };
    fetchTodos();
  }, []);

  const handleAddChange = (e) => {
    setFormData({ ...formdata, [e.target.name]: e.target.value });
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
       `${url}/addtodo`,
        formdata,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTodos((prev) => [response.data, ...prev]);
      setFormData({ title: "", description: "" });
      closeModal();
    } catch (error) {
      alert("Error adding todo");
    }
  };

  const deleteTodo = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`${url}/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTodos((prev) => prev.filter((todo) => todo._id !== id));
      closeModal();
    } catch (error) {
      alert("Error deleting todo");
    }
  };

  const startEdit = (todo) => {
    setEditingId(todo._id);
    setEditData({ title: todo.title, description: todo.description });
    openModal("edit", todo);
  };

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const submitEdit = async (id) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.put(
        `${url}/edit/${id}`,
        editData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTodos((prev) =>
        prev.map((todo) => (todo._id === id ? response.data : todo))
      );
      closeModal();
    } catch (error) {
      alert("Error updating todo");
    }
  };

  const openModal = (type, todo = null) => {
    setModalType(type);
    setCurrentTodo(todo);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalType(null);
    setCurrentTodo(null);
    setEditData({ title: "", description: "" });
  };

  if (error) return <div>
    <ErrorPage />
  </div>;

  return (
    <div className="container relative flex min-h-screen text-gray-800 antialiased flex-col justify-center overflow-hidden bg-[#3f434f] py-6 sm:py-12 font-delius">
      <div className="header"> 
        <h1 className="text-3xl relative font-bold mb-6 text-[#cedff9] font-font-delius text-center flex justify-center bottom-[60px]">
          STRIKEOUT
        </h1>
      </div>
      <div className=" todotitle relative py-3 sm:w-3/4 lg:w-1/2 mx-auto text-center mb-9">
        <span className="text-2xl font-light block mb-4 text-[#cedff9] ">
          Your Tasks
        </span>
        <div className="taskform mt-4 bg-[#d3e0fb] shadow-md rounded-lg text-center lg:w-[800px] w-[350px] ">
          <div className="h-2 bg-purple-400 rounded-t-md"></div>
          <div className="px-8 py-6">
            <ul className="space-y-4">
              {[...todos].reverse().map((todo) => (
                <li
                  key={todo._id}
                  className="border border-purple-300 p-4 rounded-md flex flex-col sm:flex-row justify-between items-center hover:bg-[#c3d0f0] cursor-pointer transition"
                  onClick={() => openModal("view", todo)}
                >
                  <div className="mb-2 sm:mb-0 text-slate-900">
                    <strong>{todo.title}</strong>: {todo.description}
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <button
                onClick={() => openModal("add")}
                className="bg-[#a18aff] text-white py-2 px-6 rounded-full w-full hover:bg-[#8c75f0] transition"
              >
                + Add Task
              </button>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-[#d3e0fb] p-6 rounded-lg shadow-lg w-11/12 sm:w-96 relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-700 hover:text-gray-900 text-lg"
            >
              ✖
            </button>

            {modalType === "add" && (
              <>
                <h2 className="text-xl mb-4 text-center text-[#3f434f] font-bold">
                  Add New Task
                </h2>
                <form onSubmit={handleAddSubmit}>
                  <label className="block font-semibold">Title</label>
                  <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={formdata.title}
                    onChange={handleAddChange}
                    required
                    className="border w-full px-3 py-2 mt-2 rounded-md focus:ring-purple-500 focus:ring-1 bg-white"
                  />
                  <label className="block mt-3 font-semibold">
                    Description
                  </label>
                  <input
                    type="text"
                    name="description"
                    placeholder="Description"
                    value={formdata.description}
                    onChange={handleAddChange}
                    required
                    className="border w-full px-3 py-2 mt-2 rounded-md focus:ring-purple-500 focus:ring-1 bg-white"
                  />
                  <div className="flex justify-end gap-2 mt-4">
                    <button
                      type="submit"
                      className="bg-[#a18aff] text-white px-4 py-2 rounded-full hover:bg-[#8c75f0] transition"
                    >
                      Add
                    </button>
                  </div>
                </form>
              </>
            )}

            {modalType === "view" && currentTodo && (
              <>
                <h2 className="text-xl mb-4 text-center text-[#3f434f] font-bold">
                  Task Details
                </h2>
                <div className="text-slate-900">
                  <strong>{currentTodo.title}</strong>:{" "}
                  {currentTodo.description}
                </div>
                <div className="flex justify-between gap-2 mt-4">
                  <button
                    onClick={() => startEdit(currentTodo)}
                    className="bg-yellow-400 text-white px-4 py-2 rounded-full hover:bg-yellow-500 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteTodo(currentTodo._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}

            {modalType === "edit" && currentTodo && (
              <>
                <h2 className="text-xl mb-4 text-center text-[#3f434f] font-bold">
                  Edit Task
                </h2>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    submitEdit(currentTodo._id);
                  }}
                >
                  <label className="block font-semibold">Title</label>
                  <input
                    type="text"
                    name="title"
                    value={editData.title}
                    onChange={handleEditChange}
                    required
                    className="border w-full px-3 py-2 mt-2 rounded-md focus:ring-purple-500 focus:ring-1 bg-white"
                  />
                  <label className="block mt-3 font-semibold">
                    Description
                  </label>
                  <input
                    type="text"
                    name="description"
                    value={editData.description}
                    onChange={handleEditChange}
                    required
                    className="border w-full px-3 py-2 mt-2 rounded-md focus:ring-purple-500 focus:ring-1 bg-white"
                  />
                  <div className="flex justify-end gap-2 mt-4">
                    <button
                      type="submit"
                      className="bg-[#a18aff] text-white px-4 py-2 rounded-full hover:bg-[#8c75f0] transition"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
      <div >
      <LogoutButton />
      </div>

    </div>
  );
}

export default Todos;
