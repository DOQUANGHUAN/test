import React from "react";
import ReactDOM from "react-dom";
import CategoryTask from "./CategoryTask";
import BoxTask from "./BoxTask";
import axios from "axios"
class App extends React.Component {
    constructor(props) {
        //Khởi tạo props
        super(props);
        //Khởi tạo state
        this.state = {
            activeCategory: 0,
            categories: [],
            doTasks: [],
            doneTasks: []
            
        };
    }

    //Hàm xử lý thay đổi category đang được chọn
    handleCategoryActiveChange = (event, catid) => {
        event.preventDefault();
        this.setState({
            activeCategory: catid
        });
        this.handleDoTaskLoad(catid);
        this.handleDoneTaskLoad(catid);
    };

    //Hàm tạo catID ngẫu nhiên không trùng (16 ký tự)
    getRandomGUID = () => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
            .replace(/[xy]/g, function (c) {
                const r = (Math.random() * 16) | 0;
                const v = c === 'x' ? r : (r & 0x3) | 0x8;
                return v.toString(16);
            });
    };

    //Hàm thêm 1 category mới vào danh sách categories có sẵn đang lưu trong state
    handleCategoryAdd = title => {
        const newCategory = {
            categoryID: 0,
            title: title,
            createTime: new Date(),
            tasks: null
        };
        //this.setState(prevState => ({
        //    categories: [...prevState.categories, newCategory],
        //    activeCategory: newCategory.categoryID
        //}));
        axios.post("https://localhost:44302/api/category/post", newCategory)
            .then(response => {
                this.handleCategoryLoad();
            })
            .catch(error => {
                this.handleCategoryLoad();
                alert("Lỗi không thể kết nối được với API");
            });
    };

    //Hàm xóa category
    handleCategoryDelete = (categoryID) => {
        const confirmDelete = window.confirm("Bạn có chắc muốn xóa không?");
        if (confirmDelete) {
            //this.setState(prevState => ({
            //    categories: prevState.categories.filter(category => category.categoryID !== categoryID),
            //    activeCategory: prevState.activeCategory === categoryID ? 0 : prevState.activeCategory
            //}));
            axios.delete(`https://localhost:44302/api/category/delete/${categoryID}`)
                .then(reponse => {
                    this.handleCategoryLoad();
                })
                .catch(error => {
                    this.handleCategoryLoad();
                    alert("Lỗi không thể kết nối được với API");
                });
        }

    };

    //Chỉnh sửa 1 category
    handleCategoryEdit = (event) => {
        var $this = window.$(event.currentTarget);
        var root = $this.closest("ul");
        root.find("a").removeClass("editable");
        var parent = $this.closest("a");
        parent.addClass("editable");
        var input = parent.find("input");
        input.focus().select();
    };

    //cập nhật lưu category
    handleCategoryUpdate = (event, catid) => {
        // Xử lý khi nhấn Enter
        if (event.keyCode === 13) {
            const updatedCategory = this.state.categories.find(category => category.categoryID === catid);
            axios.put("https://localhost:44302/api/category/put", updatedCategory)
                .then(response => {
                    this.handleCategoryLoad();
                })
                .catch(error => {
                    this.handleCategoryLoad();
                    alert("Lỗi không thể kết nối được với API");
                });
        }
        // Xử lý khi nhấn Esc
        else if (event.keyCode === 27) {
            this.handleCategoryLoad(); // Đảm bảo cập nhật lại dữ liệu
        }
    }

    //Hàm sử lý thao tác khi đang gõ tiêu đề mới thì nó sẽ cập nhật vào state 
    handleCategoryChange = (event, catid) => {
        const { categories } = this.state;
        const updatedCategories = categories.map(category => {
            if (category.categoryID === catid) {
                return { ...category, title: event.target.value };
            }
            return category;
        });

        this.setState({ categories: updatedCategories });
        //this.handleDoTaskLoad(catid);
        //this.handleDoneTaskLoad(catid);
    };

    //Hàm load category
    handleCategoryLoad = () => {
        axios.get("https://localhost:44302/api/category/get")
            .then((response) => {
                console.log(response.data);
                if (response.data && response.data.length > 0) {
                    let lastIndex = response.data.length - 1;
                    let categoryID = response.data[lastIndex].categoryID;
                    this.setState({
                        categories: response.data,
                        activeCategory: categoryID
                    });
                    //Rest trang thái editable
                    var root = window.$(".category-list");
                    root.find("a").removeClass("editable");

                    this.handleDoTaskLoad(categoryID);
                    this.handleDoneTaskLoad(categoryID);
                }
                else {
                    this.setState({
                        categories: [],
                        activeCategory: 0
                    });
                    alert("chưa có dữ liệu");
                }

            })
            .catch((error) => {
                this.setState({
                    categories: [],
                    activeCategory: 0
                });
                alert("Lỗi không thể kết nối được với API");
            });

    };

    //Hàm loadDoTask theo categoryID
    handleDoTaskLoad = (categoryID) => {
        this.setState({
            doTasks: []
        });
        axios.get(`https://localhost:44302/api/mytask/getbycate/${categoryID}/1`)
            .then(response => {
                if (response.data && response.data.length > 0) {
                    this.setState({
                        doTasks: response.data,
                    });
                }
            })
            .catch(error => {
                this.setState({
                    doTasks: []
                });
                alert("Lỗi không thể kết nối được với APIDoTask");
            });
    }

    //Hàm load danh sách done task
    handleDoneTaskLoad = (categoryID) => {
        this.setState({
            doneTasks: []
        });
        axios.get(`https://localhost:44302/api/mytask/getbycate/${categoryID}/2`)
            .then(response => {
                if (response.data && response.data.length > 0) {
                    this.setState({
                        doneTasks: response.data
                    });
                }
            })
            .catch(error => {
                this.setState({
                    doneTasks: []
                });
                alert("Lỗi không thể kết nối được với API");
            });
    }

    //Hàm thêm task vào DoTask
    handleTaskAdd = (title) => {

        const newTask = {
            myTaskID: 0,
            categoryID: this.state.activeCategory,
            myProgressID: 1,
            title: title,
            createTime: new Date(),
            category: null,
            myProgress: null,
            tasks: null
        };
        //this.setState(prevState => ({
        //    categories: [...prevState.categories, newCategory],
        //    activeCategory: newCategory.categoryID
        //}));
        axios.post("https://localhost:44302/api/mytask/post", newTask)
            .then(response => {
                this.handleDoTaskLoad(this.state.activeCategory);
            })
            .catch(error => {
                this.handleDoTaskLoad();
                alert("Lỗi không thể kết nối được với API");
            });
    };

    //Hàm xóa Task Do/Done
    handleTaskDelete = (myTaskID) => {
        const confirmDelete = window.confirm("Bạn có chắc muốn xóa không?");
        if (confirmDelete) {
            //this.setState(prevState => ({
            //    categories: prevState.categories.filter(category => category.categoryID !== categoryID),
            //    activeCategory: prevState.activeCategory === categoryID ? 0 : prevState.activeCategory
            //}));
            axios.delete(`https://localhost:44302/api/mytask/delete/${myTaskID}`)
                .then(reponse => {
                    this.handleDoTaskLoad(this.state.activeCategory);
                    this.handleDoneTaskLoad(this.state.activeCategory);
                })
                .catch(error => {
                    this.handleDoTaskLoad(this.state.activeCategory);
                    this.handleDoneTaskLoad(this.state.activeCategory);
                    alert("Lỗi không thể kết nối được với API để delete");
                });
        }

    };

    //Chỉnh sửa 1 TaskItem
    handleTaskEdit = (event) => {
        var $this = window.$(event.currentTarget);
        var root = $this.closest(".list-box");
        root.find(".item").removeClass("editable");
        var parent = $this.closest(".item");
        parent.addClass("editable");
        var input = parent.find("input");
        input.focus().select();
    };

    //cập nhật lưu DoItem
    handleDoItemUpdate = (event, taskid) => {
        // Xử lý khi nhấn Enter
        if (event.keyCode === 13) {
            const updatedDoItem = this.state.doTasks.find(doItem => doItem.myTaskID === taskid);
            axios.put("https://localhost:44302/api/mytask/put", updatedDoItem)
                .then(response => {
                    this.handleDoTaskLoad(this.state.activeCategory);
                })
                .catch(error => {
                    this.handleDoTaskLoad(this.state.activeCategory);
                    alert("Lỗi không thể kết nối được với API4");
                });
        }
        // Xử lý khi nhấn Esc
        else if (event.keyCode === 27) {
            this.handleDoTaskLoad(this.state.activeCategory); // Đảm bảo cập nhật lại dữ liệu
        }
    }

    //Hàm sử lý thao tác khi đang gõ tiêu đề mới thì nó sẽ cập nhật vào state của DoItem
    handleDoItemChange = (event, taskid) => {
        const { doTasks } = this.state;
        const updatedDoItem = doTasks.map(item => {
            if (item.myTaskID === taskid) {
                return { ...item, title: event.target.value };
            }
            return item;
        });

        this.setState({ doTasks: updatedDoItem });
    };

    //cập nhật lưu DoneItem
    handleDoneItemUpdate = (event, taskid) => {
        // Xử lý khi nhấn Enter
        if (event.keyCode === 13) {
            const updateDoneItem = this.state.doneTasks.find(doneItem => doneItem.myTaskID === taskid);
            axios.put("https://localhost:44302/api/mytask/put", updateDoneItem)
                .then(response => {
                    this.handleDoneTaskLoad(this.state.activeCategory);
                })
                .catch(error => {
                    this.handleDoneTaskLoad(this.state.activeCategory);
                    alert("Lỗi không thể kết nối được với API4");
                });
        }
        // Xử lý khi nhấn Esc
        else if (event.keyCode === 27) {
            this.handleDoneTaskLoad(this.state.activeCategory); // Đảm bảo cập nhật lại dữ liệu
        }
    }

    //Hàm sử lý thao tác khi đang gõ tiêu đề mới thì nó sẽ cập nhật vào state của DoneItem
    handleDoneItemChange = (event, taskid) => {
        const { doneTasks } = this.state;
        const updatedDoneItem = doneTasks.map(item => {
            if (item.myTaskID === taskid) {
                return { ...item, title: event.target.value };
            }
            return item;
        });

        this.setState({ doneTasks: updatedDoneItem });
    };

    //Hàm check của DoTask 
    handleCheckDoTask = (event) => {
        event.preventDefault();
        let $this = window.$(event.currentTarget);
        let item = $this.closest(".item");
        let doneTask = 2;
        let checkTargetDoTask = item.attr("data-taskid");
        axios.patch(`https://localhost:44302/api/mytask/update-progress-id/${checkTargetDoTask}/${doneTask}`)
            .then(response => {
                this.handleDoTaskLoad(this.state.activeCategory);
                this.handleDoneTaskLoad(this.state.activeCategory);
            })
            .catch(error => {
                this.handleDoTaskLoad(this.state.activeCategory);
                this.handleDoneTaskLoad(this.state.activeCategory);
                alert("Lỗi không thể kết nối được với API cập nhật thành doneTask");
            });
       
    };

    //Hàm check của DoTask 
    handleCheckDoneTask = (event) => {
        event.preventDefault();
        let $this = window.$(event.currentTarget);
        let item = $this.closest(".item");
        let doTask = 1;
        let checkTargetDoneTask = item.attr("data-taskid");
        axios.patch(`https://localhost:44302/api/mytask/update-progress-id/${checkTargetDoneTask}/${doTask}`)
            .then(response => {
                this.handleDoTaskLoad(this.state.activeCategory);
                this.handleDoneTaskLoad(this.state.activeCategory);
            })
            .catch(error => {
                this.handleDoTaskLoad(this.state.activeCategory);
                this.handleDoneTaskLoad(this.state.activeCategory);
                alert("Lỗi không thể kết nối được với API cập nhật thành doneTask");
            });

    };

    //Hàm componentDidMount tự động thực thi khi component này render xong
    componentDidMount() {
        this.handleCategoryLoad();
    }

    render() {
        //Opject Destructuring
        const { activeCategory, categories, doTasks, doneTasks } = this.state;
        return (
            <div className="todo-container">
                <div className="row">
                    <div className="col-lg-3 col-left">
                        <CategoryTask
                            activeCategory={activeCategory}
                            categories={categories}
                            handleCategoryActiveChange={(event, catid) => this.handleCategoryActiveChange(event, catid)}
                            handleCategoryAdd={this.handleCategoryAdd}
                            handleCategoryDelete={this.handleCategoryDelete}
                            handleCategoryEdit={this.handleCategoryEdit}
                            handleCategoryChange={this.handleCategoryChange}
                            handleCategoryUpdate={this.handleCategoryUpdate}

                        />
                    </div>
                    <div className="col-lg-9 col-right">
                        <BoxTask
                            handleTaskAdd={this.handleTaskAdd}
                            handleTaskDelete={this.handleTaskDelete}
                            handleTaskEdit={this.handleTaskEdit}
                            handleDoItemUpdate={this.handleDoItemUpdate}
                            handleDoItemChange={this.handleDoItemChange}
                            handleDoneItemUpdate={this.handleDoneItemUpdate}
                            handleDoneItemChange={this.handleDoneItemChange}
                            handleCheckDoTask={this.handleCheckDoTask}
                            handleCheckDoneTask={this.handleCheckDoneTask}
                            doTasks={doTasks}
                            doneTasks={doneTasks}
                        />

                    </div>
                    
                </div>
                
            </div>
        );
    }

}
export default App