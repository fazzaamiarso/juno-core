import { IEmailAttachmentType } from '../components/EmailDetail/Attachment/EmailAttachmentTypes'
import messageApi from '../data/messageApi'
import base64toBlob from './base64toBlob'

/**
 * @function convertB64AttachmentToFile
 * @param {object} - takes in the id of the message and the attachment files as an array
 * @returns a File object representing the attachment files.
 */

export default async function convertB64AttachmentToFile({
  id,
  files,
}: {
  id: string
  files: IEmailAttachmentType[]
}) {
  if (files && id) {
    const buffer: Promise<any>[] = []
    for (let i = 0; i < files.length; i += 1) {
      const loopFile = files[i]
      if (loopFile?.body?.attachmentId) {
        buffer.push(
          messageApi().getAttachment({
            messageId: id,
            attachmentId: loopFile.body.attachmentId,
          })
        )
      }
    }
    const result = await Promise.all(buffer)

    const output: File[] = []
    for (let i = 0; i < files.length; i += 1) {
      const base64Data = result[i]?.data?.data
      const blobData = base64toBlob({
        base64Data,
        mimeType: files[i].mimeType,
      })
      const file = new File([blobData], files[i].filename, {
        type: files[i].mimeType,
      })
      output.push(file)
    }
    return output
  }
  return []
}
