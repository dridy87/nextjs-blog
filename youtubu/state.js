import createReducer from '../common/createReducer';
import useSwr, { mutate } from 'swr';
import axios from 'axios';

const SET = 'youtubu/SET';
const SETID = 'youtubu/SETID';

export const setData = youtubu => ({ type: SET, youtubu });

export const setYoutubuID = youtubu => ({ type: SETID, youtubu });


const INITIAL_STATE = { youtubuList: [], currentID: 'XxVg_s8xAms' };

const reducer = createReducer(INITIAL_STATE, {
    [SET]: (state, action) =>
        (state.youtubuList = action.youtubu.youtubuList),
    [SETID]: (state, action) =>
        (state.currentID = action.youtubu.currentID)
})

export default reducer;