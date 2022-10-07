import { z } from 'zod'

const labelColor = z.object({
  backgroundColor: z.string(),
  textColor: z.string(),
})

export const labelIdName = z.object({
  id: z.string(),
  name: z.string(),
})

export const labelState = z.object({
  labelIds: z.array(z.string()),
  loadedInbox: z.array(z.string()),
  storageLabels: z.array(labelIdName),
})

export const googleLabel = z
  .object({
    labelListVisibility: z.string().optional(),
    messageListVisibility: z.string().optional(),
    color: labelColor.optional(),
    type: z.string(),
    threadsTotal: z.number().optional(),
    threadsUnread: z.number().optional(),
  })
  .and(labelIdName)

export type GoogleLabel = z.infer<typeof googleLabel>
export type LabelIdName = z.infer<typeof labelIdName>
export type LabelState = z.infer<typeof labelState>
