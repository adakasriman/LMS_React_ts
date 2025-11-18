import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { allLoansApi } from '@api/endpoints/allLoansApi';
interface AllLoansState {
  columns: any[];
  allLoansList: any[];
  showColumnSettingsModal: boolean;
}

const initialState: AllLoansState = {
  columns: [],
  allLoansList: [],
  showColumnSettingsModal: false,
};

const allLoansSlice = createSlice({
  name: 'allLoans',
  initialState,
  reducers: {
    setShowColumnSettingsModal(state, action: PayloadAction<boolean>) {
      state.showColumnSettingsModal = action.payload;
    },
    setAllLoansList(state, action: PayloadAction<any[]>) {
      state.allLoansList = action.payload;
    },
    setColumns(state, action: PayloadAction<any[]>) {
      state.columns = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(allLoansApi.endpoints.getAllLoans.matchFulfilled, (state, { payload }) => {
      state.allLoansList = payload; // automatically updates list on API success
    });
  },
});

export const { setShowColumnSettingsModal, setAllLoansList, setColumns } = allLoansSlice.actions;
export default allLoansSlice.reducer;
