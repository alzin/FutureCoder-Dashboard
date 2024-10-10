import { createAsyncThunk } from "@reduxjs/toolkit";
import { Api, token } from "../Api";

const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
  Authorization: `Bearer ${token}`,
  // 'Content-Type': 'multipart/form-data'
};

// get all testimonials
export const getTestimonials = createAsyncThunk(
  "testimonials/getTestimonials",
  async ({ currentPage }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${Api}/Testimonial/getAllTestimonialsForAdmin?page=${currentPage}`,
        {
          method: "GET",
          headers,
        }
      );
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

// get all testimonial by id
export const getTestimonialById = createAsyncThunk(
  "testimonials/getTestimonialById",
  async ({ testimonialId }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${Api}/Testimonial?id=${testimonialId}`, {
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

// add testimonial
export const addTestimonial = createAsyncThunk(
  "testimonials/addTestimonial",
  async ({ testimonialData }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${Api}/Testimonial`, {
        method: "POST",
        headers,
        body: JSON.stringify(testimonialData),
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

//  update testimonial
export const updateTestimonial = createAsyncThunk(
  "testimonials/updateTestimonial",
  async ({ newTestimonialData, testimonialId }, { rejectWithValue }) => {
    console.log(newTestimonialData, testimonialId);
    try {
      const response = await fetch(`${Api}/Testimonial/${testimonialId}`, {
        method: "PUT",
        headers,
        body: JSON.stringify(newTestimonialData),
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

// delete testimonial
export const deleteTestimonials = createAsyncThunk(
  "testimonials/deleteTestimonials",
  async ({ testimonialId }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${Api}/Testimonial`, {
        method: "DELETE",
        headers,
        body: JSON.stringify({ id: testimonialId }),
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

// toggle show testimonial
export const toggleTestimonial = createAsyncThunk(
  "testimonials/toggleTestimonial",
  async ({ testimonialId }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${Api}/Testimonial/changeVisibility`, {
        method: "POST",
        headers,
        body: JSON.stringify({ id: testimonialId }),
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
