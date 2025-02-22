import * as local from '../../../constants/filesOverviewConstants'
import { selectProfile } from '../../../store/baseSlice'
import {
  selectIsForwarding,
  selectIsReplying,
} from '../../../store/emailDetailSlice'
import { useAppSelector } from '../../../store/hooks'
import { IEmailListThreadItem } from '../../../store/storeTypes/emailListTypes'
import countUniqueFiles from '../../../utils/countUniqueFiles'
import EmailAvatar from '../../Elements/Avatar/EmailAvatar'
import ContactCard from '../../Elements/ContactCard/ContactCard'
import senderNameFull from '../../Elements/SenderName/senderNameFull'
import senderNamePartial from '../../Elements/SenderName/senderNamePartial'
import StyledCircularProgress from '../../Elements/StyledCircularProgress'
import TimeStampDisplay from '../../Elements/TimeStamp/TimeStampDisplay'
import EmailAttachmentBubble from '../Attachment/EmailAttachmentBubble'
import * as ES from '../EmailDetailStyles'
import DownloadButtonMultiple from './DownloadFileMultiple'
import * as S from './FilesOverviewStyles'

interface IFilesOverview {
  threadDetail: IEmailListThreadItem | null
  isLoading: boolean
}

const MappedFiles = ({
  threadDetail,
}: {
  threadDetail: IEmailListThreadItem
}) => {
  const { emailAddress } = useAppSelector(selectProfile)
  return (
    threadDetail?.messages && (
      <div>
        <S.DownloadAllContainer>
          <DownloadButtonMultiple
            filesObjectArray={threadDetail.messages.map((message) => ({
              id: message.id,
              files: message.payload.files,
            }))}
          />
        </S.DownloadAllContainer>
        {threadDetail.messages
          .slice(0)
          .reverse()
          .map((message) => {
            const staticSenderNameFull = senderNameFull(
              message.payload.headers?.from,
              emailAddress
            )
            const staticSenderNamePartial = senderNamePartial(
              message.payload.headers?.from,
              emailAddress
            )

            if (message?.payload?.files && message.payload.files.length > 0) {
              return (
                <S.FileEmailRow key={message.id}>
                  <S.NameOptionsRow>
                    <S.AvatarName>
                      <ContactCard
                        offset={[30, 10]}
                        avatarURL={staticSenderNameFull}
                        contact={staticSenderNamePartial}
                      >
                        <EmailAvatar avatarURL={staticSenderNameFull} />
                      </ContactCard>
                      <span>{staticSenderNameFull}</span>
                    </S.AvatarName>
                    <S.DownloadTimestampRow>
                      {message.payload.files.length > 1 && (
                        <DownloadButtonMultiple
                          filesObjectArray={[
                            { id: message.id, files: message.payload.files },
                          ]}
                        />
                      )}
                      <TimeStampDisplay
                        threadTimeStamp={message.internalDate}
                      />
                    </S.DownloadTimestampRow>
                  </S.NameOptionsRow>
                  <S.BubbleWrapper>
                    {message.payload.files.map((item) => (
                      <EmailAttachmentBubble
                        attachmentData={item}
                        messageId={message.id}
                        key={item.body.attachmentId}
                      />
                    ))}
                  </S.BubbleWrapper>
                </S.FileEmailRow>
              )
            }
            return null
          })}
      </div>
    )
  )
}

const FilesOverview = ({ threadDetail, isLoading }: IFilesOverview) => {
  const isReplying = useAppSelector(selectIsReplying)
  const isForwarding = useAppSelector(selectIsForwarding)

  return (
    <ES.DetailRow>
      <ES.EmailDetailContainer tabbedView={isReplying || isForwarding}>
        <S.FilesWrapper>
          {!isLoading && threadDetail && countUniqueFiles(threadDetail) > 0 ? (
            <MappedFiles threadDetail={threadDetail} />
          ) : (
            <span data-test-id="no-files-overview">{local.NO_FILES}</span>
          )}
          {isLoading && <StyledCircularProgress />}
        </S.FilesWrapper>
      </ES.EmailDetailContainer>
      <ES.EmailOptionsPlaceholder />
    </ES.DetailRow>
  )
}

export default FilesOverview
