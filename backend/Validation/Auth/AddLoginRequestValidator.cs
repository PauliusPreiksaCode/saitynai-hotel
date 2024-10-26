using backend.RequestDtos.Auth;
using FluentValidation;

namespace backend.Validation.Auth;

public class AddLoginRequestValidator : AbstractValidator<LoginUserRequest>
{
    public AddLoginRequestValidator()
    {
        RuleFor(x => x.Username)
            .NotEmpty().WithMessage("Username is required");

        RuleFor(x => x.Password)
            .NotEmpty().WithMessage("Password is required");
    }
}
