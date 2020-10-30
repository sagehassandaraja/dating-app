using System.Collections.Generic;
using System.Linq;
using Data;
using DatingApp.API.Models;
using Newtonsoft.Json;

namespace DatingApp.API.Data
{
    public class Seed
    {
        public static void SeedUsers(DataContext context){
            if(!context.Users.Any())
            {
                var userData = System.IO.File.ReadAllText("Data/UserSeedData.json");
                //convert to obj
                var users = JsonConvert.DeserializeObject<List<User>>(userData);
                foreach (var user in users)
                {
                    byte[] passwordhash, passwordSalt;
                    createPasswordHash("admin",out passwordhash, out passwordSalt);
                    user.passWordHash = passwordhash;
                    user.passWordSalt = passwordSalt;
                    user.userName = user.userName.ToLower();
                    context.Users.Add(user);
                }
                context.SaveChanges();
            }
        }

        private static void createPasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512()){
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
            
        }
    }
}