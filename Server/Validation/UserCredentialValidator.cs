using FluentValidation;
using Server.Models;

namespace Server.Validation {
    public class UserCredentialValidator: AbstractValidator<UserCredentials> {
        public UserCredentialValidator() {
            RuleFor(u => u.Name)
                .NotEmpty().WithMessage("Name is required!")
                .MinimumLength(2).WithMessage("At least two characters!");
            RuleFor(u => u.Password)
                .NotEmpty().WithMessage("Password is required!")
                .MinimumLength(8).WithMessage("At least eight characters!")
                .Matches("(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])")
                    .WithMessage("At least one uppercase letter, one lovercase letter and one digit");
        }
    }
}
