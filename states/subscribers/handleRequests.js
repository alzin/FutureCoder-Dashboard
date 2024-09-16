import { createAsyncThunk } from "@reduxjs/toolkit";
import {Api,token} from "../Api";

const headers = {
  "Content-Type": "application/json",
  "Accept": "application/json",
  "Authorization": `Bearer 1|${token}`,
  // 'Content-Type': 'multipart/form-data'
};


// get all subscribers
export const getSubscribers= createAsyncThunk(
  "subscribers/getSubscribers",
  async ({ currentPage }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${Api}/subscribers?page=${currentPage}`, {
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

// get subscriber by id
export const getSubscriberById = createAsyncThunk(
  "subscribers/getSubscriberById",
  async ({ blogId }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${Api}/subscriber?id=${blogId}`, {
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

// add subscriber
export const addSubscriber = createAsyncThunk(
  "subscribers/addSubscriber",
  async (
    { subscriberData },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch(`${Api}/subscribers`, {
        method: "POST",
        headers,
        body: JSON.stringify(subscriberData),
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

//  update subscriber
export const updateSubscriber = createAsyncThunk(
  "subscribers/updateSubscriber",
  async ({ newSubscriber, subscriberId }, { rejectWithValue }) => {

    try {
      const response = await fetch(`${Api}/subscribers/${subscriberId}`, {
        method: "PUT",
        headers,
        body: JSON.stringify(newSubscriber),
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

// delete subscriber
export const deleteSubscriber = createAsyncThunk(
  "subscribers/deleteBlog",
  async ({ subscriberId }, { rejectWithValue }) => {

    try {
      const response = await fetch(`${Api}/subscribers?id=${subscriberId}`, {
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