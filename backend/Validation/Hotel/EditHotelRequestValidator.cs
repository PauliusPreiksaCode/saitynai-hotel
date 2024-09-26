using backend.RequestDtos.Hotel;
using FluentValidation;

namespace backend.Validation.Hotel;

public class EditHotelRequestValidator : AbstractValidator<EditHotelRequest>
{
    public EditHotelRequestValidator()
    {
        RuleFor(x => x.Name)
            .NotEmpty().WithMessage("Hotel name is required")
            .MaximumLength(100).WithMessage("Hotel name cannot exceed 100 characters");

        RuleFor(x => x.Location)
            .NotEmpty().WithMessage("Location is required");

        RuleFor(x => x.Photo)
            .NotEmpty().WithMessage("Photo URL is required");

        RuleFor(x => x.BreakfastPrice)
            .GreaterThanOrEqualTo(0).WithMessage("Breakfast price must be a positive number");

        RuleFor(x => x.StandardPrice)
            .GreaterThanOrEqualTo(0).WithMessage("Standard price must be a positive number");

        RuleFor(x => x.DeluxePrice)
            .GreaterThanOrEqualTo(0).WithMessage("Deluxe price must be a positive number");

        RuleFor(x => x.SuitePrice)
            .GreaterThanOrEqualTo(0).WithMessage("Suite price must be a positive number");
    }
}
