import React from 'react'
import FeaturedComponent from '../../Components/FeaturedComponent';

const FeaturedSection = () => {
    return (
        <div className="flex flex-col text-base text-left font-bold px-5 py-5">
            <div>
                Featured products
            </div>
            <FeaturedComponent />
        </div>
    )
}

export default FeaturedSection;