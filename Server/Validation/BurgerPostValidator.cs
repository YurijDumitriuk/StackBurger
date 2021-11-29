using FluentValidation;
using Server.Models;

namespace Server.Validation {
    public class BurgerPostValidator: AbstractValidator<BurgerPostModel> {
        public BurgerPostValidator() {
            RuleFor(b => b.Name)
                .NotEmpty().WithMessage("Name is required!");
            RuleFor(b => b.UserId)
                .NotEmpty().WithMessage("User id is required!");
            RuleFor(b => b.ComponentsIds)
                .NotNull().WithMessage("Components ids are required!")
                .Must(ids => ids.Count >= 3).WithMessage("At least 3 components!");                          
        }
    }
}
