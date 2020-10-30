using System;
using System.Collections.Generic;

namespace DatingApp.API.Models
{
    public class User
    {
        public int ID { get; set; }
        public string userName { get; set; }
        public byte[] passWordHash { get; set; }
        public byte[] passWordSalt { get; set; }
        public string Gender { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string KnownAs { get; set; }
        public DateTime Created { get; set; }
        public DateTime LastActive { get; set; }
        public string Introduction { get; set; }
        public string LookingFor { get; set; }
        public string Interest { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public ICollection<Photo> Photos { get; set; }
    }
}