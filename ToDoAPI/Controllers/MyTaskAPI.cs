using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Security.Cryptography;
using ToDoAPI.Models;

namespace ToDoAPI.Controllers
{
    [Route("api/mytask")]
    [ApiController]
    public class MyTaskAPI : ControllerBase
    {
        //Khai báo chuỗi kết nối TỚI DB
        private const string connectionString = "Data Source=.;Initial Catalog=MicrosoftToDo;Persist Security Info=True;User ID=sa;Password=123456";
        //kHAI BÁO 1 ĐÔI TƯỢNG SqlService ĐỂ LÀM VIỆC VỚI DB
        private SqlService sqlService = new SqlService(connectionString);
        [HttpGet("get")]
        public IEnumerable<MyTask> Get()
        {


            DataTable dataTable = new DataTable();
            String sqlQuery = "Select * From MyTask";
            Exception ex = null;
            dataTable = sqlService.GetDataTable(sqlQuery, CommandType.Text, ref ex);
            List<MyTask> MyTaskes = new List<MyTask>();
            foreach (DataRow row in dataTable.Rows)
            {
                MyTask item = new MyTask();
                item.MyTaskID = Convert.ToInt32(row["MyTaskID"]);
                item.Title = Convert.ToString(row["Title"]);
                item.CategoryID = Convert.ToInt32(row["CategoryID"]);
                item.MyProgressID = Convert.ToInt32(row["MyProgressID"]);
                item.CreateTime = Convert.ToDateTime(row["CreateTime"]);

                MyTaskes.Add(item);
            }
            return MyTaskes;
        }

        [HttpGet("get/{id}")]
        public MyTask Get(int id)
        {
            DataTable dataTable = new DataTable();
            String sqlQuery = "Select * From MyTask where MyTaskID = " + id;
            Exception ex = null;
            dataTable = sqlService.GetDataTable(sqlQuery, CommandType.Text, ref ex);
            if (dataTable == null || dataTable.Rows.Count == 0)
                return null;
            DataRow row = dataTable.Rows[0];
            MyTask item = new MyTask();
            item.MyTaskID = Convert.ToInt32(row["MyTaskID"]);
            item.Title = Convert.ToString(row["Title"]);
            item.CategoryID = Convert.ToInt32(row["CategoryID"]);
            item.MyProgressID = Convert.ToInt32(row["MyProgressID"]);
            item.CreateTime = Convert.ToDateTime(row["CreateTime"]);

            return item;
        }

        [HttpGet("getbycate/{catid}/{pid}")]
        public IEnumerable<MyTask> GetByCate(int catid, int pid)
        {


            DataTable dataTable = new DataTable();
            String sqlQuery = "Select * From MyTask Where CategoryID =@CategoryID And MyProgressID =@MyProgressID";
            //Xóa những tham số đang có sẵn trong sql
            sqlService.ClearParameters();
            //Lần lượt thêm những than số sql cần đến
            sqlService.AddParameter("@CategoryID", catid);
            sqlService.AddParameter("@MyProgressID", pid);

            Exception ex = null;
            dataTable = sqlService.GetDataTable(sqlQuery, CommandType.Text, ref ex);
            List<MyTask> MyTaskes = new List<MyTask>();
            foreach (DataRow row in dataTable.Rows)
            {
                MyTask item = new MyTask();
                item.MyTaskID = Convert.ToInt32(row["MyTaskID"]);
                item.Title = Convert.ToString(row["Title"]);
                item.CategoryID = Convert.ToInt32(row["CategoryID"]);
                item.MyProgressID = Convert.ToInt32(row["MyProgressID"]);
                item.CreateTime = Convert.ToDateTime(row["CreateTime"]);

                MyTaskes.Add(item);
            }
            return MyTaskes;
        }

        [HttpPost("post")]
        public bool Post(MyTask item)
        {
            //Khai báo 1 câu sql để truy vấn dữ liệu
            string sqlQuery = "Insert Into MyTask(Title, CategoryID, MyProgressID, CreateTime) Values(@Title, @CategoryID, @MyProgressID, @CreateTime)";
            //Xóa những tham số đang có sẵn trong sql
            sqlService.ClearParameters();
            //Lần lượt thêm những than số sql cần đến
            sqlService.AddParameter("@Title", item.Title);
            sqlService.AddParameter("@CategoryID", item.CategoryID);
            sqlService.AddParameter("@MyProgressID", item.MyProgressID);
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
        public bool Put(MyTask item)
        {
            //Khai báo 1 câu sql để truy vấn dữ liệu
            string sqlQuery = "Update MyTask Set Title=@Title, CategoryID=@CategoryID, MyProgressID=@MyProgressID, CreateTime=@CreateTime Where MyTaskID=@MyTaskID";
            //Xóa những tham số đang có sẵn trong sql
            sqlService.ClearParameters();
            //Lần lượt thêm những tham số sql cần đến
            sqlService.AddParameter("@Title", item.Title);
            sqlService.AddParameter("@CategoryID", item.CategoryID);
            sqlService.AddParameter("@MyProgressID", item.MyProgressID);
            sqlService.AddParameter("@CreateTime", item.CreateTime);
            sqlService.AddParameter("@MyTaskID", item.MyTaskID);

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

        [HttpPatch("update-progress-id/{id}/{pid}")]
        public bool UpdateProgressId(int id, int pid)
        {
            //Khai báo 1 câu sql để truy vấn dữ liệu
            string sqlQuery = "Update MyTask Set MyProgressID=@MyProgressID Where MyTaskID=@MyTaskID";
            //Xóa những tham số đang có sẵn trong sql
            sqlService.ClearParameters();
            //Lần lượt thêm những tham số sql cần đến
            sqlService.AddParameter("@MyProgressID", pid);
            sqlService.AddParameter("@MyTaskID", id);

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
            string sqlQuery = "Delete From MyTask Where MyTaskID =@MyTaskID ";
            //Xóa những tham số đang có sẵn trong sql
            sqlService.ClearParameters();
            //Lần lượt thêm những tham số sql cần đến
            sqlService.AddParameter("@MyTaskID", id);

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
