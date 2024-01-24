function baiSo1() {
    //Khai báo 1 mảng - Array
    const numList = [1, 2, 7, 4, 3, 5, 7, 7];
    //in mảng nuList 
    console.log('mảng đã nhập là:');
    console.log(numList);

    //chạy vòng lặp từ 0->N-1 để kiểm tra và in ra
    for (var i = 0; i < numList.length; i++) {
        if (numList[i] > 5) {
            console.log('Phần tử có giá trị lớn hơn 5: ');
            console.log(numList[i]);
        }
    }
    //kiểm tra vị trí của phần tử có giá trị là 7
    for (var i = 0; i < numList.length; i++) {
        if (numList[i] == 7) {
            console.log('Phần tử cóa giá trị bằng 7 có vị trí là:');
            console.log(i); // i = vị trí (index) của giá trị cần tìm

        }
    }

    //sắp xếp mảng numList tăng dần
    numList.sort(function (a, b) {
        return a - b;
    });
    console.log('mảng numList đã sắp xếp tăng dần');
    console.log(numList);

    //xóa phần tử có giá trị 3 ra khỏi mảng
    var newArray = numList.filter(function (a) {
        return a != 3;
    });
    console.log('Mảng đã loại các phần tử có giá trị bằng 3:');
    console.log(newArray);

};
function baiSo2() {
    //Tạo 1 mảng json
    const devMember = [
        { Name: 'Người A', Email: "A.gmail.com" },
        { Name: 'Người B', Email: "B.gmail.com" },
    ]
    console.log('Mảng devMember là');
    console.log(devMember);
    //Tạo 1 đối tượng mới
    const newMember = { Name: 'Người C', Email: "C.gmail.com" };
    devMember.push(newMember);
    console.log('Mảng sau khi thêm newMember');
    console.log(devMember);
}
function baiSo3() {
    //Tạo 1 mảng json
    const devMember = [
        { Name: 'Người A', Email: "A.gmail.com" },
        { Name: 'Người B', Email: "B.gmail.com" },
    ]
    //Thêm phần tủ Age = 27 vào phần tử đầu tiên
    devMember[0].Age = 27;
    console.log('Mảng sau khi thêm Age = 27');
    console.log(devMember);
    //Tạo 1 object mới
    const newMember = { Company: 'Oryza JSC' };
    //Thêm vào đầu mảng devMember
    devMember.unshift(newMember);
    console.log('Mảng sau khi thêm Oryza JSC');
    console.log(devMember);
}
function baiSo4() {
    // Biến chứa tổng các giá trị thập phân
    let tongGiaTriThapPhan;
    // Bien là hằng số chứa đường dẫn api 
    const url = 'http://localhost:3000';
    //-Biến chứa mảng tên thành viên trong nhóm : Thông, Hải, Phần, Linh, Lâm
    const fullNameList = ['Thông', 'Hải', 'Phần', 'Linh', 'Lâm']
    //-Biến chứa giá trị phân biệt có phải là lập trình viên hay không.
    let isDev = true;
}
function isEmailOrMobileNumber(value) {
    const regexEmailOrMobileNumber = /^(?:\d{10}|\w+@\w+\.\w{2,3})$/;
    return regexEmailOrMobileNumber.test(value);

}
function isPasswordStrong(value) {
    const regexIsPasswordStrong = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!]).{6,}$/;
    return regexIsPasswordStrong.test(value);

}
function baiSo6() {
    console.log('Bài số 6: test regex');

    console.log('Kiểm tra 0979876678 là số đt: ');
    console.log(isEmailOrMobileNumber('0979876678'));

    console.log('Kiểm tra 0979ABC678 là số đt: ');
    console.log(isEmailOrMobileNumber('0979ABC678'));

    console.log('Kiểm tra demo@gmail.com là email: ');
    console.log(isEmailOrMobileNumber('demo@gmail.com'));

    console.log('Kiểm tra de@mo@gmail.com là email: ');
    console.log(isEmailOrMobileNumber('de@mo@gmail.com'));

    console.log('Kiểm tra Aa@abc là 1 mật khẩu mạnh');
    console.log(isPasswordStrong('Aa@abc'));

    console.log('Kiểm tra Aa@abc123 là 1 mật khẩu mạnh');
    console.log(isPasswordStrong('Aa@abc123'));

    console.log('Kiểm tra abc là 1 mật khẩu mạnh');
    console.log(isPasswordStrong('abc'));

    console.log('Kiểm tra abcabc là 1 mật khẩu mạnh');
    console.log(isPasswordStrong('abcabc'));
}
//Làm sạch console
console.clear();

//gọi hàm để thực thi
baiSo1();
baiSo2();
baiSo3();
baiSo4();
baiSo6();