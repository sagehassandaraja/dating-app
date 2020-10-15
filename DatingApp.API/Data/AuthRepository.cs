using System;
using System.Threading.Tasks;
using Data;
using DatingApp.API.Models;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.API.Data
{
    public class AuthRepository : IAuthRepository
    {
        private readonly DataContext _context;
        public AuthRepository(DataContext context)
        {
            _context = context;

        }
        public async Task<User> login(string userName, string passWord)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x => x.userName == userName);

            if (user == null)
                return null;

            if (!verifyPasswordHash(passWord, user.passWordHash, user.passWordSalt))
                return null;
            return user;
        }

        private bool verifyPasswordHash(string passWord, byte[] passWordHash, byte[] passWordSalt)
        {
            using ( var hmac = new System.Security.Cryptography.HMACSHA512(passWordSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(passWord));
                for(int i = 0; i < computedHash.Length; i++)
                {
                    if(computedHash[i] != passWordHash[i])
                        return false;
                }
            }
            return true;
        }

        public async Task<User> register(User _user, string password)
        {
            byte[] passwordHash, passwordSalt;
            // The 'out' keyword means we are passing references not values
            createPasswordHash(password,out passwordHash,out passwordSalt);

            _user.passWordHash = passwordHash;
            _user.passWordSalt = passwordSalt;

            await _context.Users.AddAsync(_user);
            await _context.SaveChangesAsync();

            return _user;
        }

        private void createPasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512()){
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
            
        }

        public async Task<bool> userExists(string _userName)
        {
            if(await _context.Users.AnyAsync(x => x.userName == _userName))
                return true;
            return false;
        }
    }
}