import CategoryComponent from '../../Components/CategoryComponent';

const CategorySection = () => {
    return (
        <div className="flex flex-col text-base text-left font-bold px-5 py-3">
            <div>
                Categories
            </div>
            <CategoryComponent />
        </div>
    )
}

export default CategorySection;