import React from 'react'
import PropTypes from 'prop-types'
import styled, { keyframes } from 'styled-components'
import { LinkContainer } from 'react-router-bootstrap'
import { Icon, Text } from 'blockchain-info-components'
import { FormattedMessage } from 'react-intl'

const reveal = keyframes`
  0% { top: 30px; }
  15% { top: 0; }
  25% { top: 0; }
  50% { top: 0; }
  75% { top: 0; }
  85% { top: 0; }
  100% { top: -30px; }
`

const ItemWrapper = styled.div`
  display: flex;
  align-items: center;
`
const Action = styled(Text)`
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`
const EmailSentNotification = styled(Text)`
  &.active {
    animation: ${reveal} 3s 1;
  }
  position: relative;
  top: -30px;
  @media (max-width: 1023px) {
    display: none;
  }
`

const EmailReminder = props => {
  const { handleResend, reminded, email } = props

  return (
    <React.Fragment>
      <ItemWrapper>
        <Icon name='email' color='white' weight={600} />
        <Text style={{ marginLeft: '12px' }} color='white' size='14px'>
          <FormattedMessage
            id='layouts.wallet.header.announcements.emailreminder'
            defaultMessage='Confirm your email address to properly secure your account'
          />
        </Text>
        <span>&nbsp;</span>
        <EmailSentNotification
          color='white'
          size='14px'
          className={reminded ? 'active' : ''}
        >
          <FormattedMessage
            id='layouts.wallet.header.announcements.emailreminder.emailsent'
            defaultMessage='- An email was sent to {email}'
            values={{ email }}
          />
        </EmailSentNotification>
      </ItemWrapper>
      <ItemWrapper>
        <Action color='white' size='14px' onClick={() => handleResend(email)}>
          <FormattedMessage
            id='layouts.wallet.header.announcements.emailreminder.resend'
            defaultMessage='Resend Email'
          />
        </Action>
        <LinkContainer
          style={{ marginLeft: '15px' }}
          to={{ pathname: '/security-center', state: { changeEmail: true } }}
        >
          <Action color='white' size='14px'>
            <FormattedMessage
              id='layouts.wallet.header.announcements.emailreminder.change'
              defaultMessage='Change Email'
            />
          </Action>
        </LinkContainer>
      </ItemWrapper>
    </React.Fragment>
  )
}

EmailReminder.propTypes = {
  email: PropTypes.string.isRequired,
  reminded: PropTypes.bool.isRequired,
  handleResend: PropTypes.func.isRequired
}

export default EmailReminder
