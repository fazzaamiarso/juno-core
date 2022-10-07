import { z } from 'zod'

const emailMessageHeaders = z.object({
  date: z.string(),
  from: z.string(),
  subject: z.string(),
  to: z.string(),
  cc: z.string(),
  bcc: z.string(),
})
type IEmailMessageHeaders = z.infer<typeof emailMessageHeaders>

export interface IEmailMessagePayloadRaw {
  partId: string
  mimeType: string
  filename: string
  headers: IEmailMessageHeaders
  body: {
    data?: string
    attachmentId?: string
    size: number
  }
  parts?: IEmailMessagePayloadRaw[]
}

// Types with self-reference needed to have a "type hint"
// https://github.com/colinhacks/zod#recursive-types
const emailMessagePayloadRaw: z.ZodType<IEmailMessagePayloadRaw> = z.lazy(() =>
  z.object({
    partId: z.string(),
    filename: z.string(),
    mimeType: z.string(),
    headers: emailMessageHeaders,
    body: z.object({
      data: z.string().optional(),
      attachmentId: z.string().optional(),
      size: z.number(),
    }),
    parts: z.array(emailMessagePayloadRaw).optional(),
  })
)

const emailMessagePayloadConverted = z.object({
  mimeType: z.string(),
  headers: emailMessageHeaders,
  files: z.array(emailMessagePayloadRaw).optional(),
  body: z.object({
    emailFileHTML: z.array(z.any()),
    emailHTML: z.string(),
    removedTrackers: z.array(z.string()),
  }),
  parts: z.array(emailMessagePayloadRaw).optional(),
})

const emailMessage = z.object({
  id: z.string(),
  threadId: z.string(),
  labelIds: z.array(z.string()),
  snippet: z.string(),
  sizeEstimate: z.number(),
  historyId: z.string(),
  internalDate: z.string(),
  payload: emailMessagePayloadConverted,
})

const emailListThreadItem = z.object({
  id: z.string(),
  historyId: z.string(),
  messages: z.array(emailMessage),
})

const emailListObject = z.object({
  labels: z.array(z.string()),
  threads: z.array(emailListThreadItem),
  nextPageToken: z.string().nullish(),
  resultSizeEstimate: z.number().optional(),
  timestamp: z.number().optional(),
  q: z.string().optional(),
})

const emailListState = z.object({
  emailList: z.array(emailListObject),
  selectedEmails: z.array(z.string()),
  searchList: emailListObject.nullable(),
  activeEmailListIndex: z.number(),
  isFetching: z.boolean(),
})

const emailBaseList = z.array(
  z.object({
    labels: z.array(z.string()),
    threads: z.array(emailListThreadItem),
    nextPageToken: z.null(),
  })
)

// type IEmailMessagePayloadConverted = z.infer<
//   typeof emailMessagePayloadConverted
// >
export type IEmailMessage = z.infer<typeof emailMessage>
export type IEmailListThreadItem = z.infer<typeof emailListThreadItem>
export type IEmailListObject = z.infer<typeof emailListObject>
export type IEmailListState = z.infer<typeof emailListState>
export type TBaseEmailList = z.infer<typeof emailBaseList>
