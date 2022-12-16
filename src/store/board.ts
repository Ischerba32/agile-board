import { types, flow, getParent, cast } from 'mobx-state-tree';
import api from '../api';
import { User } from './users';

const Task = types.model('Task', {
  id: types.identifier,
  title: types.string,
  description: types.string,
  assignee: types.safeReference(User)
})

const BoardSection = types.model('BoardSection', {
  id: types.identifier,
  title: types.string,
  tasks: types.array(Task)
})
  .actions((self: any) => ({
    load: flow(function* () {

      // @ts-ignore
      const {id: boardID} = getParent(self, 2)
      const {id: status } = self;
      const { tasks } = yield api.get(`boards/${boardID}/tasks/${status}`);

      self.tasks = cast(tasks);

    }),
    afterCreate() {
      self.load();
    },
  }))

const Board = types.model('Board', {
  id: types.identifier,
  title: types.string,
  sections: types.array(BoardSection)
})

const BoardStore = types.model('BoardStore', {
  boards: types.array(Board),
  active: types.safeReference(Board)
})
  .actions((self: any) => ({
    load: flow( function* () {
      self.boards = yield api.get('boards')
      self.active = 'MAIN'
    }),
    afterCreate() {
      self.load();
    }
  }))

export default BoardStore;