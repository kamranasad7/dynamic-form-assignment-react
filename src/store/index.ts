import { configureStore, createSlice } from '@reduxjs/toolkit'

export interface GlobalStore {
    validationErrors: Record<string, string>;
    submittedData: Record<string, string> | null;
    resultsModalOpen: boolean;
}

const initialState: GlobalStore = {
    validationErrors: { },
    submittedData: null,
    resultsModalOpen: false
}

const globalSlice = createSlice({
    name: 'global',
    initialState,
    reducers: {
        setValidationErrors: (state, action) => {
            state.validationErrors = action.payload
        },
        submitData: (state, action) => {
            state.submittedData = action.payload
        },
        setResultsModal: (state, action) => {
            state.resultsModalOpen = action.payload;
        }
    },
  })
  

export default configureStore({
    reducer: {
        global: globalSlice.reducer,
    },
})

export const { submitData, setValidationErrors, setResultsModal } = globalSlice.actions;
