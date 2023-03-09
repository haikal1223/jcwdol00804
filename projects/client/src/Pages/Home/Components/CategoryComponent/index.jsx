import React from "react"
import category1 from "../../../../Assets/Categories/category1.png"
import category2 from "../../../../Assets/Categories/category2.png"
import category3 from "../../../../Assets/Categories/category3.png"
import category4 from "../../../../Assets/Categories/category4.png"
import category5 from "../../../../Assets/Categories/category5.png"

const CategoryComponent = () => {
    return (
        <div className="flex flex-row flex-no-wrap justify-center py-2">
            <div className="box-content rounded h-16 w-16 bg-white text-xs m-2.5 text-center">
                <img src={category1} alt="category1" />
                <div className="m-2 text-gray-500">
                    Fruits
                </div>
            </div>
            <div className="box-content rounded h-16 w-16 bg-white text-xs m-2.5 text-center">
                <img src={category2} alt="category1" />
                <div className="m-2 text-gray-500">
                    Meat
                </div>
            </div>
            <div className="box-content rounded h-16 w-16 bg-white text-xs m-2.5 text-center">
                <img src={category3} alt="category1" />
                <div className="m-2 text-gray-500">
                    Rice
                </div>
            </div>
            <div className="box-content rounded h-16 w-16 bg-white text-xs m-2.5 text-center">
                <img src={category4} alt="category1" />
                <div className="m-2 text-gray-500">
                    Meals
                </div>
            </div>
            <div className="box-content rounded h-16 w-16 bg-white text-xs m-2.5 text-center">
                <img src={category5} alt="category1" />
                <div className="m-2 text-gray-500">
                    Bakery
                </div>
            </div>
        </div>
    )
}

export default CategoryComponent;