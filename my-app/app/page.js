"use client"

import { useState, useEffect } from "react";
import TextEditor from "./Components/TextEditor";
import TodoModal from "./Components/TodoModal";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [todos, setTodos] = useState([])
  const [selectedTodo, setSelectedTodo] = useState(null)

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch('http://localhost:5000/');
        const data = await response.json();
        setTodos(data)
        console.log(data)
      }
      catch (err) {
        console.log(err);
      }
    }
    fetchTodos();
  }, [])

  const handleDelete = async (id) => {
    console.log(id)
    try {
      const response = await fetch('http://localhost:5000/delete', {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id })
      })
      const data = await response.json();
      console.log(data)

      if (response.ok) {
        // Remove the deleted To-Do from the state
        setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
        setSelectedTodo(null); // Reset selected To-Do if it was deleted
      } else {
        console.error("Error deleting:", data);
      }
    }
    catch (err) {
      console.log(err);
    }
  }

  const handleUpdate = async (todo) => {
    if (!todo._id) {
      console.log("Error: Todo ID is missing");
      return;
    }

    const payload = {
      id: todo._id,
      description: todo.description
    }
    console.log(payload)
    try {
      const response = await fetch('http://localhost:5000/update', {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      })
      const data = await response.json();
      console.log(data)

      if (response.ok) {
        // Update the local state instantly
        setTodos((prevTodos) =>
          prevTodos.map((t) =>
            t._id === todo._id ? { ...t, description: todo.description } : t
          )
        );
  
        // Also update the selectedTodo state
        setSelectedTodo((prev) => (prev && prev._id === todo._id ? { ...prev, description: todo.description } : prev));
      }
    }
    catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    console.log("Updated Todos:", todos);
  }, [todos]);

  return (
    <>
      {isModalOpen && <TodoModal setIsModalOpen={setIsModalOpen} todos={todos} setTodos={setTodos}/>}
      <div className="container bg-[#F4F4F4] min-h-[100vh] flex justify-around pt-10">
        <div className="left w-[30%] flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <button onClick={() => setIsModalOpen(true)} className="todo-btn bg-black text-white flex justify-center items-center p-2 rounded-md hover:cursor-pointer">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.99992 5.41668C9.99992 2.88537 7.94789 0.833344 5.41658 0.833344C2.88528 0.833344 0.833252 2.88537 0.833252 5.41668C0.833252 7.94799 2.88528 10 5.41658 10C7.94789 10 9.99992 7.94799 9.99992 5.41668ZM5.83379 5.83335L5.83418 7.91961C5.83418 8.14973 5.64763 8.33626 5.41751 8.33626C5.18739 8.33626 5.00084 8.14973 5.00084 7.91961L5.00046 5.83335H2.91333C2.68321 5.83335 2.49666 5.6468 2.49666 5.41669C2.49666 5.18657 2.68321 5.00002 2.91333 5.00002H5.0003L4.99992 2.91607C4.99992 2.68595 5.18647 2.4994 5.41658 2.4994C5.6467 2.4994 5.83325 2.68595 5.83325 2.91607L5.83364 5.00002H7.91909C8.14921 5.00002 8.33575 5.18657 8.33575 5.41669C8.33575 5.6468 8.14921 5.83335 7.91909 5.83335H5.83379ZM14.7916 3.75001H10.572C10.4284 3.30545 10.2288 2.88602 9.98175 2.50001H14.7916C16.2873 2.50001 17.4999 3.71257 17.4999 5.20834V10.9406C17.4999 11.4378 17.3023 11.9148 16.9508 12.2664L12.2663 16.9508C11.9147 17.3024 11.4378 17.5 10.9405 17.5H5.20825C3.71248 17.5 2.49992 16.2874 2.49992 14.7917V9.98184C2.88593 10.2289 3.30536 10.4285 3.74992 10.5721V14.7917C3.74992 15.5971 4.40284 16.25 5.20825 16.25H10.8333V13.5417C10.8333 12.0975 11.9637 10.9173 13.3879 10.8376L13.5416 10.8333H16.2499V5.20834C16.2499 4.40293 15.597 3.75001 14.7916 3.75001ZM15.3658 12.0833H13.5416C12.7764 12.0833 12.1489 12.6726 12.0881 13.4221L12.0833 13.5417V15.3658L15.3658 12.0833Z" fill="white" />
              </svg>
              <span className="text-[14px]">TODO </span>
            </button>
            <span className="search bg-white p-2 rounded-md shadow-xs">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 2.75C14.0041 2.75 17.25 5.99594 17.25 10C17.25 11.7319 16.6427 13.3219 15.6295 14.5688L20.5303 19.4697C20.8232 19.7626 20.8232 20.2374 20.5303 20.5303C20.2641 20.7966 19.8474 20.8208 19.5538 20.6029L19.4697 20.5303L14.5688 15.6295C13.3219 16.6427 11.7319 17.25 10 17.25C5.99594 17.25 2.75 14.0041 2.75 10C2.75 5.99594 5.99594 2.75 10 2.75ZM10 4.25C6.82436 4.25 4.25 6.82436 4.25 10C4.25 13.1756 6.82436 15.75 10 15.75C13.1756 15.75 15.75 13.1756 15.75 10C15.75 6.82436 13.1756 4.25 10 4.25Z" fill="#212121" />
              </svg>
            </span>
          </div>
          <div className="todo-list flex flex-col gap-4 overflow-y-scroll max-h-[90vh]">
            {todos.map((todo) => (
              <div key={todo._id} className={`todo bg-white p-2 rounded-md shadow-xs flex flex-col gap-2 hover:cursor-pointer transition-all ease-in-out ${selectedTodo?._id === todo._id ? 'border-2' : ''}`} onClick={() => setSelectedTodo({ ...todo })}>
                <h1 className="text-[16px] font-[600]">{todo.title}</h1>
                <div className="flex justify-between items-center w-full gap-3">
                  <p className="text-[14px] w-[80%]">{todo.description}</p>
                  <span className="date text-[12px] w-[20%] text-end">{todo.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="right bg-white w-[50%] p-10 text-[36px] font-[600] rounded-md">
          {selectedTodo ?
            (<>
              <div className="flex justify-between items-center">
                <h1>{selectedTodo.title}</h1>
                <div className="flex items-center gap-2">
                  <button
                    type="submit"
                    onClick={() => handleUpdate(selectedTodo)}
                    className="inline-flex w-full justify-center rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-[#10F2C5] hover:text-black hover:cursor-pointer sm:ml-3 sm:w-auto"
                  >
                    Update
                  </button>
                  <div className="delete" onClick={() => handleDelete(selectedTodo._id)}>
                    <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 4H12C12 2.89543 11.1046 2 10 2C8.8954 2 8 2.89543 8 4ZM6.5 4C6.5 2.067 8.067 0.5 10 0.5C11.933 0.5 13.5 2.067 13.5 4H19.25C19.6642 4 20 4.33579 20 4.75C20 5.16421 19.6642 5.5 19.25 5.5H17.9309L16.7589 17.6112C16.5729 19.5334 14.9575 21 13.0263 21H6.97369C5.04254 21 3.42715 19.5334 3.24113 17.6112L2.06908 5.5H0.75C0.33579 5.5 0 5.16421 0 4.75C0 4.33579 0.33579 4 0.75 4H6.5ZM8.5 8.75C8.5 8.33579 8.1642 8 7.75 8C7.33579 8 7 8.33579 7 8.75V16.25C7 16.6642 7.33579 17 7.75 17C8.1642 17 8.5 16.6642 8.5 16.25V8.75ZM12.25 8C12.6642 8 13 8.33579 13 8.75V16.25C13 16.6642 12.6642 17 12.25 17C11.8358 17 11.5 16.6642 11.5 16.25V8.75C11.5 8.33579 11.8358 8 12.25 8ZM4.73416 17.4667C4.84577 18.62 5.815 19.5 6.97369 19.5H13.0263C14.185 19.5 15.1542 18.62 15.2658 17.4667L16.4239 5.5H3.57608L4.73416 17.4667Z" fill="#1B1B1B" />
                    </svg>
                  </div>
                </div>

              </div>
              <TextEditor description={selectedTodo.description} selectedTodo={selectedTodo} setSelectedTodo={setSelectedTodo}/>
            </>)
            :
            (<p>Select a todo to view</p>)
          }

        </div>
      </div>
    </>
  );
}
