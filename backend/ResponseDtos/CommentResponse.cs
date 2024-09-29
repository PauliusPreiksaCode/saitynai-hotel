﻿using backend.Entities;

namespace backend.ResponseDtos;

public record CommentResponse
{
    public Guid Id { get; set; }
    public required string Text { get; set; }
    public required Order Order { get; set; }
    public required DateTime ModifiedAt { get; set; }
}