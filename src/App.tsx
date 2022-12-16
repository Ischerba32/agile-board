import React from 'react';
import useStore from './hooks/useStore';
import { observer } from 'mobx-react-lite';
import { toJS } from 'mobx'

const App = () => {
  const { users, boards } = useStore();

  console.log(toJS(users));
  console.log(toJS(boards.active?.sections[0].tasks));

  return (
    <div>Works</div>
  );
}

export default observer(App);
