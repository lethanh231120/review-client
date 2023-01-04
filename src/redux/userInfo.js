import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { post } from '../api/products'
import { setCookie, STORAGEKEY } from '../utils/storage'

const initialState = {
  userInfo: {},
  isAuthenticated: false,
  message: ''
}

export const login = createAsyncThunk(
  'user/login',
  async(body) => {
    const signin = await post('reviews/auth/signin', body)
    const token = signin?.data.jwt.token
    const userInfo = signin?.data.profile
    setCookie(STORAGEKEY.ACCESS_TOKEN, token)
    setCookie(STORAGEKEY.USER_INFO, userInfo)
    return signin
  }
)

const userInfo = createSlice({
  name: 'userInfo',
  initialState,
  extraReducers: {
    // login
    [login.pending]: (state, action) => {
      state.message = 'loading'
    },
    [login.fulfilled]: (state, action) => {
      state.userInfo = action.payload?.data?.profile
      state.isAuthenticated = true
      state.message = 'success'
    },
    [login.rejected]: (state, action) => {
      state.message =
        'Get user info fail ! Please try again. If still fail, please contact to admin@demo.com'
    }
  },
  reducers: {
    resetUserInfo: (state, { payload }) => {
      return initialState
    }
  }
})
const { reducer, actions } = userInfo
export const { resetUserInfo } = actions

export default reducer
