import axios, { AxiosError, AxiosRequestConfig } from 'axios'
import { z } from 'zod'
import * as global from '../constants/globalConstants'
import assertNonNullish from '../utils/assertNonNullish'
import validateLocalSetup from '../utils/validateLocalSetup'

assertNonNullish(
  import.meta.env.VITE_BACKEND_URL,
  'Unable to find backend URL in environment'
)

validateLocalSetup(
  import.meta.env.VITE_BACKEND_URL,
  import.meta.env.VITE_USE_LOCAL_FRONTEND_CLOUD_BACKEND
)

export const BASE_API_URL = import.meta.env.VITE_BACKEND_URL.replace(/\/$/, '')

// const ErrorSchema = z
//   .object({
//     response: z.object({ data: z.any(), status: z.number() }).optional(),
//   })
//   .or(z.string())
//   .optional()
// type ErrorType = z.infer<typeof ErrorSchema>

export const fetchToken = () => {
  if (import.meta.env.VITE_USE_LOCAL_FRONTEND_CLOUD_BACKEND === 'true') {
    const credentials = localStorage.getItem(global.CREDENTIALS)
    return credentials
  }
  const token = localStorage.getItem(global.ID_TOKEN)
  return token
}
export const instance = axios.create({
  withCredentials:
    import.meta.env.VITE_USE_LOCAL_FRONTEND_CLOUD_BACKEND === 'false',
  baseURL: BASE_API_URL,
})

/**
 * Set an accessToken for all the urls within the system, barring the Google oAuth API and external api.
 */
instance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const accessToken = fetchToken()
    if (
      accessToken &&
      config.headers &&
      !config.url?.includes(`/api/auth/oauth/google/`) &&
      !config.url?.includes(import.meta.env.VITE_HEADLESS_FEEDBACK_URL)
    ) {
      // eslint-disable-next-line no-param-reassign
      config.headers.Authorization = `${accessToken}`
    }
    return config
  },
  (error) => {
    Promise.reject(error)
  }
)

export const errorHandling = async (
  err: any
): Promise<AxiosError<any, any> & { data?: any; isRetry: boolean }> => {
  process.env.NODE_ENV === 'development' && console.error(err)
  const originalRequest = err.config
  if (
    err?.response?.data === global.INVALID_TOKEN &&
    !err?.response?.request?.responseURL.includes('/refresh') &&
    !originalRequest.isRetry
  ) {
    originalRequest.isRetry = true
  }
  return err?.response?.data ?? err?.message
}
