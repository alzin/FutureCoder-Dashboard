import { createAsyncThunk } from "@reduxjs/toolkit";
import { Api, token } from "../Api";

const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
  Authorization: `Bearer ${token}`,
  // 'Content-Type': 'multipart/form-data'
};

// get all users
export const getUsers = createAsyncThunk(
  "users/getUsers",
  async ({ currentPage }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${Api}/users/?page=${currentPage}`, {
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

// get all user by id
export const getUserById = createAsyncThunk(
  "users/getUserById",
  async ({ userId }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${Api}/user?id=${userId}`, {
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

//  add user
export const addUser = createAsyncThunk(
  "users/addUser",
  async ({ userData }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${Api}/register1`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(userData),
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

//  update user
export const updateUser = createAsyncThunk(
  "users/updateUser",
  async ({ newUserData, userId }, { rejectWithValue }) => {
    console.log(newUserData, userId);
    try {
      const response = await fetch(`${Api}/user/${userId}`, {
        method: "PUT",
        headers,
        body: JSON.stringify(newUserData),
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

// delete user
export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async ({ userId }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${Api}/users/${userId}`, {
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
