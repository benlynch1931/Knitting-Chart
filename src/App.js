// import logo from './logo.svg';
import './App.css';
import LeftSideBar from './components/LeftSideBar.component'
import Grid from './components/Grid.component';
import Navigation from './components/Navigation.component';
import Footer from './components/Footer.component';
import GlobalContextProvider from './contexts/GlobalContext.js';
import GlobalContext from './contexts/GlobalContext.js';
import React, { useContext } from 'react'

function App() {
  return (
    <GlobalContextProvider>
      <Navigation />
      <LeftSideBar />
      <Grid />
      <Footer />
    </GlobalContextProvider>
  );
}

export default App;
