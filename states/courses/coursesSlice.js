import { createSlice } from "@reduxjs/toolkit";
import { getCourses, getCourseById, getCoursesByAge, addCourse, updateCourse, deleteCourse } from "./handleRequests";
import { toast } from "react-toastify";


const initialState = {
  courses: null,
  coursesByAge: null,
  findCourse: null,
  totalCount: 0,
  currentPage: 1,
  loading: false,
};

export const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    setCurrentPage: (state, { payload }) => {
      state.currentPage = payload;
    },
  },

  extraReducers: (builder) => {

    // getCourses
    builder
      .addCase(getCourses.pending, (state, { payload }) => {
        state.courses = null
        state.totalCount = 0
      })
      .addCase(getCourses.fulfilled, (state, { payload }) => {
        state.courses = payload.data.data
        state.totalCount = payload.data.total
        console.log(payload.data.data)
        // toast.success("Succsessfull getCourses");
      })
      .addCase(getCourses.rejected, (state, { payload }) => {
        toast.error(payload);
      });

    // getCourseById
    builder
      .addCase(getCourseById.pending, (state, { payload }) => {
        state.findCourse = null
      })
      .addCase(getCourseById.fulfilled, (state, { payload }) => {
        state.findCourse = payload.data
        // toast.success("Succsessfull getCourseById");
      })
      .addCase(getCourseById.rejected, (state, { payload }) => {
        toast.error(payload);
      });

    // getCoursesByAge
    builder
      .addCase(getCoursesByAge.pending, (state, { payload }) => {
        state.coursesByAge = null
        state.loading = true
      })
      .addCase(getCoursesByAge.fulfilled, (state, { payload }) => {
        state.coursesByAge = payload
        state.loading = false
        // toast.success("Succsessfull getCoursesByAge");
      })
      .addCase(getCoursesByAge.rejected, (state, { payload }) => {
        state.loading = false
        toast.error(payload);
      });

    // addCourse
    builder
      .addCase(addCourse.pending, (state, { payload }) => {
        state.loading = true
      })
      .addCase(addCourse.fulfilled, (state, { payload }) => {
        state.loading = false;
        toast.success("Succsessfull addCourse");
      })
      .addCase(addCourse.rejected, (state, { payload }) => {
        state.loading = false;
        toast.error(payload);
      });

    // updateCourse
    builder
      .addCase(updateCourse.pending, (state, { payload }) => {
        state.loading = true
      })
      .addCase(updateCourse.fulfilled, (state, { payload }) => {
        state.loading = false;
        toast.success("Succsessfull updateCourse");
      })
      .addCase(updateCourse.rejected, (state, { payload }) => {
        state.loading = false;
        toast.error(payload);
      });

    // deleteCourse
    builder
      .addCase(deleteCourse.pending, (state, { payload }) => {
        state.loading = true
      })
      .addCase(deleteCourse.fulfilled, (state, { payload }) => {
        state.loading = false;
        toast.success("Succsessfull deleteCourse");
      })
      .addCase(deleteCourse.rejected, (state, { payload }) => {
        state.loading = false;
        toast.error(payload);
      });
  },
});

export const { setCurrentPage } =
  coursesSlice.actions;
export default coursesSlice.reducer;
