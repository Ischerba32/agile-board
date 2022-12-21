import { types, flow, getParent, cast, onSnapshot } from 'mobx-state-tree';
import api from '../api';
import { v4 as uuidv4 } from 'uuid';
import { User } from './users';

const Task = types.model('Task', {
  id: types.identifier,
  title: types.string,
  description: types.maybe(types.string),
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
      onSnapshot(self, self.save);

    }),
    afterCreate() {
      self.load();
    },

    save: flow(function* ({tasks}) {
      // @ts-ignore
      const {id: boardID} = getParent(self, 2);
      const {id: status} = self;

      yield api.put(`boards/${boardID}/tasks/${status}`, {tasks});
    }),

    addTask(taskPayload) {
      self.tasks.push(taskPayload);
    }
  }))

const Board = types.model('Board', {
  id: types.identifier,
  title: types.string,
  sections: types.array(BoardSection)
})
  .actions((self) => ({
    addTask(sectionId, taskPayload) {
      const section = self.sections.find(section => section.id === sectionId);

      section.tasks.push({
        id: uuidv4(),
        ...taskPayload
      });
    },
    moveTask(taskId, source, destination) {
      const fromSection = self.sections.find(section => section.id === source.droppableId);
      const toSection = self.sections.find(section => section.id === destination.droppableId);

      const taskToMoveIndex = fromSection.tasks.findIndex(task => task.id === taskId);
      const [task] = fromSection.tasks.splice(taskToMoveIndex, 1);
      // @ts-ignore
      toSection.tasks.splice(destination.index, 0, task.toJSON());
    },
  }))

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
    },
    selectBoard(id) {
      self.active = id;
    },

  }))

export default BoardStore;