import { createAsyncThunk } from "@reduxjs/toolkit";
import {Api,token} from "../Api";

const headers = {
  "Content-Type": "application/json",
  "Accept": "application/json",
  "Authorization": `Bearer 1|${token}`
  // 'Content-Type': 'multipart/form-data'
};


// get all courses
export const getCourses = createAsyncThunk(
  "courses/getCourses",
  async ({ currentPage }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${Api}/courses?page=${currentPage}`, {
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

// get course by id
export const getCourseById = createAsyncThunk(
  "courses/getCourseById",
  async ({ courseId }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${Api}/courses?id=${courseId}`, {
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

// get courses by age
export const getCoursesByAge = createAsyncThunk(
  "courses/getCoursesByAge",
  async ({ age }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${Api}/courses/courseById?age=${age}`, {
        method: "GET",
        headers,
      });
      const data = await response.json();

      if (response.ok) {
        console.log(data)
        return data;
      } else {
        return rejectWithValue(data.message);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// add course
export const addCourse = createAsyncThunk(
  "courses/addCourse",
  async (
    { courseData },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch(`${Api}/courses`, {
        method: "POST",
        headers,
        body: JSON.stringify(courseData),
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

//  update course
export const updateCourse = createAsyncThunk(
  "courses/updateCourse",
  async ({ newCourseData, courseId }, { rejectWithValue }) => {

    newCourseData["_method"]= "put";

    try {
      const response = await fetch(`${Api}/courses/${courseId}`, {
        method: "POST",
        headers,
        body: JSON.stringify(newCourseData),
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

// delete Course
export const deleteCourse = createAsyncThunk(
  "courses/deleteCourse",
  async ({ courseId }, { rejectWithValue }) => {

    try {
      const response = await fetch(`${Api}/courses?id=${courseId}`, {
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