'use client'

import { useState, useEffect } from 'react'
import { Description, Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { useForm } from "react-hook-form";

export default function Example({ setIsModalOpen, todos, setTodos }) {
    const [open, setOpen] = useState(true)
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        console.log(data)
        const payload = {
            title: data.title, 
            description: data.description, 
            date: data.date 
        }
        
        try {
            const response = await fetch('http://localhost:5000/', {
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
              })
            const result = await response.json();
            console.log(result)
            setIsModalOpen(false)
            
            if(response.ok){
                setTodos((prevTodos) => [...prevTodos, data]); 
            }
          }
          catch (err) {
            console.log(err);
          }
    }
    return (
        <Dialog open={open} onClose={setOpen} className="relative z-10">
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
            />

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <DialogPanel
                        transition
                        className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
                    >
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start flex flex-col ">
                                    <h1 className='text-lg font-bold'>New Todo</h1>

                                    <input className='outline-0 border-b-2 w-full my-3' type="text" placeholder='Title' {...register("title", {required: true})} />
                                    {errors.Title && <span className="text-red-500">This field is required</span>}

                                    <textarea className='outline-0 border-b-2 w-full my-3' name="Description" placeholder='Description' id="Description" {...register("description", {required: true})} />
                                    {errors.Description && <span className="text-red-500">This field is required</span>}

                                    <input className='outline-0 border-b-2 w-full my-3' type="text" placeholder='Date' {...register("date", {required: true})} />
                                    {errors.Date && <span className="text-red-500">This field is required</span>}
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                <button
                                    type="submit"
                                    // onClick={() => setIsModalOpen(false)}
                                    className="inline-flex w-full justify-center rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto"
                                >
                                    Add
                                </button>
                                <button
                                    type="button"
                                    data-autofocus
                                    onClick={() => setIsModalOpen(false)}
                                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    )
}
