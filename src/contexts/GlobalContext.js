import React, { createContext, Component } from 'react';
import Colours from '../components/Colours.Array'

export const GlobalContext = createContext();

class GlobalContextProvider extends Component {
  state = {
    stitches: null,
    rows: null,
    colourPick: "#FF0000",
    colours: [['#000000', '#FF0000'], ['#FFFFFF', '#00FF00'], ['#0000FF', '#FFFF00']]
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

  render() {
    return (
      <GlobalContext.Provider value={{
        ...this.state,
        changeStitches: this.changeStitches,
        changeColourPick: this.changeColourPick,
        updateColours: this.updateColours,
        changeRows: this.changeRows
      }}>
      {this.props.children}
      </GlobalContext.Provider>
    )
  }
}

export default GlobalContextProvider;
