import { createSlice } from "@reduxjs/toolkit";
export const counterSlice = createSlice({
  name: "counter",
  initialState: {
    value: 0,
  },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});
export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export const selectCount = (state) => state.counter.value;
export default counterSlice.reducer;
export const incrementAsync = (amount) => (dispatch) => {
  setTimeout(() => {
    dispatch(incrementByAmount(amount));
  }, 1000);
};
export const logAndAdd = (amount) => {
  return (dispatch, getState) => {
    const stateBefore = getState();
    console.log(stateBefore);
    console.log(`Counter before: ${stateBefore.counter}`);
    dispatch(incrementByAmount(amount));
    const stateAfter = getState();
    console.log(`Counter after: ${stateAfter.counter}`);
    console.log(stateAfter);
  };
};
