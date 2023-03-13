import React from "react";
import item1 from "../../../../Assets/Items/item1.png"
import item2 from "../../../../Assets/Items/item2.png"
import item3 from "../../../../Assets/Items/item3.png"
import item4 from "../../../../Assets/Items/item4.png"
import item5 from "../../../../Assets/Items/item5.png"
import item6 from "../../../../Assets/Items/item6.png"

const FeaturedComponent = () => {
    return (
        <div className="flex flex-row flex-wrap justify-center py-2">
            {/* item 1 */}
            <div className="flex-col justify-center box-content rounded drop-shadow-md h-40 w-32 bg-white text-xs m-2">
                <div className="bg-red-100 rounded text-red-400 pl-1">
                    -25%
                </div>
                <img className="h-20 w-20 mx-auto" src={item3} alt="item1" />
                <div className="text-center text-xs text-[#86C649]">
                    Rp. 18.000,-
                </div>
                <div className="text-center text-xs font-medium">
                    Orange
                </div>
                <div className="text-center text-xs text-gray-500 font-light">
                    1kg
                </div>
            </div>
            {/* item 2 */}
            <div className="flex-col justify-center box-content rounded drop-shadow-md h-40 w-32 bg-white text-xs m-2">
                <div className="bg-red-100 rounded text-red-400 pl-1">
                    -20%
                </div>
                <img className="h-20 w-20 mx-auto" src={item2} alt="item1" />
                <div className="text-center text-xs text-[#86C649]">
                    Rp. 14.000,-
                </div>
                <div className="text-center text-xs font-medium">
                    Tomato
                </div>
                <div className="text-center text-xs text-gray-500 font-light">
                    1kg
                </div>
            </div>
            {/* item 3 */}
            <div className="flex-col justify-center box-content rounded drop-shadow-md h-40 w-32 bg-white text-xs m-2">
                <div className="bg-red-100 rounded  text-red-400 pl-1">
                    -16%
                </div>
                <img className="h-20 w-20 mx-auto" src={item1} alt="item1" />
                <div className="text-center text-xs text-[#86C649]">
                    Rp. 20.000,-
                </div>
                <div className="text-center text-xs font-medium">
                    Apple
                </div>
                <div className="text-center text-xs text-gray-500 font-light">
                    1kg
                </div>
            </div>
            {/* item 4 */}
            <div className="flex-col justify-center box-content rounded drop-shadow-md h-40 w-32 bg-white text-xs m-2">
                <div className="bg-yellow-100 rounded text-red-300 pl-1">
                    NEW
                </div>
                <img className="h-20 w-20 mx-auto" src={item4} alt="item1" />
                <div className="text-center text-xs text-[#86C649]">
                    Rp. 22.000,-
                </div>
                <div className="text-center text-xs font-medium">
                    Strawberry
                </div>
                <div className="text-center text-xs text-gray-500 font-light">
                    1kg
                </div>
            </div>
            {/* item 5 */}
            <div className="flex-col justify-center box-content rounded drop-shadow-md h-40 w-32 bg-white text-xs m-2">
                <div className="bg-yellow-100 rounded text-red-300 pl-1">
                    NEW
                </div>
                <img className="h-20 w-20 mx-auto" src={item5} alt="item1" />
                <div className="text-center text-xs text-[#86C649]">
                    Rp. 25.000,-
                </div>
                <div className="text-center text-xs font-medium">
                    Avocado
                </div>
                <div className="text-center text-xs text-gray-500 font-light">
                    1kg
                </div>
            </div>
            {/* item 6 */}
            <div className="flex-col justify-center box-content rounded drop-shadow-md h-40 w-32 bg-white text-xs m-2">
                <div className="bg-yellow-100 rounded text-red-300 pl-1">
                    NEW
                </div>
                <img className="h-20 w-20 mx-auto" src={item6} alt="item1" />
                <div className="text-center text-xs text-[#86C649]">
                    Rp. 15.000,-
                </div>
                <div className="text-center text-xs font-medium">
                    Carrot
                </div>
                <div className="text-center text-xs text-gray-500 font-light">
                    1kg
                </div>
            </div>

        </div>
    )
}

export default FeaturedComponent;