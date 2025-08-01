import React from 'react';
import TaskBoard from './components/TaskBoard';

const App = () => {
  return (
    <div className="min-h-screen">
      <h1 className="text-4xl font-bold text-center py-6 text-sky-700">Task Manager Dashboard</h1>
      <TaskBoard />
    </div>
  );
};

export default App;
