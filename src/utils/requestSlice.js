import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "requests",
  initialState: null,
  reducers: {
    addrequest: (state, action) => {
      return action.payload;
    },
    removeRequest : (state , action)=> {
      const newArray = state.filter((r)=> r._id !== action.payload);
      return newArray;
    }
  },
});

export const { addrequest , removeRequest } = requestSlice.actions;
export default requestSlice.reducer;
