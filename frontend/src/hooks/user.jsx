import { useMutation, useQueryClient } from '@tanstack/react-query';
import { registerClient, registerPersonel } from '../services/api';
import { useNavigate } from 'react-router';
import toastService from '../services/toastService';


export const useRegisterClient = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  
  return useMutation({
    mutationFn: registerClient,
    onSuccess: (e) => {
      if(e !== undefined)
        toastService.success('Vartotojas sėkmingai sukurtas!');
      queryClient.invalidateQueries(['get-user-list']);
      navigate('/login');
    },
  });
}

export const useRegisterPersonel = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  
  return useMutation({
    mutationFn: registerPersonel,
    onSuccess: (e) => {
      if(e !== undefined)
        toastService.success('Vartotojas sėkmingai sukurtas!');
      queryClient.invalidateQueries(['get-user-list']);
      navigate('/login');
    },
  });
}