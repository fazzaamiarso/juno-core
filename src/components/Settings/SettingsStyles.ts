import styled from 'styled-components'
import { Select, SelectProps } from '@mui/material'

export const SettingsContainer = styled.div`
  display: grid;
  grid-template-columns: 200px auto;
  margin-bottom: 20px;
`
export const SettingsSubHeader = styled.h3`
  font-weight: 200;
  margin: 0;
`

export const SettingsSidebar = styled.div``

export const StyledSelect = styled(Select)<SelectProps>`
  border: 0;
  width: 64px;
  height: 32px;
  font-size: 0.9rem;
  color: var(--color-black);
  background-color: transparent;
  margin-top: 16px;
  margin-right: 8px;
`

export const PageSection = styled.div`
  border-top: 1px solid var(--color-neutral-200);
`
