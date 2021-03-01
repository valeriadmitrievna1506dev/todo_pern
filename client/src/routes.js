import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import AuthPage from './components/AuthPage';
import TaskPage from './components/TasksPage';

export const useRoutes = (isAuthenticated) => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path='/items'>
          <TaskPage />
        </Route>
        <Redirect to='/items' />
      </Switch>
    );
  }

  return (
    <Switch>
      <Route path='/' exact>
        <AuthPage />
      </Route>
      <Redirect to='/' />
    </Switch>
  );
};
