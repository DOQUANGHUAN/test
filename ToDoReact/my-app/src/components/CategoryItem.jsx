import React from "react";
import ReactDOM from "react-dom";
class CategoryItem extends React.Component {
    render() {
        const { category,
            activeCategory,
            handleCategoryActiveChange,
            handleCategoryDelete,
            handleCategoryEdit,
            handleCategoryChange,
            handleCategoryUpdate
        } = this.props;
        return (
            <li data-catid={category.categoryID}>
                <a className={activeCategory == category.categoryID ? "title active" : "title"}
                    href="#"
                    onClick={event => handleCategoryActiveChange(event, category.categoryID)}>
                    <i className="fas fa-bars"></i>
                    <label onDoubleClick={event => handleCategoryEdit(event)} >{category.title}</label>
                    <input type="text" value={category.title} 
                        onChange={event => handleCategoryChange(event, category.categoryID)}
                        onKeyUp={event => handleCategoryUpdate(event, category.categoryID)}
                    />
                </a>
                <span className="remove" onClick={() => handleCategoryDelete(category.categoryID)}>
                    <i className="fa-solid fa-trash"></i>
                </span>
            </li>
        );
    }

}
export default CategoryItem;