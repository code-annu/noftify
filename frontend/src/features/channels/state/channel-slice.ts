import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { NoftifyError } from "../../../util/ErrorHandlerUtil";
import type { ChannelList } from "../data/types";
import { getAppChannelsThunk } from "./channel-thunk";

export interface ChannelState {
  channels: {
    data: ChannelList | null;
    error: NoftifyError | null;
    isLoading: boolean;
  };
}

const initialState: ChannelState = {
  channels: {
    data: null,
    error: null,
    isLoading: false,
  },
};

const channelSlice = createSlice({
  name: "channels",
  initialState,
  reducers: {
    setChannels: (state, action: PayloadAction<ChannelList | null>) => {
      state.channels.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAppChannelsThunk.pending, (state) => {
        state.channels.isLoading = true;
        state.channels.error = null;
      })
      .addCase(getAppChannelsThunk.fulfilled, (state, action) => {
        state.channels.isLoading = false;
        state.channels.data = action.payload;
        state.channels.error = null;
      })
      .addCase(getAppChannelsThunk.rejected, (state, action) => {
        state.channels.isLoading = false;
        state.channels.error = action.payload || null;
      });
  },
});

export const { setChannels } = channelSlice.actions;
export default channelSlice.reducer;
