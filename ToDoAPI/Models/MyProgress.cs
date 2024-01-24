namespace ToDoAPI.Models
{
    public class MyProgress
    {
        public int MyProgressID { get; set; }

        public string Title { get; set; }

        public int Position { get; set; }

        public List<MyTask> Tasks { get; set; }
    }
}
