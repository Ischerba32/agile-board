import { types, flow } from 'mobx-state-tree';

import api from '../api';


export const User = types.model('User', {
  id: types.identifier,
  createdAt: types.string,
  name: types.string,
  avatar: types.string
});

const ActiveUser = User.named('ActiveUser');

const UsersStore = types.model('UsersStore', {
  users: types.maybe(types.array(User)),
  me: types.maybe(ActiveUser)
})
  .actions((self: any) => ({
      load: flow(function* () {
        self.users = yield api.get('users');
        self.me = yield api.get('me');
      }),
      afterCreate() {
        self.load();
      }
  }))
;

export default UsersStore;