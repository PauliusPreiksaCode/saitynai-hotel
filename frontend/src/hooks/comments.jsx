import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getAllComments, getCommentById, createComment, updateComment, deleteComment } from '../services/api';
import toastService from '../services/toastService';

export const useGetComments = (hotelId, orderId) => {
    return useQuery({
        queryKey: ['get-comments-list'],
        queryFn: () => getAllComments(hotelId, orderId),
        refetchOnWindowFocus: false,
        refetchInterval: false,
    });
}

export const useGetCommentById = () => {
    return useQuery({
        queryKey: ['get-comment'],
        queryFn: () => getCommentById,
        refetchOnWindowFocus: false,
        refetchInterval: false,
    });
}

export const useCreateComment = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({hotelId, orderId, comment}) => createComment(hotelId, orderId, comment),
        onSuccess: (e) => {
            if (e !== undefined) toastService.success('Comment created successfully!');
            queryClient.invalidateQueries(['get-comments-list']);
        },
    });
}

export const useUpdateComment = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({hotelId, orderId, commentId, comment}) =>  updateComment(hotelId, orderId, commentId, comment),
        onSuccess: (e) => {
            if (e !== undefined) toastService.success('Comment updated successfully!');
            queryClient.invalidateQueries(['get-comments-list']);
        },
    });
}

export const useRemoveComment = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({hotelId, orderId, commentId}) => deleteComment(hotelId, orderId, commentId),
        onSuccess: (e) => {
            if (e !== undefined) toastService.success('Comment removed successfully!');
            queryClient.invalidateQueries(['get-comments-list']);
        },
    });
}