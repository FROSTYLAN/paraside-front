import React from 'react'
import PropTypes from 'prop-types'
import { LinkAccount } from './link-account'
import { UnlinkAccount } from './unlink-account'

export const LinkedAccount = ({ accountType, account, disabled, refetch }) => {
  const ValueAction = () => {
    if (account) {
      return (
        <UnlinkAccount
          accountType={accountType}
          account={account}
          disabled={disabled}
          refetch={refetch}
        />
      )
    }
    return <LinkAccount accountType={accountType} refetch={refetch} />
  }

  return (
    <div>
      <ValueAction />
    </div>
  )
}

LinkedAccount.propTypes = {
  accountType: PropTypes.oneOf(['email', 'phone_number']).isRequired,
  account: PropTypes.string,
  disabled: PropTypes.bool,
  refetch: PropTypes.func
}
