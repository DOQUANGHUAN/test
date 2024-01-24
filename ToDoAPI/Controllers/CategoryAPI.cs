using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using ToDoAPI.Models;

namespace ToDoAPI.Controllers
{

    [Route("api/category")]
    [ApiController]
    public class CategoryAPI : ControllerBase
    {
        //Khai báo chuỗi kết nối TỚI DB
        private const string connectionString = "Data Source=.;Initial Catalog=MicrosoftToDo;Persist Security Info=True;User ID=sa;Password=123456";
        //kHAI BÁO 1 ĐÔI TƯỢNG SqlService ĐỂ LÀM VIỆC VỚI DB
        private SqlService sqlService = new SqlService(connectionString);
        [HttpGet("get")]
        public IEnumerable<Category> Get()
        {

            //KHAI BÁO 1 DataTable để chứa dữ liệu nhận được từ DB
            DataTable dataTable = new DataTable();
            //Khai báo 1 câu sql để truy vấn dữ liệu
            string sqlQuery = "Select * From Category";
            //khai báo 1 biến Exception để bắt lỗi (nếu có)
            Exception ex = null;

            //Thực thi câu sql, lấy dữ liệu từ DB đổ vào trong dataTable
            dataTable = sqlService.GetDataTable(sqlQuery, CommandType.Text, ref ex);
            //chuyển đổi DataTable thành dạng danh sách Category
            List<Category> categories = new List<Category>();
            foreach (DataRow row in dataTable.Rows)
            {
                Category item = new Category();
                item.CategoryID = Convert.ToInt32(row["CategoryID"]);
                item.Title = Convert.ToString(row["Title"]);
                item.CreateTime = Convert.ToDateTime(row["CreateTime"]);
                categories.Add(item);
            }
            return categories;
        }
        [HttpGet("get/{id}")]
        public Category Get(int id)
        {
          
            //KHAI BÁO 1 DataTable để chứa dữ liệu nhận được từ DB
            DataTable dataTable = new DataTable();
            //Khai báo 1 câu sql để truy vấn dữ liệu
            string sqlQuery = "Select * From Category where CategoryID = " + id;
            //khai báo 1 biến Exception để bắt lỗi (nếu có)
            Exception ex = null;

            //Thực thi câu sql, lấy dữ liệu từ DB đổ vào trong dataTable
            dataTable = sqlService.GetDataTable(sqlQuery, CommandType.Text, ref ex);
            //Kiểm tra dataTable, nếu dataTable = null hoặc rỗng thì trả về null
            if (dataTable == null || dataTable.Rows.Count == 0)
                return null;
            //lấy ra dòng đầu tiên trong bảng dòng thứ 0
            DataRow row = dataTable.Rows[0];
            //khai báo 1 item có kiểu Category để chưa dữ liệu trả về
            Category item = new Category();
            //Copy từng ô cột(row) trong category để add vào item category để tạo 1 category mới
            item.CategoryID = Convert.ToInt32(row["CategoryID"]);
            item.Title = Convert.ToString(row["Title"]);
            item.CreateTime = Convert.ToDateTime(row["CreateTime"]);
            return item;
        }
        [HttpPost("post")]
        public bool Post(Category item)
        {
            //Khai báo 1 câu sql để truy vấn dữ liệu
            string sqlQuery = "Insert Into Category(Title, CreateTime) Values(@Title, @CreateTime)";
            //Xóa những tham số đang có sẵn trong sql
            sqlService.ClearParameters();
            //Lần lượt thêm những than số sql cần đến
            sqlService.AddParameter("@Title", item.Title);
            sqlService.AddParameter("@CreateTime", item.CreateTime);
          
            try
            {
                //Thực thi sql đã bao gồm tham số chứa các giá trị
                sqlService.ExecuteQuery(sqlQuery, CommandType.Text, true, true);
                return true;
            }
            catch (Exception)
            {
                //Nếu thực thi mà có lỗi ngoại lệ thì trả về false
                return false;
            }
            
        }
        [HttpPut("put")]
        public bool Put(Category item)
        {
            //Khai báo 1 câu sql để truy vấn dữ liệu
            string sqlQuery = "Update Category Set Title=@Title, CreateTime=@CreateTime Where CategoryID=@CategoryID";
            //Xóa những tham số đang có sẵn trong sql
            sqlService.ClearParameters();
            //Lần lượt thêm những tham số sql cần đến
            sqlService.AddParameter("@Title", item.Title);
            sqlService.AddParameter("@CreateTime", item.CreateTime);
            sqlService.AddParameter("@CategoryID", item.CategoryID);

            try
            {
                //Thực thi sql đã bao gồm tham số chứa các giá trị
                sqlService.ExecuteQuery(sqlQuery, CommandType.Text, true, true);
                return true;
            }
            catch (Exception)
            {
                //Nếu thực thi mà có lỗi ngoại lệ thì trả về false
                return false;
            }
        }
        [HttpDelete("delete/{id}")]
        public bool Delete(int id)
        {
            //Khai báo 1 cau sql để delete dữ liệu bên MyTask
            string sqlSubQuery = "Delete From MyTask Where CategoryID =@CategoryID ";
            //Xóa những tham số đang có sẵn trong sql
            sqlService.ClearParameters();
            //Lần lượt thêm những tham số sql cần đến
            sqlService.AddParameter("@CategoryID", id);

            try
            {
                //Thực thi sql để xóa dữ liệu bên MyTask
                sqlService.ExecuteQuery(sqlSubQuery, CommandType.Text, true, true);
            }
            catch (Exception){}
            
            //Khai báo 1 cau sql để delete dữ liệu mới
            string sqlQuery = "Delete From Category Where CategoryID =@CategoryID ";
            //Xóa những tham số đang có sẵn trong sql
            sqlService.ClearParameters();
            //Lần lượt thêm những tham số sql cần đến
            sqlService.AddParameter("@CategoryID", id);

            try
            {
                //Thực thi sql đã bao gồm tham số chứa các giá trị
                sqlService.ExecuteQuery(sqlQuery, CommandType.Text, true, true);
                return true;
            }
            catch (Exception)
            {
                //Nếu thực thi mà có lỗi ngoại lệ thì trả về false
                return false;
            }
        }
    }
}
