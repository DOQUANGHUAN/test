import React from "react";
import ReactDOM from "react-dom";

class InputAddTask extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            taskInputValue: ""
        };
    }
    //Khi gõ phím vào ô thì cập nhật lại state giá trị mới
    handleTaskInputChange = event => {
        this.setState({ taskInputValue: event.target.value });
    };

    //Khi gõ phím Enter thì gọi hàm handleTaskAdd
    handleTaskKeyPress = event => {
        if (event.key === "Enter") {
            this.handleTaskInput();
        }
    };

    //Khi hàm này được gọi, nó sẽ gửi yêu cầu lên cha của nó
    handleTaskInput = () => {
        const inputValue = this.state.taskInputValue;
        if (inputValue.trim() !== "") {
            this.props.handleTaskAdd(inputValue);
            this.setState({ taskInputValue: "" });
        }
    };

    render() {
        return (
            <div class="add-box">
                <i class="fa-regular fa-pen-to-square"></i>
                <input class="input-add" type="text" placeholder="Write a new task"
                    value={this.state.taskInputValue}
                    onChange={this.handleTaskInputChange}
                    onKeyPress={this.handleTaskKeyPress}

                />
                <a class="button-add" href="#">Add task</a>
            </div>
        );
    }
    
}
export default InputAddTask