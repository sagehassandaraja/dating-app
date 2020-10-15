namespace DatingApp.API.Models
{
    public class User
    {
        public int ID { get; set; }
        public string userName { get; set; }
        public byte[] passWordHash { get; set; }
        public byte[] passWordSalt { get; set; }
    }
}