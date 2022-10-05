import { z } from 'zod'
import { errorHandling, instance } from './api'

const UserTypeSchema = z.object({
  emailAddress: z.string().nullish(),
  historyId: z.string().nullish(),
  messagesTotal: z.number().nullish(),
  threadsTotal: z.number().nullish(),
})

const responseSchema = z.object({
  config: z.any(),
  method: z.any(),
  headers: z.any(),
  request: z.any(),
  status: z.number(),
  statusText: z.string(),
})

const credentialsSchema = z.object({
  access_token: z.string(),
  expiry_date: z.number(),
  id_token: z.string(),
  token_type: z.string(),
  refresh_token: z.string(),
  scope: z.string(),
})
const UserSchema = responseSchema.extend({ data: UserTypeSchema })
const stringResponseSchema = responseSchema.extend({ data: z.string() })
const authCallbackSchema = responseSchema.extend({ data: credentialsSchema })

const userApi = () => ({
  authGoogle: async (noSession?: boolean) => {
    try {
      const res = await instance.post(`/api/auth/oauth/google/`, { noSession })
      return stringResponseSchema.parse(res)
    } catch (err: any) {
      return errorHandling(err)
    }
  },
  authGoogleCallback: async (body: { code?: string; state?: string }) => {
    try {
      const res = await instance.post(`/api/auth/oauth/google/callback/`, body)
      return authCallbackSchema.parse(res)
    } catch (err: any) {
      return errorHandling(err)
    }
  },
  fetchUser: async () => {
    try {
      const res = await instance.get(`/api/user`)
      return UserSchema.parse(res)
    } catch (err: any) {
      return errorHandling(err)
    }
  },
  logoutUser: async () => {
    try {
      const res = await instance.get(`/api/user/logout`)
      return stringResponseSchema.parse(res)
    } catch (err: any) {
      return errorHandling(err)
    }
  },
})

export default userApi
