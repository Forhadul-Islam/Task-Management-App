import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tabs: {
    allTabs: ["All Tasks", "Team Play"],
    currentTab: "All Tasks",
  },
  status: {
    allStatus: ["Completed", "In Progress", "Pending"],
  },
  openFormModal: false,
  editMode: false,
  editableTask: null,
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    changeTab: (state, action) => {
      state.tabs.currentTab = action.payload;
    },
    toggleEditMode: (state, action) => (state.editMode = action.payload),
  },
});

export const { changeTab, toggleEditMode } = settingsSlice.actions;
export default settingsSlice.reducer;
