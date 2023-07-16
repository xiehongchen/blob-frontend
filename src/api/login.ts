import request from '@/utils/request.ts'

interface loginFormData {
  username: string
  password: string
}
interface ResponseData {
  code: number
  message: string
  ok: boolean
}

interface loginResponseData extends ResponseData {
  token: string
}
enum API {
  LOGIN_URL = '/users/logIn',
}

export const reqLogin = (data: loginFormData) =>
  request.get<any, loginResponseData>(API.LOGIN_URL, { params: data })
