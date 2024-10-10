import { createAsyncThunk } from "@reduxjs/toolkit";
import { Api, token } from "../Api";


const headers = {
  "Content-Type": "application/json",
  "Accept": "application/json",
  "Authorization": `Bearer ${token}`
  // 'Content-Type': 'multipart/form-data'
};


// get all blogs
export const getBlogs = createAsyncThunk(
  "blogs/getBlogs",
  async ({ currentPage }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${Api}/blogs?page=${currentPage}`, {
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

// get blog by id
export const getBlogById = createAsyncThunk(
  "blogs/getBlogById",
  async ({ blogId }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${Api}/blogs?id=${blogId}`, {
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

// add blog
export const addBlog = createAsyncThunk(
  "blogs/addBlog",
  async (
    { blogData },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch(`${Api}/blogs`, {
        method: "POST",
        headers,
        body: JSON.stringify(blogData),
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

//  update blog
export const updateBlog = createAsyncThunk(
  "blogs/updateBlog",
  async ({ newBlogData, blogId }, { rejectWithValue }) => {

    newBlogData["_method"] = "put"

    try {
      const response = await fetch(`${Api}/blogs/${blogId}`, {
        method: "POST",
        headers,
        body: JSON.stringify(newBlogData),
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

// delete blog
export const deleteBlog = createAsyncThunk(
  "blogs/deleteBlog",
  async ({ blogId }, { rejectWithValue }) => {

    try {
      const response = await fetch(`${Api}/blogs?id=${blogId}`, {
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