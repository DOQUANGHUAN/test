namespace ToDoAPI.Models
{
    public class MyTask
    {
        public int MyTaskID { get; set; }
        public string Title { get; set; }
        public int CategoryID { get; set; }
        public int MyProgressID { get; set; }
        public DateTime CreateTime { get; set; }
        public Category? Category { get; set; }
        public MyProgress? MyProgress { get; set; }



    }
}
