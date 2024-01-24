$(function () {
    let toDoContainer = $('.todo-container');
    let addBox = toDoContainer.find('.add-box');
    let listBoxDo = toDoContainer.find('.do-task .list-box');
    let listBoxDone = toDoContainer.find('.done-task .list-box');
    // 1 trong 2 cách  let inputAdd = toDoContainer.find('.input-add');
    let inputAdd = addBox.find('.input-add');
    let buttonAdd = addBox.find('.button-add');
    let buttonRemove = toDoContainer.find('fieldset .remove');

    //Khai báo các biến xử lý thêm category
    let categoryBox = toDoContainer.find(".category-box");
    let categoryList = categoryBox.find(".category-list");
    let categoryAdd = categoryBox.find(".category-add");
    let categoryInput = categoryAdd.find("input");
    let categoryButtonSave = categoryAdd.find(".btn-save-category");
    /////////////////////
    let loadCategory = function () {
        var options = {};
        options.url = "https://localhost:44302/api/category/get";
        options.type = "GET";
        options.dataType = "json";
        options.success = function (data) {
            // debugger;
            var categoryList = $(".todo-container .category-list");
            categoryList.empty(); // xóa dữ liệu html có sẵn trong category-list
            data.forEach(function (element) {
                var teamlate = `<li data-catid="${element.categoryID}">
                                <a class="title " href="#">
                                    <i class="fas fa-bars"></i>
                                    <label>${element.title}</label>
                                    <input type="text"  value="${element.title}" />
                                </a>
                                <span class="remove"><i class="fa-solid fa-trash"></i></span>
                            </li>`;

                categoryList.append(teamlate);

            });
        };
        options.error = function () {
            var categoryList = $(".todo-container .category-list");
            categoryList.empty();
            alert("Không thể kết nối đến API");
        };
        $.ajax(options);
    }

    let addCategory = function () {
        var obj = {};
        obj.categoryID = 0;
        obj.title = categoryInput.val();
        obj.createTime = new Date();
        obj.tasks = [];

        var options = {};
        options.url = "https://localhost:44302/api/category/post";
        options.type = "POST";
        options.data = JSON.stringify(obj);
        options.contentType = "application/json";
        options.dataType = "html";
        options.success = function (data) {
            //Loát lại danh sách category

            loadCategory();
            categoryInput.val("");
        };
        options.error = function () {
            alert("s");
        };
        $.ajax(options);

    };
    let toggleCheck = function (e) {
        let item = $(e).closest(".item");
        if (item.hasClass('active')) {
            item.toggleClass('active').detach().prependTo(listBoxDo);
        }
        else {
            item.toggleClass('active').detach().prependTo(listBoxDone);
        }
        debugger;
        //Gọi ajax để lưu trạng thái mới của task
        let itemID = item.attr("data-mytask-id");

        let itemStatus = 1;
        if (item.hasClass("active")) {
            itemStatus = 2;
        }
        var options = {};
        options.url = `https://localhost:44302/api/mytask/update-progress-id/${itemID}/${itemStatus}`;
        options.type = "PATCH";
        options.contentType = "application/json";
        options.dataType = "json";
        options.success = function (result) {
            if (result) {
                loadTask();
            }
            else {
                alert("false");
                loadTask();
            }

        };
        options.error = function (a, b, c) {
            alert("ko gọi được đến API");
            loadTask();
        };
        $.ajax(options);
    };

    let selectDefaultCategory = function () {
        listBoxDo.empty();
        listBoxDone.empty();
        //hẹn sau 3* thì thực thi lệnh    
        setTimeout(function () {
            //Chọn mặc định 1 category có trong danh sách
            //categoryList.find(".title:first-child").click();
            categoryList.find(".title").eq(0).click();
        }, 3000);
    }//Chọn 1 category đầu tiên trong danh sách khi load trang
    //Thiết lập màn hình task mặc định khi mở trang load trang
    let setNewTaskStatus = function () {
        //Xóa trắng danh sách
        listBoxDo.empty();
        listBoxDone.empty();
    }
    buttonAdd.click(function () {
        addTask();
    });
    inputAdd.keyup(function (event) {
        if (event.which == 13) {
            addTask();
        }

    });

    toDoContainer.on("click", ".col-right .item .custome-check", function () {
        toggleCheck($(this));
    });//Đăng ký nút check do thành done task hoặc ngược lại

    toDoContainer.on("dblclick", ".col-right .item .title", function myfunction() {
        var $this = $(this);
        var root = $this.closest(".col-right");
        root.find(".item").removeClass("editable");
        var parent = $this.closest(".item").addClass("editable");
        var input = parent.find("input[type=text]");
        input.focus().select();

    })//Chỉnh sửa nội dung task
    toDoContainer.on("keyup", ".item > input", function (event) {
        if (event.which == 13) {
            let $this = $(this);
            let item = $this.closest(".item");
            let myTaskID = item.attr("data-mytask-id");
            let title = $this.val();
            let catID = categoryList.find(".title.active").closest("li").attr("data-catid");
            if (!catID || catID <= 0) {
                alert("vui lòng chọn 1 danh mục bên cột trái trước khi thêm 1 công việc");
                return;
            }
            let progressID = $this.closest("fieldset").find(".do-task").length == 1 ? 1 : 2; // length trong trường hợp này dc hiểu 
            //là nếu mà có, vì do-task có id là 1 nên == 1, ? có nghĩa là thì lấy id = 1, : có nghĩa là nếu ko phải thì lấy id = 2 thành done-task
            var obj = {};
            obj.myTaskID = parseInt(myTaskID);
            obj.title = title;
            obj.categoryID = parseInt(catID);
            obj.myProgressID = progressID;
            obj.createTime = new Date();
            obj.Category = null;
            obj.MyProgress = null;
            obj.tasks = [];
            var options = {};
            options.url = "https://localhost:44302/api/mytask/put";
            options.type = "PUT";
            options.data = JSON.stringify(obj);
            options.contentType = "application/json";
            options.dataType = "json";
            options.success = function (result) {
                if (result) {
                    loadTask();
                }
                else {
                    alert("false");
                    loadTask();
                }

            };
            options.error = function (a, b, c) {
                alert("ko gọi được đến API");
                loadTask();
            };
            $.ajax(options);
        }
        else if (event.which == 27) {
            let $this = $(this);
            let parent = $this.closest(".item");
            let label = parent.find("title");
            $this.val(label.html());
            parent.removeClass("editable");
        }
    });//Đăng ký sự kiện bàn phím khi enter trên input mytask
    toDoContainer.on("click", ".col-right .item .remove", function () {
        removeTask(this);
    }); //Nút xóa item task bên col-right


    categoryList.on("click", ".remove", function () {
        //Xác nhận lại nhu cầu cần xóa thông qua 1 câu hỏi
        if (confirm("Bạn có chắc muốn xoa danh sách này ko")) {
            let $this = $(this);
            let catid = $this.closest("li").attr("data-catid");
            // alert(`Bạn muốn xóa ${catid} không?`); // phải dùng dấu huyền đơn
            var options = {};
            options.url = "https://localhost:44302/api/category/delete/ " + catid;
            options.type = "DELETE";
            options.dataType = "json";
            options.success = function (result) {
                /* $this.closest("li").empty();*/
                if (result) {
                    loadCategory();
                }
            };
            options.error = function () {
                alert("Xóa không thành công");

            };
            $.ajax(options);
        }

    }); //Nút xóa category

    categoryList.on("dblclick", ".title label", function () {
        var $this = $(this);
        var root = $this.closest("ul");
        root.find("a").removeClass("editable");
        var parent = $this.closest(".title").addClass("editable");
        var input = parent.find("input");
        input.focus().select();

    }); //Nút chỉnh sửa cagegory


    categoryList.on("keyup", ".title input", function (event) {
        if (event.which == 13) {
            let $this = $(this);
            let li = $this.closest("li");
            let catid = li.attr("data-catid");
            let title = $this.val();
            var obj = {};
            obj.categoryID = catid;
            obj.title = title;
            obj.createTime = new Date();
            obj.tasks = [];
            var options = {};
            options.url = "https://localhost:44302/api/category/put";
            options.type = "PUT";
            options.data = JSON.stringify(obj);
            options.contentType = "application/json";
            options.dataType = "json";
            options.success = function (result) {
                if (result) {
                    loadCategory();
                }
                else {
                    alert("false");
                    loadCategory();
                }

            };
            options.error = function (a, b, c) {
                alert("ko gọi được đến API");
                loadCategory();
            };
            $.ajax(options);
        }
        else if (event.which == 27) {
            let $this = $(this);
            let parent = $this.closest(".title");
            let label = parent.find("label");
            $this.val(label.html());
            parent.removeClass("editable");
        }
    }) //Đăng ký sk gõ phím input category

    categoryInput.keyup(function (event) {
        if (event.which == 13) {
            addCategory();
        }
    });//Lập trình thêm category
    categoryButtonSave.click(function () {
        addCategory();
    });//Thêm danh sách công việc category

    let loadTask = function () {
        let catid = categoryList.find(".title.active").closest("li").attr("data-catid");
        //báo lỗi nếu ko có catid
        if (!catid || catid < 1) {
            alert("aa");
            return;
        }
        //load danh sách dotask
        var doOptions = {};
        doOptions.url = `https://localhost:44302/api/mytask/getbycate/${catid}/1`;
        doOptions.type = "GET";
        doOptions.dataType = "json";
        doOptions.success = function (data) {
            console.table(data);
            //Xóa danh sách do Task đang có
            listBoxDo.empty();
            //Dùng vòng lặp để đổ render(dữ liệu) ra danh sách cho do task
            data.forEach(function (item, index) {// index là số thứ tự bắt đầu từ 1 nhìn bằng mắt thay vì số thứ tự bắt đầu từ 0 của item trong 1 mảng  
                let template = `<div class="item " data-mytask-id="${item.myTaskID}">
                                <a class="custome-check ">
                                    <i class="fa-sharp fa-solid fa-check check-icon"></i>
                                    <i class="uncheck-icon"></i>
                                    <input type="checkbox" />
                                </a>
                                <label class="title">${item.title}</label>
                                <input type="text" value="${item.title}"/>
                                <a class="remove" href="#">
                                    <i class="fa-solid fa-trash"></i>
                                </a>
                            </div>`;
                listBoxDo.append(template);
            });
        };
        doOptions.error = function () {
            // var categoryList = $(".todo-container .category-list");
            //categoryList.empty();
            alert("Không thể kết nối đến API");
        };
        $.ajax(doOptions);
        //Load danh sách donetask
        var doneOptions = {};
        doneOptions.url = `https://localhost:44302/api/mytask/getbycate/${catid}/2`;
        doneOptions.type = "GET";
        doneOptions.dataType = "json";
        doneOptions.success = function (data) {
            console.table(data);
            //Xóa danh sách done Task đang có
            listBoxDone.empty();
            //Dùng vòng lặp để đổ render(dữ liệu) ra danh sách cho do task
            data.forEach(function (item, index) {// index là số thứ tự bắt đầu từ 1 nhìn bằng mắt thay vì số thứ tự bắt đầu từ 0 của item trong 1 mảng  
                let template = `<div class="item active" data-mytask-id="${item.myTaskID}">
                                <a class="custome-check ">
                                    <i class="fa-sharp fa-solid fa-check check-icon"></i>
                                    <i class="uncheck-icon"></i>
                                    <input type="checkbox" />
                                </a>
                                <label class="title">${item.title}</label>
                                <input type="text" value="${item.title}"/>
                                <a class="remove" href="#">
                                    <i class="fa-solid fa-trash"></i>
                                </a>
                            </div>`;
                listBoxDone.append(template);
            });
        };
        doneOptions.error = function () {
            // var categoryList = $(".todo-container .category-list");
            //categoryList.empty();
            alert("Không thể kết nối đến API");
        };
        $.ajax(doneOptions);
    }// lấy dữ liệu MyTask

    let addTaskWithTitleAndCat = function (title, catID) {
        // listBox.prepend(`<div>${val}</div>`);
        inputAdd.val('');
        inputAdd.focus();
        //Gọi API để thêm myTask
        var obj = {};
        obj.myTaskID = 0;
        obj.title = title;
        obj.categoryID = parseInt(catID);
        obj.myProgressID = 1;
        obj.createTime = new Date();
        obj.Category = null;
        obj.MyProgress = null;
        obj.tasks = [];
        var options = {};
        options.url = "https://localhost:44302/api/mytask/post";
        options.type = "POST";
        options.data = JSON.stringify(obj);
        options.contentType = "application/json";
        options.dataType = "json";
        options.success = function (result) {
            if (result) {
                loadTask();
            }
            else {
                alert("false");
                loadTask();
            }

        };
        options.error = function (error, b, c) {
            alert("ko gọi được đến API");
            loadTask();
        };
        $.ajax(options);
    }

    let addTask = function () {
        let val = inputAdd.val().trim(); // .trim = xóa khoảng trắng và bấm dấu space "dấu cách" tạo khoảng trắng enter ko lên

        if (val == '') {
            alert("chưa nhập nd");
            return;
        }
        let catID = categoryList.find(".title.active").closest("li").attr("data-catid");
        //Nếu chưa có thì thêm task
        if (!catID || catID <= 0) {
            //Nếu chưa chọn 1 cate thì tạo 1 cate mới
            var obj = {};
            obj.categoryID = 0;
            obj.title = "New title";
            obj.createTime = new Date();
            obj.tasks = [];

            var options = {};
            options.url = "https://localhost:44302/api/category/post";
            options.type = "POST";
            options.data = JSON.stringify(obj);
            options.contentType = "application/json";
            options.dataType = "html";
            options.success = function (data) {
                //Load lại danh sách category

                loadCategory();
                categoryInput.val("");
                //Chọn new cat vừa tạo
                setTimeout(function () {
                    categoryList.find(".title").last().click();
                    catID = categoryList.find(".title").last().closest("li").attr("data-catid");
                    //Thêm task vào danh sách của cate này
                    addTaskWithTitleAndCat(val, catID);
                }, 1000);

            };
            options.error = function () {
                alert("lỗi");
            };
            $.ajax(options);
            return;
        }
        //Nếu category có sẵn thì thêm task
        addTaskWithTitleAndCat(val, catID);


    }//Thêm task cho do task

    let removeTask = function (e) {
        let result = confirm("có chắc muốn xóa ko>");
        let item = $(e).closest('.item');
        if (result) { // (result) giống (result == true) ko ghi == true thì sẽ mặc định true
            item.slideUp(1000, function () { // thêm hàm function để chạy theo thứ tự thay vì chạy cùng 1 lúc nếu viết . liên tục trong 1 lệnh
                item.remove();
                //Gọi ajax để lên API xóa
                if (confirm) {
                    let itemID = item.attr("data-mytask-id");
                    // alert(`Bạn muốn xóa ${catid} không?`); // phải dùng dấu huyền đơn
                    var options = {};
                    options.url = `https://localhost:44302/api/mytask/delete/${itemID}`;
                    options.type = "DELETE";
                    options.dataType = "json";
                    options.success = function (result) {
                        if (result) {
                            loadTask();
                        }
                    };
                    options.error = function () {
                        alert("Xóa không thành công");

                    };
                    $.ajax(options);
                }
            });
        }
        else {
            //thêm (ruturn;) vẫn vậy
        }


    }

    categoryList.on("click", ".title ", function () {

        var $this = $(this);
        var root = $this.closest("ul");
        root.find("a").removeClass("active");
        $this.addClass("active");
        loadTask();
    }); //Đăng ký sự kiện click cho a.title
    //Thực thi các hàm cần thiết khi load trang
    loadCategory();
    setNewTaskStatus();
});