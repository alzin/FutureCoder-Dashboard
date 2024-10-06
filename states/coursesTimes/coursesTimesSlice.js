import { createSlice } from "@reduxjs/toolkit";
import {
  getCoursesTimes,
  getCoursesTimesById,
  getCourseDatesByCourseId,
  getCourseTimesByDate,
  addCoursesTimes,
  updateCoursesTimes,
  deleteCoursesTimes,
} from "./handleRequests";
import { toast } from "react-toastify";

const initialState = {
  coursesTimes: null,
  courseDates: null,
  courseTimes: null,
  findCoursesTimes: null,
  totalCount: 0,
  currentPage: 1,
  loading: false,
};

export const coursesTimesSlice = createSlice({
  name: "coursesTimes",
  initialState,
  reducers: {
    setCurrentPage: (state, { payload }) => {
      state.currentPage = payload;
    },
  },

  extraReducers: (builder) => {
    // getCoursesTimes
    builder
      .addCase(getCoursesTimes.pending, (state, { payload }) => {
        state.coursesTimes = null;
        state.totalCount = 0;
      })
      .addCase(getCoursesTimes.fulfilled, (state, { payload }) => {
        state.coursesTimes = payload.data.sort((a, b) => {
          const dateA = new Date(a.SessionTimings);
          const dateB = new Date(b.SessionTimings);

          if (dateA.getTime() !== dateB.getTime()) {
            return dateA.getTime() - dateB.getTime(); // Sort by date
          }

          const timeA = new Date(`${dateA.getFullYear()}-${padZero(dateA.getMonth() + 1)}-${padZero(dateA.getDate())}T${a.startTime}`);
          const timeB = new Date(`${dateB.getFullYear()}-${padZero(dateB.getMonth() + 1)}-${padZero(dateB.getDate())}T${b.startTime}`);

          return timeA.getTime() - timeB.getTime(); // Sort by time within the same day
        });
        state.totalCount = payload.total;
        // toast.success("Succsessfull getCoursesTimes");
      })
      .addCase(getCoursesTimes.rejected, (state, { payload }) => {
        toast.error(payload);
      });

    function padZero(num) {
      return num.toString().padStart(2, '0');
    }

    // getCoursesTimesById
    builder
      .addCase(getCoursesTimesById.pending, (state, { payload }) => {
        state.findCoursesTimes = null;
      })
      .addCase(getCoursesTimesById.fulfilled, (state, { payload }) => {
        state.findCoursesTimes = payload;
        // toast.success("Succsessfull getCoursesTimesById");
      })
      .addCase(getCoursesTimesById.rejected, (state, { payload }) => {
        toast.error(payload);
      });

    // getCourseDatesByCourseId
    builder
      .addCase(getCourseDatesByCourseId.pending, (state, { payload }) => {
        state.courseDates = null;
        state.loading = true;
      })
      .addCase(getCourseDatesByCourseId.fulfilled, (state, { payload }) => {
        state.courseDates = payload;
        console.log(payload);
        state.loading = false;
        // toast.success("Succsessfull getCourseDatesByCourseId");
      })
      .addCase(getCourseDatesByCourseId.rejected, (state, { payload }) => {
        state.loading = false;
        toast.error(payload);
      });

    // getCourseTimesByDate
    builder
      .addCase(getCourseTimesByDate.pending, (state, { payload }) => {
        state.courseTimes = null;
      })
      .addCase(getCourseTimesByDate.fulfilled, (state, { payload }) => {
        state.courseTimes = payload.data;
        console.log(payload);
        // toast.success("Succsessfull getCourseTimesByDate");
      })
      .addCase(getCourseTimesByDate.rejected, (state, { payload }) => {
        toast.error(payload);
      });

    // addCoursesTimes
    builder
      .addCase(addCoursesTimes.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(addCoursesTimes.fulfilled, (state, { payload }) => {
        state.loading = false;
        toast.success("Succsessfull addCoursesTimes");
      })
      .addCase(addCoursesTimes.rejected, (state, { payload }) => {
        state.loading = false;
        toast.error(payload);
      });

    // updateCoursesTimes
    builder
      .addCase(updateCoursesTimes.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(updateCoursesTimes.fulfilled, (state, { payload }) => {
        state.loading = false;
        toast.success("Succsessfull updateCoursesTimes");
      })
      .addCase(updateCoursesTimes.rejected, (state, { payload }) => {
        state.loading = false;
        toast.error(payload);
      });

    // deleteCoursesTimes
    builder
      .addCase(deleteCoursesTimes.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(deleteCoursesTimes.fulfilled, (state, { payload }) => {
        state.loading = false;
        toast.success("Succsessfull deleteCoursesTimes");
      })
      .addCase(deleteCoursesTimes.rejected, (state, { payload }) => {
        state.loading = false;
        toast.error(payload);
      });
  },
});

export const { setCurrentPage } = coursesTimesSlice.actions;
export default coursesTimesSlice.reducer;
