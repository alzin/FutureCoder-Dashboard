import { createAsyncThunk } from "@reduxjs/toolkit";
import { Api, token } from "../Api";

const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
  Authorization: `Bearer 1|${token}`,
  // 'Content-Type': 'multipart/form-data'
};

// get all bookings
export const getBookings = createAsyncThunk(
  "bookings/getBookings",
  async ({ currentPage, timezone }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${Api}/free_lessons/getFreeLesson?page=${currentPage}`, {
        method: "POST",
        headers,
        body: JSON.stringify({ timezone }),
      });
      const data = await response.json();

      if (response.ok) {
        return data;
      } else {
        return rejectWithValue(data.message);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// add Booking
export const addBooking = createAsyncThunk(
  "bookings/addBooking",
  async ({ bookingData }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${Api}/free_lessons/createSession`, {
        method: "POST",
        headers,
        body: JSON.stringify(bookingData),
      });
      const data = await response.json();

      if (response.ok) {
        return data;
      } else {
        return rejectWithValue(data.message);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// delete Booking
export const deleteBooking = createAsyncThunk(
  "bookings/deleteBooking",
  async ({ bookingId }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${Api}/free_lessons?id=${bookingId}`, {
        method: "DELETE",
        headers,
      });
      const data = await response.json();

      if (response.ok) {
        return data;
      } else {
        return rejectWithValue(data.message);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// get Booking by id
export const getBookingById = createAsyncThunk(
  "bookings/getBookingById",
  async ({ bookingId }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${Api}/free_lessons?id=${bookingId}`, {
        method: "GET",
        headers,
      });
      const data = await response.json();

      if (response.ok) {
        return data;
      } else {
        return rejectWithValue(data.message);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

//  update Booking
export const updateBooking = createAsyncThunk(
  "bookings/updateBooking",
  async ({ newBookingData, bookingId }, { rejectWithValue }) => {
    newBookingData.append("_method", "put");

    try {
      const response = await fetch(`${Api}/free_lessons/${bookingId}`, {
        method: "POST",
        headers: {},
        body: JSON.stringify(newBookingData),
      });
      const data = await response.json();

      if (response.ok) {
        return data;
      } else {
        return rejectWithValue(data.message);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
