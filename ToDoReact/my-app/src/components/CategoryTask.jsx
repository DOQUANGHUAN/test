import React from "react";
import ReactDOM from "react-dom/client";
import CategoryItem from "./CategoryItem";
import CategoryAdd from "./CategoryAdd";
class CategoryTask extends React.Component{
    render() {
        const { categories,
            activeCategory,
            handleCategoryActiveChange,
            handleCategoryAdd,
            handleCategoryDelete,
            handleCategoryEdit,
            handleCategoryChange,
            handleCategoryUpdate
        } = this.props;
        return (
            <div className="category-box">
                <ul className="category-list">
                    {categories.map(category => (
                        <CategoryItem
                            key={category.categoryID}
                            category={category}
                            activeCategory={activeCategory}
                            handleCategoryActiveChange={handleCategoryActiveChange}
                            handleCategoryDelete={handleCategoryDelete}
                            handleCategoryEdit={handleCategoryEdit}
                            handleCategoryChange={handleCategoryChange}
                            handleCategoryUpdate={handleCategoryUpdate}
                        />
                        ))}
                </ul>
                <CategoryAdd handleCategoryAdd={handleCategoryAdd} />
            </div>
        );
    }
   
}
export default CategoryTask;