export interface OpenDraftEmailType {
  messageId: string
  id: string
}

export interface DraftDetails {
  draftId: string
}

export interface FullEmailType {
  historyId: string
  id: string
  internalDate: string
  labelIds: string[]
  payload: {
    body: any
    headers: any
    files: any
  }
  mimeType: string
  threadId: string
  snippet: string
}

export interface EnhancedDraftDetails {
  draft: {
    id: string
    message: Partial<FullEmailType>
  }
}

export interface MessagePayload {
  name: string
  value?: string
}

export interface IDraftDetailObject {
  id: string
  message: {
    id: string
    threadId: string
    labelIds: string[]
  }
}

export interface DraftsState {
  draftList: IDraftDetailObject[]
}
