import React from 'react';

import { RouteList } from './routes/routeList';
import { SnackbarProvider } from 'notistack';


function App() {
  return (
    <div className="App">
       <SnackbarProvider maxSnack={3}>
      <RouteList />
      </SnackbarProvider>
    </div>
  );
}

export default App;
