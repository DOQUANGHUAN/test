namespace ToDoAPI.Models
{
    public class Category
    {
        public int CategoryID { get; set; }

        public string Title { get; set; }

        public DateTime CreateTime { get; set; }

        public List <MyTask>? Tasks { get; set; }
    }
}
