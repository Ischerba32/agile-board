import { types, flow } from 'mobx-state-tree';

import api from '../api';

export interface IUser {
  id: string;
  createdAt: string;
  name: string;
  avatar: string;
}

const User = types.model('User', {
  id: types.identifier,
  createdAt: types.string,
  name: types.string,
  avatar: types.string
})

const UsersStore = types.model('UsersStore', {
  users: types.maybe(types.array(User))
})
  .actions((self: any) => ({
      load: flow(function* () {
        self.users = yield api.get('users');
      }),
      afterCreate() {
        self.load();
      }
  }))
;

export default UsersStore;