import { updateEmailLabel } from '../store/emailListSlice'
import * as global from '../constants/globalConstants'
import { AppDispatch } from '../store/store'

interface IMarkEmailAsRead {
  dispatch: AppDispatch
  labelIds: string[]
  threadId: string
}

/**
 * @function markEmailAsRead
 * @param IMarkEmailAsRead - takes in labelIds and threadId to update the message's labels.
 * The output of the function is to remove the unread label.
 */

const markEmailAsRead = ({
  dispatch,
  labelIds,
  threadId,
}: IMarkEmailAsRead) => {
  if (threadId.length > 0 && dispatch) {
    dispatch(
      updateEmailLabel({
        threadId,
        request: {
          removeLabelIds: [global.UNREAD_LABEL],
        },
        labelIds,
      })
    )
  }
}

export default markEmailAsRead
