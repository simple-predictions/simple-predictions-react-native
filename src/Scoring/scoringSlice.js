import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { baseUrl } from '../globals';

export const getScoredPreds = createAsyncThunk(
  'scoring/getScoredPreds',
  async ([username, gameweek], { getState }) => new Promise((resolve) => {
    const gameweekReq = gameweek || getState().scoring.selectedGameweek;
    const usernameReq = username || getState().scoring.selectedUser;
    let url;
    if (usernameReq && usernameReq !== 'Mine') {
      url = `${baseUrl}/friendpredictions?username=${usernameReq}&gameweek=${gameweekReq}`;
    } else {
      url = `${baseUrl}/getuserpredictions?gameweek=${gameweekReq}`;
    }

    return fetch(url, { credentials: 'include' }).then((response) => response.json()).then((res) => {
      const gameweekNum = res.gameweek;
      const { data } = res;
      const finalGamesArr = [];
      for (let i = 0; i < data.length; i += 1) {
        const game = data[i];
        if (game.user_predictions.length === 0) {
          game.user_predictions.push({ home_pred: '-', away_pred: '-' });
        }
        if (new Date(game.kick_off_time).getTime() < Date.now()) {
          game.locked = true;
        } else {
          game.locked = false;
        }
        game.kick_off_time = new Date(game.kick_off_time).toISOString();
        finalGamesArr.push(game);
      }

      resolve({
        gameweek: gameweekNum,
        matches: finalGamesArr,
        username: usernameReq,
      });
    });
  }),
);

export const scoringSlice = createSlice({
  name: 'scoring',
  initialState: {
    selectedUser: 'Mine',
    selectedGameweek: 0,
    matches: {},
    status: 'idle',
    currentGameweek: 0,
  },
  reducers: {},
  extraReducers: {
    [getScoredPreds.fulfilled]: (state, action) => {
      state.matches[action.payload.gameweek] = {};
      state.matches[action.payload.gameweek][action.payload.username] = action.payload.matches;
      state.selectedGameweek = action.payload.gameweek;
      state.selectedUser = action.payload.username;
      if (state.currentGameweek === 0) {
        state.currentGameweek = action.payload.gameweek;
      }
      state.status = 'success';
    },
    [getScoredPreds.pending]: (state) => {
      state.status = 'pending';
    },
  },
});

export const selectScoredMatches = (state) => {
  if (!state.scoring.matches[state.scoring.selectedGameweek]) {
    return [];
  }
  return state.scoring.matches[state.scoring.selectedGameweek][state.scoring.selectedUser].filter(
    (val) => new Date(val.kick_off_time) < Date.now(),
  );
};
export const selectSelectedGameweek = (state) => state.scoring.selectedGameweek;
export const selectScoringStatus = (state) => state.scoring.status;
export const selectFeatureMatches = (state) => {
  if (state.scoring.status !== 'success') {
    return { name: '', matches: [] };
  }

  const matches = state.scoring.matches[state.scoring.currentGameweek].Mine;
  const liveMatches = matches.filter((match) => match.status && match.status !== 'FINISHED' && match.status !== 'SCHEDULED');
  if (liveMatches.length > 0) {
    return { name: 'Live Matches', matches: liveMatches };
  }

  const nextKickOffTime = matches.find(
    (match) => new Date(match.kick_off_time) > Date.now(),
  ).kick_off_time;

  const nextMatches = matches.filter((match) => match.kick_off_time === nextKickOffTime);
  if (nextMatches.length > 0) {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const dateTime = new Date(nextKickOffTime);
    const kickOffTimeStr = `${dateTime.getDate()} ${monthNames[dateTime.getMonth()]} at ${dateTime.getHours()}.${dateTime.getMinutes()}`;
    return { name: `Upcoming games:\n${kickOffTimeStr}`, matches: nextMatches };
  }

  const lastMatch = [matches[-1]];
  return { name: 'Last Match', lastMatch };
};

export default scoringSlice.reducer;
