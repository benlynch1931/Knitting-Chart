import React, { createContext, Component } from 'react';
import Colours from '../components/Colours.Array'

export const GlobalContext = createContext();

class GlobalContextProvider extends Component {
  state = {
    stitchGrid: null,
    colourPick: "#FFFFFF",
    colours: [['#000000', '#FF0000'], ['#FFFFFF', '#00FF00'], ['#0000FF', '#FFFF00']]
  }

  changeStitchGrid = (newSize) => {
    this.setState({ stitchGrid: newSize})
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
        changeStitchGrid: this.changeStitchGrid,
        changeColourPick: this.changeColourPick,
        updateColours: this.updateColours
      }}>
      {this.props.children}
      </GlobalContext.Provider>
    )
  }
}

export default GlobalContextProvider;
