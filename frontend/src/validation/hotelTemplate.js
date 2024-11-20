import * as yup from 'yup';

export const hotelTemplate = yup.object({
  breakfastPrice: yup
    .number()
    .required('Breakfast price is required')
    .positive('Breakfast price must be positive'),
  deluxePrice: yup
    .number()
    .required('Deluxe price is required')
    .positive('Deluxe price must be positive'),
  location: yup
    .string()
    .required('Location is required'),
  name: yup
    .string()
    .required('Name is required'),
  photo: yup
    .string()
    .required('Photo is required'),
  standardPrice: yup
    .number()
    .required('Standard price is required')
    .positive('Standard price must be positive'),
  suitePrice: yup
    .number()
    .required('Suite price is required')
    .positive('Suite price must be positive'),
});