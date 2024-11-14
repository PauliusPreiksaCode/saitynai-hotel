import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllOrders, getAllMyOrders, getOrderById, createOrder, updateOrder, deleteOrder } from "../services/api";
import toastService from "../services/toastService";
import { useNavigate } from "react-router-dom";

export const useGetOrders = () => {
    return useQuery({
        queryKey: ["get-orders-list"],
        queryFn: getAllOrders,
        refetchOnWindowFocus: false,
        refetchInterval: false,
    });
};

export const useGetAllMyOrders = () => {
    return useQuery({
        queryKey: ["get-all-my-orders"],
        queryFn: getAllMyOrders,
        refetchOnWindowFocus: false,
        refetchInterval: false,
    });
}

export const useGetOrderById = (hotelId, orderId) => {
    return useQuery({
        queryKey: ["get-order"],
        queryFn: () => getOrderById(hotelId, orderId),
        refetchOnWindowFocus: false,
        refetchInterval: false,
    });
}

export const useCreateOrder = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createOrder,
        onSuccess: (e) => {
            if (e !== undefined) toastService.success('Užsakymas sėkmingai sukurtas!');
            queryClient.invalidateQueries(['get-orders-list']);
        },
    });
}

export const useUpdateOrder = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: ({hotelId, orderId, order}) => updateOrder(hotelId, orderId, order),
        onSuccess: (e) => {
            if (e !== undefined) toastService.success('Užsakymas sėkmingai atnaujintas!');
            queryClient.invalidateQueries(['get-orders-list']);
            navigate('/orders');
        },
    });
}

export const useRemoveOrder = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({hotelId, orderId}) => deleteOrder(hotelId, orderId),
        onSuccess: (e) => {
            if (e !== undefined) toastService.success('Užsakymas sėkmingai pašalintas!');
            queryClient.invalidateQueries(['get-orders-list']);
        },
    });
}

