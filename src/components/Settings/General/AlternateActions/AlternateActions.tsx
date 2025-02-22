import { FormControlLabel, Switch } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../../../store/hooks'
import * as S from '../../SettingsStyles'
import * as GS from '../../../../styles/globalStyles'
import {
  selectAlternateActions,
  selectSettingsLabelId,
  setAlternateActions,
} from '../../../../store/utilsSlice'
import updateSettingsLabel from '../../../../utils/settings/updateSettingsLabel'
import { QiAlt } from '../../../../images/svgIcons/quillIcons'

const HEADER = 'Alternate actions'
const BODY =
  'On the email detail page the application offers two options on one location. These options are stacked and can be alterated by pressing the ALT key.'
const BODY_1 = 'By default the alternative action is deprioritized.'
const SWITCH_LABEL = 'Prioritize alternate actions'

const AlternateActions = () => {
  const dispatch = useAppDispatch()
  const settingsLabelId = useAppSelector(selectSettingsLabelId)
  const alternateActions = useAppSelector(selectAlternateActions)

  const alternateActionHandeler = (event: any) => {
    if (!event.target.checked) {
      localStorage.setItem('alternateActions', 'false')
      dispatch(setAlternateActions(false))
      updateSettingsLabel({
        settingsLabelId,
        alternateActions: false,
      })
    } else {
      localStorage.setItem('alternateActions', 'true')
      dispatch(setAlternateActions(true))
      updateSettingsLabel({
        settingsLabelId,
        alternateActions: true,
      })
    }
  }

  return (
    <S.PageSection>
      <p>{HEADER}</p>
      <QiAlt />
      <GS.TextMutedParagraph>{BODY}</GS.TextMutedParagraph>
      <GS.TextMutedParagraph>{BODY_1}</GS.TextMutedParagraph>
      <FormControlLabel
        label={SWITCH_LABEL}
        control={
          <Switch
            onClick={alternateActionHandeler}
            checked={alternateActions}
            color="secondary"
          />
        }
      />
    </S.PageSection>
  )
}

export default AlternateActions
