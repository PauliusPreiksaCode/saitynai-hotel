import instance from "./axios-client";
import authService from "./auth";
import toastService from "../services/toastService";

export async function login(user) {
  return await instance
    .post("auth/login", user)
    .then((res) => {
      const token = res.data;
      authService.setCookies(token);
      toastService.success("Logged in successfully!");
      return { token };
    })
    .catch((err) => {
      toastService.error(err.response.data);
    });
}

export async function registerClient(user) {
  try {
    const response = await instance.post("auth/registerClient", user);
    toastService.success("Client registered successfully!");
    return response.data;
  } catch (error) {
    toastService.error(error.response.data);
  } 
}

export async function registerPersonel(user) {
  try {
    const response = await instance.post("auth/registerHotelPersonel", user);
    toastService.success("Personel registered successfully!");
    return response.data;
  } catch (error) {
    toastService.error(error.response.data);
  } 
}

export async function renewToken() {
  return await instance
    .get("auth/accessToken")
    .then((res) => res.data)
    .catch((err) => {
      toastService.error(err.response.data);
    });
}

export async function logOut() {
  return await instance
    .post("auth/logOut")
    .then((res) => res.data)
    .catch((err) => {
      toastService.error(err.response.data);
    });
}

export async function getAllHotels() {
  return await instance
    .get("hotels")
    .then((res) => res.data)
    .catch((err) => {
      toastService.error(err.response.data);
    });
}

export async function getHotelById(id) {
  return await instance
    .get(`hotels/${id}`)
    .then((res) => res.data)
    .catch((err) => {
      toastService.error(err.response.data);
    });
}

export async function addHotel(hotel) {
  return await instance
    .post("hotels", hotel)
    .then((res) => res.data)
    .catch((err) => {
      toastService.error(err.response.data);
    });
}

export async function updateHotel(id, hotel) {
  return await instance
    .put(`hotels/${id}`, hotel)
    .then((res) => res.data)
    .catch((err) => {
      toastService.error(err.response.data);
    });
}

export async function deleteHotel(id) {
  return await instance
    .delete(`hotels/${id}`)
    .then((res) => res.data)
    .catch((err) => {
      toastService.error(err.response.data);
    });
}

export async function getAllOrders(hotelId) {
  return await instance
    .get(`hotels/${hotelId}/orders`)
    .then((res) => res.data)
    .catch((err) => {
      toastService.error(err.response.data);
    });
}

export async function getAllMyOrders(hotelId) {
  return await instance
    .get(`hotels/${hotelId}/orders/myOrders`)
    .then((res) => res.data)
    .catch((err) => {
      toastService.error(err.response.data);
    });
}

export async function getOrderById(hotelId, orderId) {
  return await instance
    .get(`hotels/${hotelId}/orders/${orderId}`)
    .then((res) => res.data)
    .catch((err) => {
      toastService.error(err.response.data);
    });
}

export async function createOrder(hotelId, order) {
  return await instance
    .post(`hotels/${hotelId}/orders`, order)
    .then((res) => {
      toastService.success("Order created successfully!");
      return res.data;
    } )
    .catch((err) => {
      toastService.error(err.response.data);
    });
}

export async function updateOrder(hotelId, orderId, order) {
  return await instance
    .put(`hotels/${hotelId}/orders/${orderId}`, order)
    .then((res) => {
      toastService.success("Order updated successfully!");
      return res.data;
    } )
    .catch((err) => {
      toastService.error(err.response.data);
    });
}

export async function deleteOrder(hotelId, orderId) {
  return await instance
    .delete(`hotels/${hotelId}/orders/${orderId}`)
    .then((res) => res.data)
    .catch((err) => {
      toastService.error(err.response.data);
    });
}

export async function getAllComments(hotelId, orderId) {
  return await instance
    .get(`hotels/${hotelId}/orders/${orderId}/comments`)
    .then((res) => res.data)
    .catch((err) => {
      toastService.error(err.response.data);
    });
}

export async function getCommentById(hotelId, orderId, commentId) {
  return await instance
    .get(`hotels/${hotelId}/orders/${orderId}/comments/${commentId}`)
    .then((res) => res.data)
    .catch((err) => {
      toastService.error(err.response.data);
    });
}

export async function createComment(hotelId, orderId, comment) {
  return await instance
    .post(`hotels/${hotelId}/orders/${orderId}/comments`, comment)
    .then((res) => res.data)
    .catch((err) => {
      toastService.error(err.response.data);
    });
}

export async function updateComment(hotelId, orderId, commentId, comment) {
  return await instance
    .put(`hotels/${hotelId}/orders/${orderId}/comments/${commentId}`, comment)
    .then((res) => res.data)
    .catch((err) => {
      toastService.error(err.response.data);
    });
}

export async function deleteComment(hotelId, orderId, commentId) {
  return await instance
    .delete(`hotels/${hotelId}/orders/${orderId}/comments/${commentId}`)
    .then((res) => res.data)
    .catch((err) => {
      toastService.error(err.response.data);
    });
}
