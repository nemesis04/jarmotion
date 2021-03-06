import { observer } from 'mobx-react'
import React from 'react'
import AuthStore from '../../stores/AuthStore'
import StarterStore from '../../stores/StarterStore'
import UserStore from '../../stores/UserStore'
import UserSettingPage from './UserSettingPage'

const UserSettingPageContainer = observer(() => {
  return (
    <UserSettingPage
      me={UserStore.me}
      loadState={UserStore.loadState}
      onUploadAvatar={uri => UserStore.uploadAvatar(uri)}
      onUpdateProfile={updates => UserStore.updateProfile(updates)}
      onLogout={() => {
        StarterStore.clean()
        AuthStore.destroyAuthToken()
      }}
    />
  )
})

export default UserSettingPageContainer
