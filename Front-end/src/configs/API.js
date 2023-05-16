import axios from "axios";
import cookies from "react-cookies";

export let endpoints = {
  users: "/users/",
  "user-id": (userId) => `/users/${userId}/`,
  current_user: "/users/current-user/",
  oauth2_info: "/oauth2-info/",
  carrier: "/carier-login/",
  carriers: "/carrier/",
  carrierview: "/carrierview/",
  hireoptions: "/hireoptions/",
  "change-password": "/users/change-password/",
  "forgot-password": "/reset-password/",
  "verify-token": "/reset-password/validate_token/",
  "reset-password": "/reset-password/confirm/",
  login: "/o/token/",
  confirmPass: "/users/reset_password/confirm/",
  "facebook-access": "/social_auth/facebook/",
  "google-access": "/social_auth/google/",
  router: "/routes/",
  buss: "/buss/",
  "garage-details": (garagesId) => `/buss/${garagesId}/`,
  "bus-comments": (garagesId) => `/buss/${garagesId}/comments/`,
  "add-comment-bus": (garagesId) => `/buss/${garagesId}/add-comment/`,
  "time-table": "/timetables/",
  "time-table-detail": (timetableID) => `/timetables/${timetableID}`,
  "type-bus": "/typebuss/",
  "route-detail": (routerId) => `/routes/${routerId}/`,
  seats: (typebusID) => `/typebuss/${typebusID}/seat/`,
  "seat-detail": (seatId) => `/seats/${seatId}/`,
  bookings: (timetableID) => `/timetables/${timetableID}/booking/`,
  "booking-detail": (bookingID) => `/bookings/${bookingID}/booking-detail/`,
  city: "/city/",
  "timetable-detail": (timetableID) => `/timetables/${timetableID}/garage/`,
  booking: "/bookings/",
  "booking-history": "/bookinghistorys/",
  "seat-booking-detail": (timetableID) =>
    `/timetables/${timetableID}/bookingdetails/`,
  bookingdetails: "/bookingdetails/",
  "last-booking": "/bookings/last-book/",
  "booking-history-by-user": (userId) =>
    `/bookings/${userId}/booking-history-by-user/`,
  "get_carrier_by_userID": (userId) => `/carrierview/${userId}/get_carrier_by_userID/`,
  "get_bus_by_carrierID": (carrierId) =>`/carrier/${carrierId}/get_bus_by_carrierID/`,
  "get_route_by_bus": (garagesId) =>`/busroutes/${garagesId}/get_route_by_bus/`,
  "like-busroute": (busrouteId) => `/busroutes/${busrouteId}/like/`,
  "busroute-comments": (busrouteId) => `/busroutes/${busrouteId}/comments/`,
  ratings: "/ratings/",
  "busroute-ratings": (busrouteId) => `/busroutes/${busrouteId}/get-rating/`,
  comments: "/comments/",
  "last-comment": "/busroutes/last-comment/",
  "checked-user": (busrouteId) => `/busroutes/${busrouteId}/checked-user/`,
  garages: "/garages/",
  "garages-detail": (garagesId) => `/garages/${garagesId}`,
  send_mail_booking: "/send_mail_booking/send_mail_booking/",
  momo: "/momo/request_momo/",
  "return-momo": "/momo/return-momo/",
  bookingID: (bookingID) => `/bookings/${bookingID}`,
  busroutes: "/busroutes/",
  "busroutes-detail": (busRouteId) => `/busroutes/${busRouteId}`,
};

export const authApi = () =>
  axios.create({
    baseURL: "http://localhost:8000",
    headers: {
      Authorization: `Bearer ${cookies.load("access_token")}`,
    },
  });

export default axios.create({
  baseURL: "http://localhost:8000",
});
