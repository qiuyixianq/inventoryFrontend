import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Items } from '../../graphQL/Types';

const initialState: Array<Items | null> = [];

const itemSlice = createSlice({
    name: 'itemSlice',
    initialState,
    reducers: {
        updateItems: (state, action: PayloadAction<Array<Items>>) => {
            state = action.payload;
            return state;
        }
    }
});

export const { updateItems } = itemSlice.actions;
export default itemSlice.reducer;