using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace FlowerServerAgain.Models
{
    public class User : IdentityUser
    {
        [DataType(DataType.Date)]
        public DateTime Birthday { get; set; }
    }


}
