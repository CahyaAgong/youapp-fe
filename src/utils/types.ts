export interface LoginRegisterPayload {
  email: string;
  username: string;
  password: string;
  confirm_password?: string
}

export interface ResponseType { 
  error?: string;
  message: string[];
  statusCode: number;
  access_token?: string 
  data?: ProfileType
}

export interface PostProfileType {
  name: string,
  birthday: string,
  height: number,
  weight: number,
  interests?: string[]
  username?: string
  horoscope?: string
  zodiac?: string
}

interface ProfileType {
  email: string;
  username: string;
  name: string,
  birthday: string,
  height: number,
  weight: number,
  interests: string[]
  horoscope?: string
  zodiac?: string
}