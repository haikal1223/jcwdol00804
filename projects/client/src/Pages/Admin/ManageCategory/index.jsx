import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../../helper";
import PageAdmin from "../../../Components/PageAdmin";
import img_default from "../../../Assets/default.png"
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { FaTrashRestore } from "react-icons/fa";
import { Link } from "react-router-dom";

const ManageCategory = () => {
    const [name, setName] = useState("");
    const [categoryList, setCategoryList] = useState([]);
    const [isModalDelete, setIsModalDelete] = useState(false);
    const [isModalRestore, setIsModalRestore] = useState(false);

    const getCategories = async () => {
        try {
            const token = localStorage.getItem("xmart_login");
            const { data } = await axios.get(
                `${API_URL}/category/get-categories`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
            );
            setCategoryList(data.data);
        } catch (error) {
            alert(error.response.data.message);
        };
    };

    useEffect(() => {
        getCategories();
        // eslint-disable-next-line
    }, []);

    const onSubmit = async () => {
        try {
            const token = localStorage.getItem("xmart_login");
            const result = await axios.post(`${API_URL}/category/add-category`,
                {
                    name
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            alert(result.data.message);
            getCategories();
        } catch (error) {
            alert(error.response.data.message);
        };
    };

    const handleDelete = async (id) => {
        try {
            const result = await axios.patch(`${API_URL}/category/delete-category/${id}`);
            alert(result.data.message);
            getCategories();
        } catch (error) {
            alert(error.response.data.message);
        };
    };

    const handleRestore = async (id) => {
        try {
            const result = await axios.patch(`${API_URL}/category/restore-category/${id}`);
            alert(result.data.message);
            getCategories();
        } catch (error) {
            alert(error.response.data.message);
        };
    };

    return (
        <PageAdmin>
            <div className="container">
                <div className="text-2xl font-bold">Manage Category</div>
                <div className="flex">
                    {/* Category List */}
                    <div className="flex flex-col py-5">
                        <div className="flex text-xl font-semibold ml-5 mb-2">
                            Category List
                        </div>
                        {categoryList.map((value) => (
                            <div
                                key={value.id}
                                className="flex flex-col px-5 py-1"
                            >
                                <div className="container rounded-xl shadow-md border h-min-[200px] w-[500px] py-2 mx-2">
                                    {value.is_delete === 0 ? (
                                        <div className="flex justify-start">
                                            {value.category_img == null ? (
                                                <div className="w-[75px] text-center p-2">
                                                    <img
                                                        src={img_default}
                                                        alt="default"
                                                        className="w-14 h-14"
                                                    />
                                                </div>
                                            ) : (
                                                <div className="w-[75px] text-center p-2">
                                                    <img
                                                        src={value.category_img && `http://localhost:8000/${value.category_img}`}
                                                        alt="category_img"
                                                        className="w-14 h-14"
                                                    />
                                                </div>
                                            )}
                                            <div className="w-[200px] text-left font-bold pl-2 py-[20px]">
                                                {value.name}
                                            </div>
                                            <Link
                                                to={`/manage-category/${value.id}`}
                                                className="flex justify-center font-bold text-gray-400 w-[100px] h-[50px] py-[20px]"
                                            >
                                                Edit
                                                <AiFillEdit
                                                    size={20}
                                                    cursor="pointer"
                                                    className="ml-2 mt-1"
                                                />
                                            </Link>
                                            <button
                                                className="flex justify-center font-bold text-red-400 w-[100px] h-[50px] py-[20px]"
                                                onClick={() => setIsModalDelete(!isModalDelete)}
                                            >
                                                Delete
                                                <AiFillDelete
                                                    size={20}
                                                    cursor="pointer"
                                                    className="ml-2 mt-1"
                                                />
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="flex justify-start">
                                            {value.category_img == null ? (
                                                <div className="w-[75px] text-center p-2">
                                                    <img
                                                        src={img_default}
                                                        alt="default"
                                                        className="w-14 h-14"
                                                    />
                                                </div>
                                            ) : (
                                                <div className="w-[75px] text-center p-2">
                                                    <img
                                                        src={value.category_img && `http://localhost:8000/${value.category_img}`}
                                                        alt="category_img"
                                                        className="w-14 h-14"
                                                    />
                                                </div>
                                            )}
                                            <div className="w-[200px] text-left font-bold pl-2 py-[20px]">
                                                {value.name}
                                            </div>
                                            <div className="flex justify-center font-bold text-red-400 w-[100px] py-[20px]">
                                                Deleted
                                            </div>
                                            <button
                                                className="flex justify-center font-bold text-blue-400 w-[100px] h-[50px] py-[20px]"
                                                onClick={() => setIsModalRestore(!isModalRestore)}
                                            >
                                                Restore
                                                <FaTrashRestore
                                                    size={16}
                                                    cursor="pointer"
                                                    className="ml-2 mt-1"
                                                />
                                            </button>
                                        </div>
                                    )}
                                    {/* Modal Restore */}
                                    {isModalRestore ? (
                                        <div className="container flex justify-center mx-auto">
                                            <div className="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-20">
                                                <div className="max-w-sm p-6 bg-white divide-y divide-gray-500 rounded-lg">
                                                    <div className="flex items-center justify-between">
                                                        <h3 className="text-2xl">Restore category</h3>
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            className="w-6 h-6"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke="currentColor"
                                                            cursor="pointer"
                                                            onClick={() => setIsModalRestore(!isModalRestore)}
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth="2"
                                                                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                                                            />
                                                        </svg>
                                                    </div>
                                                    <div className="mt-4">
                                                        <p className="mb-4 text-sm mt-4 text-center">
                                                            Are you sure you want to restore this category ?
                                                        </p>
                                                        <div className="flex flex-row justify-center">
                                                            <button
                                                                className="px-4 py-1 mx-2 text-white bg-red-400 rounded-md hover:opacity-50"
                                                                type="submit"
                                                                onClick={() => setIsModalRestore(!isModalRestore)}
                                                            >
                                                                Discard
                                                            </button>
                                                            <button
                                                                className="px-4 py-1 mx-2 text-white bg-blue-400 rounded-md hover:opacity-50"
                                                                type="submit"
                                                                onClick={() => {
                                                                    setIsModalRestore(!isModalRestore);
                                                                    handleRestore(value.id);
                                                                }
                                                                }
                                                            >
                                                                Confirm
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ) : null}
                                    {/* Modal Delete */}
                                    {isModalDelete ? (
                                        <div className="container flex justify-center mx-auto">
                                            <div className="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-20">
                                                <div className="max-w-sm p-6 bg-white divide-y divide-gray-500 rounded-lg">
                                                    <div className="flex items-center justify-between">
                                                        <h3 className="text-2xl">Delete category</h3>
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            className="w-6 h-6"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke="currentColor"
                                                            cursor="pointer"
                                                            onClick={() => setIsModalDelete(!isModalDelete)}
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth="2"
                                                                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                                                            />
                                                        </svg>
                                                    </div>
                                                    <div className="mt-4">
                                                        <p className="mb-4 text-sm mt-4 text-center">
                                                            Are you sure you want to delete this category ?
                                                        </p>
                                                        <div className="flex flex-row justify-center">
                                                            <button
                                                                className="px-4 py-1 mx-2 text-white bg-red-400 rounded-md hover:opacity-50"
                                                                type="submit"
                                                                onClick={() => setIsModalDelete(!isModalDelete)}
                                                            >
                                                                Discard
                                                            </button>
                                                            <button
                                                                className="px-4 py-1 mx-2 text-white bg-blue-400 rounded-md hover:opacity-50"
                                                                type="submit"
                                                                onClick={() => {
                                                                    setIsModalDelete(!isModalDelete);
                                                                    handleDelete(value.id);
                                                                }
                                                                }
                                                            >
                                                                Confirm
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ) : null}
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* Add Branch Admin */}
                    <div className="flex flex-col py-5">
                        <div className="flex text-xl font-semibold ml-5 mb-2">
                            Add New Category
                        </div>
                        <div className="block border-white w-[400px] rounded-md px-5 shadow-md ml-5">
                            <div className="flex justify-start my-2">
                                <label htmlFor="name" className="mr-12 pt-1">
                                    Name
                                </label>
                                <input
                                    className="block border w-full h-[32px] pl-2"
                                    id="name"
                                    name="name"
                                    type="text"
                                    placeholder="category name"
                                    onChange={(e) => {
                                        setName(e.target.value);
                                    }}
                                />
                                <button
                                    type="submit"
                                    className="rounded-md bg-blue-400 w-[200px] h-[32px]
                                    text-white font-[500]
                                    leading-6 shadow-md
                                    hover:opacity-50
                                    ml-6"
                                    onClick={onSubmit}
                                >
                                    Add
                                </button>
                            </div>
                        </div>
                        <div className="flex justify-center">
                        </div>
                    </div>
                </div>
            </div>
        </PageAdmin>
    );
};

export default ManageCategory;
