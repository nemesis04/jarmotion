import { action } from 'mobx'
import { IJarmotionEntity } from '../domains/general/GeneralTypes'
import { establishedSocket } from '../socket/socketConnection'
import AuthStore, { AuthStoreClass } from './AuthStore'
import EmojiStore from './EmojiStore'
import UserStore, { UserStoreClass } from './UserStore'

export class StarterStoreClass {
  constructor(
    readonly userStore: UserStoreClass,
    readonly authStore: AuthStoreClass
  ) {}

  @action
  public async initApp() {
    await this.authStore.initFromStorage()
    if (
      !this.authStore.getAuthStatus.auth ||
      this.authStore.getAuthStatus.auth === 'loading'
    ) {
      return
    }
    await this.userStore.init()
    const socket = await establishedSocket(
      this.authStore.getAuthStatus.token,
      [this.userStore.me.id, this.userStore.couple.id],
      () => {
        // tslint:disable-next-line: no-console
        console.error('Socket error, retrying')
      }
    )
    socket.on('emoji:add', (entity: IJarmotionEntity) => {
      EmojiStore.fetchEmojiById(entity.id)
    })
  }
}

export default new StarterStoreClass(UserStore, AuthStore)
