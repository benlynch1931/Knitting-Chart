import React, { createContext, Component } from 'react';
import Colours from '../components/Colours.Array'

export const GlobalContext = createContext();

class GlobalContextProvider extends Component {
  state = {
    stitchGrid: null,
    colourPick: "#FFFFFF"
  }

  changeStitchGrid = (newSize) => {
    this.setState({ stitchGrid: newSize})
  }

  changeColourPick = (newColour) => {
    this.steState({ colourPick: newColour})
  }

  render() {
    return (
      <GlobalContext.Provider value={{
        ...this.state,
        changeStitchGrid: this.changeStitchGrid,
        changeColourPick: this.changeColourPick
      }}>
      {this.props.children}
      </GlobalContext.Provider>
    )
  }
}

export default GlobalContextProvider;
