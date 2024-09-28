using backend.RequestDtos.Comment;
using FluentValidation;

namespace backend.Validation.Comment;

public class AddCommentRequestValidator : AbstractValidator<AddCommentRequest>
{
    public AddCommentRequestValidator()
    {
        RuleFor(x => x.Text)
            .NotEmpty().WithMessage("Comment text is required")
            .MaximumLength(200).WithMessage("Comment text cannot exceed 200 characters");
    }
}
