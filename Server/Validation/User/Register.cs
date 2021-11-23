using FluentValidation;
using Server.Models;

namespace Server.Validation {
    public class UserRegisterValidator: AbstractValidator<UserRegisterModel> {
        public UserRegisterValidator() {
            Include(new UserLoginValidator());
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
