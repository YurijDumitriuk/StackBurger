using FluentValidation;
using Server.Models;

namespace Server.Validation {
    public class UserValidator: AbstractValidator<User> {
        public UserValidator() {
            RuleFor(u => u.Name)
                .NotEmpty().WithMessage("Name is required!")
                .MinimumLength(2).WithMessage("At least two characters!");
            RuleFor(u => u.Password)
                .NotEmpty().WithMessage("Password is required!")
                .MinimumLength(8).WithMessage("At least eight characters!")
                .Matches("(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])")
                    .WithMessage("At least one uppercase letter, one lovercase letter and one digit");
            RuleFor(u => u.Phone)
                .NotEmpty().WithMessage("Phone is required!")
                .Matches("^\\(?\\d{3}\\)?-? *\\d{3}-? *-?\\d{4}$")
                    .WithMessage("Phone is not in the correct format!");
            RuleFor(u => u.Address)
                .Matches("^[A-Za-z0-9]+(?:\\s[A-Za-z0-9'_-]+)+$")
                    .WithMessage("Address is not in the correct format!")
                    .When(u => u.Address != string.Empty);                    
        }
    }
}
