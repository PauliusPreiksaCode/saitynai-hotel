import * as yup from 'yup';

export const registerTemplate = yup.object({
  username: yup
    .string()
    .required('Reikalingas vartotojo vardas'),
  password: yup
    .string()
    .required('Reikalingas slaptažodis'),
  email: yup
    .string()
    .email('Neteisingas el. pašto formatas')
    .required('Reikalingas el. paštas'),
  name: yup
    .string()
    .required('Reikalingas vardas'),
  surname: yup
    .string()
    .required('Reikalinga pavardė'),
});