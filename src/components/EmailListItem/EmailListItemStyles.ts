import styled from 'styled-components'
import * as global from '../../constants/globalConstants'

interface IThreadBaseProps {
  emailLabels: string[] | string
}

export const ThreadBase = styled.div<IThreadBaseProps>`
  font-weight: ${({ emailLabels }) =>
    emailLabels && emailLabels.includes(global.UNREAD_LABEL) ? '550' : '400'};
  position: relative;
  user-select: none;
  &:hover {
    text-decoration: none;
    cursor: pointer;
  }
`

interface IThreadRow {
  showLabel: boolean
  isFocused: boolean
}

export const ThreadRow = styled.div<IThreadRow>`
  position: relative;
  display: grid;
  grid-template-columns: ${({ showLabel }) =>
    !showLabel
      ? '30px 20px 215px auto max-content 105px 20px 30px'
      : '30px 20px 215px fit-content(450px) auto max-content 105px 20px 30px'};
  font-size: var(--small);
  height: 56px;
  background-color: ${({ isFocused }) =>
    isFocused ? `var(--color-neutral-200)` : 'transparent'};
  transition: background-color ease-in 0.125s;
  z-index: 2;
  border-radius: 5px;

  &:hover {
    background-color: var(--color-neutral-200);
    z-index: 2;
    border-radius: 5px;
  }
`

interface ICellCheckbox {
  inSelect: boolean
}

export const CellCheckbox = styled.div<ICellCheckbox>`
  opacity: ${({ inSelect }) => (inSelect ? 100 : 0)};
  margin-right: 16px;
  display: flex;
  place-items: center;

  &:hover {
    opacity: 100;
  }
`

export const CelUnread = styled.div`
  display: flex;
  place-items: center;
`

export const UnreadDot = styled.div`
  height: 5px;
  width: 5px;
  background-image: radial-gradient(
    circle at 100% -82%,
    rgb(119, 97, 245),
    rgb(118, 96, 245) 32%,
    rgb(31, 36, 238)
  );
  border-radius: 50%;
`

export const Avatars = styled.div`
  margin-right: 15px;
`

export const CellName = styled.div`
  -webkit-box-align: center;
  align-items: center;
  display: flex;
  flex-direction: row;
  user-select: none;
`

export const CellLabels = styled.div`
  -webkit-box-align: center;
  align-items: center;
  cursor: default;
  display: flex;
  flex-direction: row;
  min-width: 0px;
  overflow: hidden;
  padding-left: 15px;
  user-select: none;
  white-space: nowrap;
`

export const CellMessage = styled.div`
  -webkit-box-align: center;
  align-items: center;
  display: flex;
  flex-direction: row;
  min-width: 0;
  padding-left: 15px;
  white-space: nowrap;
`

export const CellAttachment = styled.div`
  -webkit-box-align: center;
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-self: end;
  padding-left: 10px;
`

export const CellDate = styled.div`
  text-align: right;
`

export const DatePosition = styled.div`
  -webkit-box-align: center;
  -webkit-box-pack: end;
  align-items: center;
  display: flex;
  flex-direction: row;
  height: 100%;
  justify-content: flex-end;
`

export const TruncatedSpan = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export const TruncatedDiv = styled.div`
  display: flex;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`
