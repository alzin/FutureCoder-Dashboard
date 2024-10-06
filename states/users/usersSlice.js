import { createSlice } from "@reduxjs/toolkit";
import {
  getUsers,
  updateUser,
  deleteUser,
  getUserById,
  addUser
} from "./handleRequests";
import { toast } from "react-toastify";

const initialState = {
  users: null,
  findUser: null,
  totalCount: 0,
  currentPage: 1,
  loading: false,
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setCurrentPage: (state, { payload }) => {
      state.currentPage = payload;
    },
  },

  extraReducers: (builder) => {
    // getUsers
    builder
      .addCase(getUsers.pending, (state, { payload }) => {
        state.loading = true;
        state.users = null;
        state.totalCount = 0;
      })
      .addCase(getUsers.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.users = payload.data;
        state.totalCount = payload.total;
        // toast.success("Succsessfull getUsers");
      })
      .addCase(getUsers.rejected, (state, { payload }) => {
        state.loading = false;
        toast.error(payload);
      });

    // getUserById
    builder
      .addCase(getUserById.pending, (state, { payload }) => {
        state.loading = true;
        state.findUser = null;
      })
      .addCase(getUserById.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.findUser = payload;
        // toast.success("Succsessfull getUserById");
      })
      .addCase(getUserById.rejected, (state, { payload }) => {
        state.loading = false;
        toast.error(payload);
      });

    // addUser
    builder
      .addCase(addUser.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(addUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        toast.success("Succsessfull addUser");
      })
      .addCase(addUser.rejected, (state, { payload }) => {
        state.loading = false;
        toast.error(payload);
      });

    // updateUser
    builder
      .addCase(updateUser.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(updateUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        toast.success("Succsessfull updateUser");
      })
      .addCase(updateUser.rejected, (state, { payload }) => {
        state.loading = false;
        toast.error(payload);
      });

    // deleteUser
    builder
      .addCase(deleteUser.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(deleteUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        toast.success("Succsessfull deleteUser");
      })
      .addCase(deleteUser.rejected, (state, { payload }) => {
        state.loading = false;
        toast.error(payload);
      });
  },
});

export const { setCurrentPage } = usersSlice.actions;
export default usersSlice.reducer;
