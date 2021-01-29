import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../User/userSlice';
import predictionsReducer from '../Predictions/predictionsSlice';

export default configureStore({
  reducer: {
    user: userReducer,
    predictions: predictionsReducer,
  },
});
