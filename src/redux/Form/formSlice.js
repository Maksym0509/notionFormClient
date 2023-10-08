import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { formService } from "../../services/formService";

const initialState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
  code: null,
  tables: null,
  selectedTable: null,
  formId: null,
  formData: null,
};

const errorMessageHandler = (error) => {
  const message = error.response.data.error || error.message;
  return message;
};

export const getTables = createAsyncThunk(
  "form/getTables",
  async (data, thunkAPI) => {
    try {
      return await formService.getTables(data);
    } catch (error) {
      const message = errorMessageHandler(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getDatabase = createAsyncThunk(
  "form/getDatabase",
  async (data, thunkAPI) => {
    try {
      return await formService.getDatabase(data);
    } catch (error) {
      const message = errorMessageHandler(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getForm = createAsyncThunk(
  "form/getForm",
  async (data, thunkAPI) => {
    try {
      return await formService.getForm(data);
    } catch (error) {
      const message = errorMessageHandler(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const save = createAsyncThunk("form/save", async (data, thunkAPI) => {
  try {
    return await formService.save(data);
  } catch (error) {
    const message = errorMessageHandler(error);
    return thunkAPI.rejectWithValue(message);
  }
});

export const publish = createAsyncThunk(
  "form/publish",
  async (data, thunkAPI) => {
    try {
      return await formService.publish(data);
    } catch (error) {
      const message = errorMessageHandler(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    formReset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.previewVisibility = false;
      state.message = "";
    },
    setCode: (state, action) => {
      state.code = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTables.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getTables.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.tables = action.payload.data;
      localStorage.setItem("selectedTable", null);
    });
    builder.addCase(getTables.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    builder.addCase(getDatabase.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getDatabase.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.tables = action.payload.data;
    });
    builder.addCase(getDatabase.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    builder.addCase(getForm.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getForm.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.formData = action.payload.data[0].data;
      state.selectedTable = action.payload.data[0].notionDBID;
    });
    builder.addCase(getForm.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    builder.addCase(save.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(save.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.message = action.payload.message;
    });
    builder.addCase(save.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    builder.addCase(publish.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(publish.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.formId = action.payload.uniqueId;
      state.message = action.payload.message;
    });
    builder.addCase(publish.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });
  },
});

export const { formReset, setCode } = formSlice.actions;
export default formSlice.reducer;
