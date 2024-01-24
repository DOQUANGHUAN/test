using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using ToDoAPI.Models;

namespace ToDoAPI.Controllers
{
    [Route("api/myprogress")]
    [ApiController]
    public class MyProgressAPI : ControllerBase
    {
        //Khai báo chuỗi kết nối TỚI DB
        private const string connectionString = "Data Source=.;Initial Catalog=MicrosoftToDo;Persist Security Info=True;User ID=sa;Password=123456";
        //kHAI BÁO 1 ĐÔI TƯỢNG SqlService ĐỂ LÀM VIỆC VỚI DB
        private SqlService sqlService = new SqlService(connectionString);
        [HttpGet("get")]
        public IEnumerable<MyProgress> Get()
        {

            DataTable dataTable = new DataTable();
            String sqlQuery = "Select * From MyProgress";
            Exception ex = null;
            dataTable = sqlService.GetDataTable(sqlQuery, CommandType.Text, ref ex);
            List<MyProgress> myProgresses = new List<MyProgress>();
            foreach (DataRow row in dataTable.Rows)
            {
                MyProgress item = new MyProgress();
                item.MyProgressID = Convert.ToInt32(row["MyProgressID"]);
                item.Title = Convert.ToString(row["Title"]);
                item.Position = Convert.ToInt32(row["Position"]);
                myProgresses.Add(item);
            }
            return myProgresses;
        }
        [HttpGet("get/{id}")]
        public MyProgress Get(int id)
        {

            DataTable dataTable = new DataTable();
            String sqlQuery = "Select * From MyProgress where MyProgressID = " + id;
            Exception ex = null;
            dataTable = sqlService.GetDataTable(sqlQuery, CommandType.Text, ref ex);
            if (dataTable == null || dataTable.Rows.Count == 0)
                return null;
            DataRow row = dataTable.Rows[0];
            MyProgress item = new MyProgress();
            item.MyProgressID = Convert.ToInt32(row["MyProgressID"]);
            item.Title = Convert.ToString(row["Title"]);
            item.Position = Convert.ToInt32(row["Position"]);
            return item;
        }
        [HttpPost("post")]
        public bool Post(MyProgress item)
        {
            //Khai báo 1 câu sql để truy vấn dữ liệu
            string sqlQuery = "Insert Into MyProgress(Title, Position) Values(@Title, @Position)";
            //Xóa những tham số đang có sẵn trong sql
            sqlService.ClearParameters();
            //Lần lượt thêm những than số sql cần đến
            sqlService.AddParameter("@Title", item.Title);
            sqlService.AddParameter("@Position", item.Position);

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
        public bool Put(MyProgress item)
        {
            //Khai báo 1 câu sql để truy vấn dữ liệu
            string sqlQuery = "Update MyProgress Set Title=@Title, Position=@Position Where MyProgressID=@MyProgressID";
            //Xóa những tham số đang có sẵn trong sql
            sqlService.ClearParameters();
            //Lần lượt thêm những tham số sql cần đến
            sqlService.AddParameter("@Title", item.Title);
            sqlService.AddParameter("@Position", item.Position);
            sqlService.AddParameter("@MyProgressID", item.MyProgressID);

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
            //Khai báo 1 câu sql để truy vấn dữ liệu
            string sqlQuery = "Delete From MyProgress Where MyProgressID = @MyProgressID ";
            //Xóa những tham số đang có sẵn trong sql
            sqlService.ClearParameters();
            //Lần lượt thêm những tham số sql cần đến
            sqlService.AddParameter("@MyProgressID", id);

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
