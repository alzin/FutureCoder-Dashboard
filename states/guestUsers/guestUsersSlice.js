import { createSlice } from "@reduxjs/toolkit";
import { getGuestUsers, getGuestUserById, addGuestUser, updateGuestUser, deleteGuestUser } from "./handleRequests";
import { toast } from "react-toastify";


const initialState = {
  guestUsers: null,
  findGuestUsers: null,
  totalCount: 0,
  currentPage: 1,
  loading: false,
};

export const guestUsersSlice = createSlice({
  name: "guestUsers",
  initialState,
  reducers: {
    setCurrentPage: (state, { payload }) => {
      state.currentPage = payload;
    },
  },

  extraReducers: (builder) => {
    
    // getGuestUsers
    builder
      .addCase(getGuestUsers.pending, (state, { payload }) => {
        state.loading = true
        state.guestUsers = null
        state.totalCount = 0
      })
      .addCase(getGuestUsers.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.guestUsers = payload[0].data.data
        state.totalCount = payload[0].data.total
        // toast.success("Succsessfull getGuestUsers");
      })
      .addCase(getGuestUsers.rejected, (state, { payload }) => {
        state.loading = false;
        toast.error(payload);
      });

    // getGuestUserById
    builder
    .addCase(getGuestUserById.pending, (state, { payload }) => {
      state.loading = true
      state.findGuestUsers = null
    })
    .addCase(getGuestUserById.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.findGuestUsers = payload[0].data
      // toast.success("Succsessfull getGuestUserById");
    })
    .addCase(getGuestUserById.rejected, (state, { payload }) => {
      state.loading = false;
      toast.error(payload);
    });

    // addGuestUser
    builder
      .addCase(addGuestUser.pending, (state, { payload }) => {
        state.loading = true
      })
      .addCase(addGuestUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        toast.success("Succsessfull addGuestUser");
      })
      .addCase(addGuestUser.rejected, (state, { payload }) => {
        state.loading = false;
        toast.error(payload);
      });

      // updateGuestUser
    builder
    .addCase(updateGuestUser.pending, (state, { payload }) => {
      state.loading = true
    })
    .addCase(updateGuestUser.fulfilled, (state, { payload }) => {
      state.loading = false;
      toast.success("Succsessfull updateGuestUser");
    })
    .addCase(updateGuestUser.rejected, (state, { payload }) => {
      state.loading = false;
      toast.error(payload);
    });

    // deleteGuestUser
    builder
      .addCase(deleteGuestUser.pending, (state, { payload }) => {
        state.loading = true
      })
      .addCase(deleteGuestUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        toast.success("Succsessfull deleteGuestUser");
      })
      .addCase(deleteGuestUser.rejected, (state, { payload }) => {
        state.loading = false;
        toast.error(payload);
      });
  },
});

export const { setCurrentPage } =
  guestUsersSlice.actions;
export default guestUsersSlice.reducer;
