import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface UserProps {
  value: {
    email: string;
    gender: boolean;
  };
}

type SignInUserType = {
  email: string;
  gender: boolean;
};

const initialState: UserProps = {
  value: {
    email: '',
    gender: true,
  },
};

export const userSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    loginEmail: (state, action: PayloadAction<SignInUserType>) => {
      const { email, gender } = action.payload;
      state.value.email = email;
      state.value.gender = gender;
    },
  },
});

export const { loginEmail } = userSlice.actions;
export default userSlice.reducer;
