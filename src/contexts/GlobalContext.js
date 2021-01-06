import React, { createContext, Component } from 'react';
import Colours from '../components/Colours.Array'

export const GlobalContext = createContext();

class GlobalContextProvider extends Component {
  state = {
    stitches: null,
    rows: null,
    colourPick: "#FFFFFF",
    // colours: [['#000000', '#FF0000'], ['#FFFFFF', '#00FF00'], ['#0000FF', '#FFFF00']]
    colours: [],
    chartID: null,
    selectedCells: {},
    mirroring: false,
    isSaved: true,
    loggedIn: false,
    disabledButton: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      // color: 'rgba(0, 0, 0, 0)',
      // borderColor: 'rgba(0, 0, 0, 0)',
      // boxShadow: '0px 0px 0px rgba(0, 0, 0, 0)'
    }
  }

  changeStitches = (newSize) => {
    this.setState({ stitches: newSize})
  }

  changeRows = (newSize) => {
    this.setState({ rows: newSize })
  }

  changeColourPick = (newColour) => {
    this.setState({ colourPick: newColour})
  }

  updateColours = (newColoursArray) => {
    this.setState({colours: newColoursArray})
  }

  setChartID = (newID) => {
    this.setState({chartID: newID})
  }

  setSelectedCells = (newCells) => {
    this.setState({selectedCells: newCells})
  }

  setMirroring = (mirrorDirection) => {
    this.setState({mirroring: mirrorDirection})
  }
  setSaved = (choice) => {
    this.setState({isSaved: choice})
  }

  setLoggedIn = (value) => {
    this.setState({logedIn: value})
  }



  render() {
    return (
      <GlobalContext.Provider value={{
        ...this.state,
        changeStitches: this.changeStitches,
        changeColourPick: this.changeColourPick,
        updateColours: this.updateColours,
        changeRows: this.changeRows,
        setChartID: this.setChartID,
        setSelectedCells: this.setSelectedCells,
        setMirroring: this.setMirroring,
        setSaved: this.setSaved,
        setLoggedIn: this.setLoggedIn
      }}>
      {this.props.children}
      </GlobalContext.Provider>
    )
  }
}

export default GlobalContextProvider;
