import React from 'react';
import useStore from './hooks/useStore';

const App = () => {
  const { users } = useStore();

  console.log(users);

  return (
    <div>Works</div>
  );
}

export default App;
