import { createSlice } from "@reduxjs/toolkit";
import {
  getTestimonials,
  addTestimonial,
  updateTestimonial,
  deleteTestimonials,
  toggleTestimonial,
  getTestimonialById,
} from "./handleRequests";
import { toast } from "react-toastify";

const initialState = {
  testimonials: null,
  findTestimonial: null,
  totalCount: 0,
  currentPage: 1,
  loading: false,
};

export const testimonialsSlice = createSlice({
  name: "testimonials",
  initialState,
  reducers: {
    setCurrentPage: (state, { payload }) => {
      state.currentPage = payload;
    },
  },

  extraReducers: (builder) => {
    // getTestimonials
    builder
      .addCase(getTestimonials.pending, (state, { payload }) => {
        state.loading = true;
        state.testimonials = null;
        state.totalCount = 0;
      })
      .addCase(getTestimonials.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.testimonials = payload.data;
        state.totalCount = payload.total;
        // toast.success("Succsessfull getTestimonials");
      })
      .addCase(getTestimonials.rejected, (state, { payload }) => {
        state.loading = false;
        toast.error(payload);
      });

    // getTestimonialById
    builder
      .addCase(getTestimonialById.pending, (state, { payload }) => {
        state.loading = true;
        state.findTestimonial = null;
      })
      .addCase(getTestimonialById.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.findTestimonial = payload;
        // toast.success("Succsessfull getTestimonialById");
      })
      .addCase(getTestimonialById.rejected, (state, { payload }) => {
        state.loading = false;
        toast.error(payload);
      });

    // toggleTestimonial
    builder
      .addCase(toggleTestimonial.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(toggleTestimonial.fulfilled, (state, { payload }) => {
        state.loading = false;
        toast.success("Succsessfull Toggle");
      })
      .addCase(toggleTestimonial.rejected, (state, { payload }) => {
        state.loading = false;
        toast.error(payload);
      });

    // addTestimonial
    builder
      .addCase(addTestimonial.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(addTestimonial.fulfilled, (state, { payload }) => {
        state.loading = false;
        toast.success("Succsessfull addTestimonial");
      })
      .addCase(addTestimonial.rejected, (state, { payload }) => {
        state.loading = false;
        toast.error(payload);
      });

    // updateTestimonial
    builder
      .addCase(updateTestimonial.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(updateTestimonial.fulfilled, (state, { payload }) => {
        state.loading = false;
        toast.success("Succsessfull updateTestimonial");
      })
      .addCase(updateTestimonial.rejected, (state, { payload }) => {
        state.loading = false;
        toast.error(payload);
      });

    // deleteTestimonials
    builder
      .addCase(deleteTestimonials.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(deleteTestimonials.fulfilled, (state, { payload }) => {
        state.loading = false;
        toast.success("Succsessfull deleteTestimonials");
      })
      .addCase(deleteTestimonials.rejected, (state, { payload }) => {
        state.loading = false;
        toast.error(payload);
      });
  },
});

export const { setCurrentPage } = testimonialsSlice.actions;
export default testimonialsSlice.reducer;
