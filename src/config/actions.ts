
import api from '@/config/axios';
import { API_LOGIN_ENDPOINT, API_GET_PROFILE_ENDPOINT, API_REGISTER_ENDPOINT, API_PUT_PROFILE_ENDPOINT, API_ADD_PROFILE_ENDPOINT } from '@/config/constants';
import { ResponseType, LoginRegisterPayload, PostProfileType } from '@/utils/types';
import axios from 'axios';

export async function SignIn(payload: LoginRegisterPayload) {
  try {
    const res = await api.post(API_LOGIN_ENDPOINT, payload)
    return res.data
  } catch (error) {
    if (axios.isAxiosError<ResponseType>(error)) {
      return error.response?.data
    }
    return { error: '', message: ['Something else went wrong'], statusCode: 500 }
  }
}

export async function SignUp(payload: LoginRegisterPayload) {
  try {
    const res = await api.post(API_REGISTER_ENDPOINT, payload)
    return res.data
  } catch (error: unknown) {
    if (axios.isAxiosError<ResponseType>(error)) {
      return error.response?.data
    }
    return { error: '', message: ['Something else went wrong'], statusCode: 500 }
  }
}

export async function getProfile(access_token: string) {
  try {
    const res = await api.get(API_GET_PROFILE_ENDPOINT,
      { 
        headers: {
          'x-access-token': access_token
        }
      })
    return res.data
  } catch (error: unknown) {
    if (axios.isAxiosError<ResponseType>(error)) {
      return error.response?.data
    }
    return { error: '', message: ['Something else went wrong'], statusCode: 500 }
  }
}

export async function createProfile(access_token: string, payload: PostProfileType) {
  try {
    const res = await api.post(API_ADD_PROFILE_ENDPOINT, payload, { 
      headers: {
        'x-access-token': access_token
      },
    })
    return res.data
  } catch (error: unknown) {
    if (axios.isAxiosError<ResponseType>(error)) {
      return error.response?.data
    }
    return { error: '', message: ['Something else went wrong'], statusCode: 500 }
  }
}

export async function updateProfile(access_token: string,  payload: PostProfileType) {
  try {
    const res = await api.put(API_PUT_PROFILE_ENDPOINT, payload,
      { 
        headers: {
          'x-access-token': access_token
        },
      })
    return res.data
  } catch (error: unknown) {
    if (axios.isAxiosError<ResponseType>(error)) {
      return error.response?.data
    }
    return { error: '', message: ['Something else went wrong'], statusCode: 500 }
  }
}