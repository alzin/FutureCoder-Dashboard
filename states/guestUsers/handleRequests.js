import { createAsyncThunk } from "@reduxjs/toolkit";
import {Api,token} from "../Api";


const headers = {
  "Content-Type": "application/json",
  "Accept": "application/json",
  "Authorization": `Bearer 1|${token}`
  // 'Content-Type': 'multipart/form-data'
};


// get all guestUsers
export const getGuestUsers = createAsyncThunk(
  "guestUsers/getGuestUsers",
  async ({ currentPage }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${Api}/guest_users?page=${currentPage}`, {
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

// get guestUser by id
export const getGuestUserById = createAsyncThunk(
  "guestUsers/getGuestUserById",
  async ({ guestUserId }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${Api}/guest_users?id=${guestUserId}`, {
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

// add guest user
export const addGuestUser = createAsyncThunk(
  "guestUsers/addGuestUser",
  async (
    { guestUserData },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch(`${Api}/guest_users`, {
        method: "POST",
        headers,
        body: JSON.stringify(guestUserData),
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

//  update guest user
export const updateGuestUser = createAsyncThunk(
  "guestUsers/updateGuestUser",
  async ({ newGuestUserData, guestUserId }, { rejectWithValue }) => {

    console.log(newGuestUserData, guestUserId)
    try {
      const response = await fetch(`${Api}/guest_users/${guestUserId}`, {
        method: "PUT",
        headers,
        body: JSON.stringify(newGuestUserData),
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

// delete guest user
export const deleteGuestUser = createAsyncThunk(
  "guestUsers/deleteGuestUser",
  async ({ guestUserId }, { rejectWithValue }) => {

    try {
      const response = await fetch(`${Api}/guest_users?id=${guestUserId}`, {
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