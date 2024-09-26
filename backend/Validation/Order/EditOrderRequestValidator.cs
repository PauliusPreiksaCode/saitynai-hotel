using backend.RequestDtos.Hotel;
using backend.RequestDtos.Order;
using FluentValidation;

namespace backend.Validation.Order;

public class EditOrderRequestValidator : AbstractValidator<EditOrderRequest>
{
    public EditOrderRequestValidator()
    {
        RuleFor(x => x.RoomType)
            .IsInEnum().WithMessage("Invalid room type. Allowed values are: Standard, Deluxe, Suite.");

        RuleFor(x => x.OrderDate)
            .GreaterThanOrEqualTo(DateTime.Today)
            .WithMessage("Order date cannot be in the past.");

        RuleFor(x => x.PeopleCount)
            .GreaterThan(0)
            .WithMessage("People count must be at least 1.");

        RuleFor(x => x.Period)
            .GreaterThan(0)
            .WithMessage("Period must be a positive number.");
    }
}
