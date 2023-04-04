import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../../helper";
import { AiFillPlusCircle } from "react-icons/ai";
import {
    TbSortAscendingLetters,
    TbSortDescendingLetters,
    TbSortDescendingNumbers,
    TbSortAscendingNumbers
} from "react-icons/tb";
import { BiSearch } from "react-icons/bi";
import img from "../../../Assets/default.png";
import { Link, useLocation } from "react-router-dom";

const ProductComponent = () => {
    const location = useLocation();
    const [products, setProducts] = useState([]);
    const [categoryList, setCategoryList] = useState([]);
    const [category, setCategory] = useState("");
    const [name, setName] = useState("");
    const [nameValue, setNameValue] = useState("");
    const [by, setBy] = useState("name");
    const [order, setOrder] = useState("asc");
    const [page, setPage] = useState(1);
    const limit = 10;


    const getProducts = async () => {
        try {
            const { data } =
                await axios.get(`${API_URL}/product/product-list?category=${location.state ? location.state.from : category}&name=${name}&by=${by}&order=${order}&limit=${limit}&page=${page}`);
            setProducts(data.data);
        } catch (error) {
            alert(error.response.data.message);
        };
    };

    const fetchCategories = async () => {
        try {
            const { data } =
                await axios.get(`${API_URL}/product/categories`);
            setCategoryList(data.data)
        } catch (error) {
            alert(error.response.data.message);
        };
    };

    useEffect(() => {
        getProducts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [category, name, by, order, limit, page]);

    useEffect(() => {
        fetchCategories();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSortByName = () => {
        setOrder(order === "asc" ? "desc" : "asc");
        setBy("name");
    };

    const handleSortByPrice = () => {
        setOrder(order === "asc" ? "desc" : "asc");
        setBy("price");
    }

    const handleCategoryChange = (e) => {
        const selected = e.target.value;
        if (selected === "Select category") {
            setCategory("");
        } else {
            setCategory(selected);
        };
        setPage(1);
    };

    // Pagination
    const handleNextPage = () => {
        setPage(page + 1);
    };

    const handlePrevPage = () => {
        setPage(page - 1);
    };

    return (
        <div className="container">
            <div className="flex flex-col justify-center px-14">
                {/* Filter by name */}
                <div className="flex items-center bg-gray-100 rounded px-2 w-full h-8">
                    <input
                        className="bg-transparent text-sm p-1 pl-1 w-full focus:outline-none"
                        placeholder="Search name.."
                        type="text"
                        onChange={(e) => {
                            setNameValue(e.target.value);
                        }}
                    />
                    <button
                        className="text-[gray] hover:text-[#82CD47]"
                        onClick={() => {
                            setName(nameValue);
                        }}
                    >
                        <BiSearch size={20} />
                    </button>
                </div>
                {/* Sorting */}
                <div className="flex justify-center mt-2 mb-5">
                    <select
                        className="bg-gray-100 rounded w-full text-sm text-gray-400 h-8 px-2 focus:outline-none"
                        value={category}
                        onChange={handleCategoryChange}
                    >
                        <option
                            value="Select category"
                        >
                            Select category
                        </option>
                        {
                            categoryList.map((category) => {
                                return (
                                    <option key={category.category_id} value={category.category_id}>
                                        {category.category_id}
                                    </option>
                                )
                            })
                        }
                    </select>
                    {/* Button ASC/DESC by name */}
                    <button
                        className="text-[gray] hover:text-[#82CD47] mx-2"
                        onClick={() => handleSortByName("name")}
                    >
                        {order === "asc" ? (
                            <TbSortAscendingLetters size={30} />
                        ) : (
                            <TbSortDescendingLetters size={30} />
                        )}
                    </button>
                    {/* Button ASC/DESC by price */}
                    <button
                        className="text-[gray] hover:text-[#82CD47]"
                        onClick={() => handleSortByPrice("price")}
                    >
                        {order === "asc" ? (
                            <TbSortAscendingNumbers size={30} />
                        ) : (
                            <TbSortDescendingNumbers size={30} />
                        )}
                    </button>
                </div>
            </div>
            {/* Products Result */}
            <div className="flex flex-row flex-wrap justify-center">
                {products.map((product) => (
                    <Link key={product.id}
                        to={`/product-detail/${product.id}`}
                    >
                        <div
                            className="flex-col justify-center box-content 
                            rounded-lg drop-shadow-md h-42 w-32 bg-white
                            text-xs mx-5 my-2 pt-2">
                            <img
                                className="h-20 w-20 mx-auto mt-1"
                                src={img}
                                alt="img"
                            />
                            <div
                                className="text-center text-sm font-medium"
                            >
                                {product.name}
                            </div>
                            <div className="text-center text-sm text-[#86C649] 
                            font-semibold my-1"
                            >
                                Rp. {product.price.toLocaleString()},-
                            </div>
                            {/* Button Add to cart */}
                            <div className="flex justify-end">
                                <button
                                    className="text-[#82CD47] 
                                    hover:text-[#BFF099]">
                                    <AiFillPlusCircle size={30} />
                                </button>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
            {/* Pagination */}
            <div
                className="flex justify-between my-5 bg-[#AAD27D] 
                text-white font-semibold rounded-md drop-shadow-md mx-24"
            >
                <button
                    className="mx-2"
                    onClick={handlePrevPage}
                    disabled={page <= 1}
                >
                    Prev
                </button>
                <div className="mx-2">
                    Page {page}
                </div>
                <button
                    className="mx-2"
                    onClick={handleNextPage}
                    disabled={products.length < limit}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default ProductComponent;