import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getAllHotels, getHotelById, addHotel, updateHotel, deleteHotel } from '../services/api';
import toastService from '../services/toastService';

export const useGetHotels = () => {
  return useQuery({ 
    queryKey: ['get-hotel-list'], 
    queryFn: getAllHotels,
    refetchOnWindowFocus: false, 
    refetchInterval: false
  });
};

export const useGetHotelById = (id) => {
  return useQuery({ 
    queryKey: ['get-hotel'], 
    queryFn: () => getHotelById(id),
    refetchOnWindowFocus: false, 
    refetchInterval: false
  });
}

export const useCreateHotel = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addHotel,
    onSuccess: (e) => {
      if(e !== undefined)
        toastService.success('Viešbutis sėkmingai sukurtas!');
      queryClient.invalidateQueries(['get-hotel-list']);
    },
  });
}

export const useUpdateHotel = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateHotel,
    onSuccess: (e) => {
      if(e !== undefined)
        toastService.success('Viešbutis sėkmingai atnaujintas!');
      queryClient.invalidateQueries(['get-hotel-list']);
    },
  });
}

export const useRemoveHotel = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteHotel,
    onSuccess: (e) => {
      if(e !== undefined) toastService.success('Viešbutis sėkmingai pašalintas!');
      queryClient.invalidateQueries(['get-hotel-list']);
    },
  });
}