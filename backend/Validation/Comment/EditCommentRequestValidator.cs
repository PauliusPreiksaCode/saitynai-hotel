using backend.RequestDtos.Comment;
using FluentValidation;

namespace backend.Validation.Comment;

public class EditCommentRequestValidator : AbstractValidator<EditCommentRequest>
{
    public EditCommentRequestValidator()
    {
        RuleFor(x => x.Text)
            .NotEmpty().WithMessage("Comment text is required")
            .MaximumLength(200).WithMessage("Comment text cannot exceed 200 characters");
    }
}
