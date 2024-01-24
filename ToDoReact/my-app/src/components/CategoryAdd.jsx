import React from "react";
import ReactDOM from "react-dom/client";
class CategoryAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: ""
        };
    }
    //Khi gõ phím vào ô thì cập nhật lại state giá trị mới
    handleInputChange = event => {
        this.setState({ inputValue: event.target.value });
    };
    //Khi gõ phím Enter thì gọi hàm handleCategoryAdd
    handleKeyPress = event => {
        if (event.key === "Enter") {
            this.handleCategoryAdd();
        }
    };
    //Khi hàm này được gọi, nó sẽ gửi yêu cầu lên cha của nó
    handleCategoryAdd = () => {
        const inputValue = this.state.inputValue;
        if (inputValue.trim() !== "") {
            this.props.handleCategoryAdd(inputValue);
            this.setState({ inputValue: "" });
        }
    };
    render() {
        return (
            <div className="category-add">
                <i className="fas fa-plus"></i>
                <label>
                    <input type="text"
                        placeholder="Mời nhập tên danh sách"
                        value={this.state.inputValue}
                        onChange={this.handleInputChange}
                        onKeyPress={this.handleKeyPress}
                    />
                </label>
                <a href="#" className="btn-save-category"
                    onClick={this.handleCategoryAdd}>
                    <i className="fas fa-save"></i>
                </a>
            </div>
        );
    }

}
export default CategoryAdd