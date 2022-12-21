import React from 'react';
import useStore from './hooks/useStore';
import { observer } from 'mobx-react-lite';
import { toJS } from 'mobx'
import { Dashboard } from './components/Dashboard/dashboard';
import Header from './components/Header/header';

const App = () => {
  return (
    <>
    <Header/>
    <main>
      <Dashboard/>
    </main>
  </>
  );
}

export default observer(App);
