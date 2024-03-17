import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: localStorage.getItem('isAuthenticated') === 'true',
  username: localStorage.getItem('username') || null,
  sessionKey: localStorage.getItem('sessionKey') || null,
  role: localStorage.getItem('role') || null,
};

export const authSlice = createSlice({
  name: 'auth',
  
  initialState,
  
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.username = action.payload.username;
      state.sessionKey = action.payload.sessionKey;
      state.role = action.payload.role; 

      localStorage.setItem('isAuthenticated', true);
      localStorage.setItem('username', action.payload.username);
      localStorage.setItem('sessionKey', action.payload.sessionKey);
      localStorage.setItem('role', action.payload.role);
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.username = null;
      state.sessionKey = null;
      state.role = null;

      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('username');
      localStorage.removeItem('sessionKey');
      localStorage.removeItem('role');
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
