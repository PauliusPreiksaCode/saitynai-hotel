import * as yup from "yup";

export const bookingValidation = yup.object().shape({
  peopleCount: yup
    .string()
    .required("Please enter person count")
    .matches(/^[1-9]\d*$/, "Please enter person count"),
  roomType: yup
    .string()
    .oneOf(["0", "1", "2"], "Room type is required")
    .required("Room type is required"),
});