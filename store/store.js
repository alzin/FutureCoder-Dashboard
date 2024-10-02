import { configureStore } from "@reduxjs/toolkit";

import toggleSlice from "@/states/toggle/toggleSlice";
import blogsSlice from "@/states/blogs/blogsSlice";
import subscribersSlice from "@/states/subscribers/subscribersSlice";
import coursesSlice from "@/states/courses/coursesSlice";
import coursesTimesSlice from "@/states/coursesTimes/coursesTimesSlice";
import guestUsersSlice from "@/states/guestUsers/guestUsersSlice";
import bookingsSlice from "@/states/bookings/bookingsSlice";
import authSlice from "@/states/auth/authSlice";
import testimonialsSlice from "@/states/testimonials/testimonialsSlice";
import usersSlice from "@/states/users/usersSlice";

export const store = configureStore({
  reducer: {
    toggle: toggleSlice,
    blogs: blogsSlice,
    subscribers: subscribersSlice,
    courses: coursesSlice,
    coursesTimes: coursesTimesSlice,
    guestUsers: guestUsersSlice,
    bookings: bookingsSlice,
    auth: authSlice,
    testimonials: testimonialsSlice,
    users: usersSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
});
