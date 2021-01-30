import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../User/userSlice';
import predictionsReducer from '../Predictions/predictionsSlice';
import minileaguesReducer from '../MiniLeagues/minileaguesSlice';

export default configureStore({
  reducer: {
    user: userReducer,
    predictions: predictionsReducer,
    minileagues: minileaguesReducer,
  },
});
