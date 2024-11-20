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
    mutationFn: ({hotel}) =>  addHotel(hotel),
    onSuccess: (e) => {
      if(e !== undefined)
        toastService.success('Hotel created successfully!');
      queryClient.invalidateQueries(['get-hotel-list']);
    },
  });
}

export const useUpdateHotel = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({id, hotel}) => updateHotel(id, hotel),
    onSuccess: (e) => {
      if(e !== undefined)
        toastService.success('Hotel updated successfully!');

      queryClient.invalidateQueries(['get-hotel-list']);
    },
  });
}

export const useRemoveHotel = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({id}) => deleteHotel(id),
    onSuccess: (e) => {
      if(e !== undefined) toastService.success('hotel removed successfully!');
      queryClient.invalidateQueries(['get-hotel-list']);
    },
  });
}