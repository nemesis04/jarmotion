import moment from 'moment'
import React from 'react'
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import styled from 'styled-components/native'
import { isUnacknowledge } from '../../domains/alert/AlertFunc'
import { IDisplayAlertItem } from '../../domains/alert/AlertTypes'
import TextButton, { TextButtonStyle } from '../uikit/buttons/TextButton'

interface IAlertItemProps {
  displayAlert: IDisplayAlertItem
}

interface IAlertStatus {
  unack: boolean
}

const AlertItemWrapper = styled.View<IAlertStatus>`
  border-radius: 10px;
  border-color: ${props => (props.unack ? 'red' : 'silver')}
  border-width: ${props => (props.unack ? 1 : 0.3)};
  border-style: solid;
  height: 80px;
  margin-top: 10px;
  padding: 9px;
`

const AlertItemTimeWrapper = styled.View`
  flex-direction: row;
`

const AlertItemTimeText = styled.Text<IAlertStatus>`
  font-family: poppins-light;
  ${props => (props.unack ? 'color: red;' : '')}
`

const AlertMessageTextWrapper = styled.View`
  margin-top: 10px;
  flex-direction: row;
`
const AlertMessageText = styled.Text<IAlertStatus>`
  font-family: poppins-bold;
  ${props => (props.unack ? 'color: red;' : '')}
`

const AlertItem = (props: IAlertItemProps) => {
  const unack = isUnacknowledge(props.displayAlert)
  return (
    <TouchableOpacity
      disabled={!unack}
      onPress={() => alert('Acknowledgement sent')}
    >
      <AlertItemWrapper unack={unack}>
        <AlertItemTimeWrapper>
          <AlertItemTimeText unack={unack}>
            {moment(props.displayAlert.sentAt).fromNow()}
          </AlertItemTimeText>
        </AlertItemTimeWrapper>
        <AlertMessageTextWrapper>
          <AlertMessageText unack={unack}>
            {props.displayAlert.message}
          </AlertMessageText>
        </AlertMessageTextWrapper>
      </AlertItemWrapper>
    </TouchableOpacity>
  )
}

export default AlertItem
