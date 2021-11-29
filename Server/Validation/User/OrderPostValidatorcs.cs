using FluentValidation;
using Server.Models;

namespace Server.Validation {
    public class OrderPostValidator : AbstractValidator<OrderPostModel> {
        public OrderPostValidator() {
            RuleFor(b => b.Date)
                .NotEmpty().WithMessage("Date is required!");
            RuleFor(b => b.UserId)
                .NotEmpty().WithMessage("User id is required!");
            RuleFor(b => b.BurgersIds)
                .NotNull().WithMessage("Burger ids are required!")
                .NotEmpty().WithMessage("At least 1 burger!");
        }
    }
}