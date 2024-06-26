import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: localStorage.getItem('isAuthenticated') === 'true',
  username: localStorage.getItem('username') || null,
  fullname: localStorage.getItem('fullname') || null,
  sessionKey: localStorage.getItem('sessionKey') || null,
  role: localStorage.getItem('role') || null,
  email: localStorage.getItem('email') || null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.username = action.payload.username;
      state.fullname = action.payload.fullname;
      state.sessionKey = action.payload.sessionKey;
      state.role = action.payload.role; 
      state.email = action.payload.email; 

      localStorage.setItem('isAuthenticated', true);
      localStorage.setItem('username', action.payload.username);
      localStorage.setItem('fullname', action.payload.fullname);
      localStorage.setItem('sessionKey', action.payload.sessionKey);
      localStorage.setItem('role', action.payload.role);
      localStorage.setItem('email', action.payload.email);
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.username = null;
      state.fullname = null;
      state.sessionKey = null;
      state.role = null;
      state.email = null;

      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('username');
      localStorage.removeItem('fullname');
      localStorage.removeItem('sessionKey');
      localStorage.removeItem('role');
      localStorage.removeItem('email');
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
