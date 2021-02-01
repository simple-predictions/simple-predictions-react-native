import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../User/userSlice';
import predictionsReducer from '../Predictions/predictionsSlice';
import minileaguesReducer from '../MiniLeagues/minileaguesSlice';
import scoringReducer from '../Scoring/scoringSlice';
import colorSchemeReducer from '../ColorScheme/colorSchemeSlice';

export default configureStore({
  reducer: {
    user: userReducer,
    predictions: predictionsReducer,
    minileagues: minileaguesReducer,
    scoring: scoringReducer,
    colorScheme: colorSchemeReducer,
  },
});
