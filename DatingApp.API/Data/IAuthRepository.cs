using System.Threading.Tasks;
using DatingApp.API.Models;

namespace DatingApp.API.Data
{
    public interface IAuthRepository
    {
        Task<User> register(User user, string passWord); 
        Task<User> login(string userName, string passWord); 
        Task<bool> userExists(string userName); 
    }
}