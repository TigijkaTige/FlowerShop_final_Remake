using System.ComponentModel.DataAnnotations;

namespace FlowerServerAgain.ViewModels
{
    public class RegisterViewModel
    {
        //[Required]
        //[Display(Name = "UserName")]
        public string UserName { get; set; }

        [Required]
        //[Display(Name = "Email")]
        public string Email { get; set; }

        [Required]
        //[Display(Name = "PhoneNumber")]
        public string PhoneNumber { get; set; }

        [Required]
        [DataType(DataType.Date)]
        //[Display(Name = "Год рождения")]
        public DateTime Birthday { get; set; }

        [Required]
        [DataType(DataType.Password)]
        //[Display(Name = "Пароль")]
        public string Password { get; set; }
        //[Required]
        //[DataType(DataType.Password)]
        ////[Compare("Password", ErrorMessage = "Пароли не совпадают")]
      
        ////[Display(Name = "Подтвердить пароль")]
        //public string PasswordConfirm { get; set; }
    }
}
