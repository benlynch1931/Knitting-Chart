import React, { createContext, Component } from 'react';
import Colours from '../components/Colours.Array'

export const GlobalContext = createContext();

class GlobalContextProvider extends Component {
  state = {
    stitchCount: null,
    rowCount: null,

    colourPick: "#FFFFFF",
    // colours: [['#000000', '#FF0000'], ['#FFFFFF', '#00FF00'], ['#0000FF', '#FFFF00']]
    colours: [],
    chartID: null,
    selectedCells: {},
    mirroring: false,
    isSaved: true,
    loggedIn: false,
    orientation: 'right',
    user: false,
    userName: false,
    disabledButton: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      // color: 'rgba(0, 0, 0, 0)',
      // borderColor: 'rgba(0, 0, 0, 0)',
      // boxShadow: '0px 0px 0px rgba(0, 0, 0, 0)'
    },
    userAbilities: [
      <form onSubmit={ (event) => { event.preventDefault(); loginForm(event); }}>
        <table>
          <tbody>
            <tr>
              <td><label>Email</label></td>
              <td><input type='text' id='email' /></td>
            </tr>
            <tr>
              <td><label>Password</label></td>
              <td><input type='password' id='password'/></td>
            </tr>
            <tr>
              <td colSpan='2' className='login buttons cell'>
                <button type='submit' style={{ marginTop: 5, marginRight: 5 }} onClick={ () => {setFormButton('login') }}>Log In</button>
                <button style={{ marginTop: 5, marginLeft: 5 }} onClick={ () => { document.getElementById("signup-dropdown").classList.toggle("show-signup"); } } >Sign Up</button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    ]
  }

  setStitchCount = (newSize) => {
    this.setState({ stitchCount: newSize})

  }

  setUserAbilities = (abilities) => {
    this.setState({ userAbilities: abilities })
  }

  changeOrientation = (newOrientation) => {
    this.setState({ orientation: newOrientation })
  }

  setUser = (user) => {
    this.setState({ user: user })
  }

  setUserName = (username) => {
    this.setState({ userName: username })
  }

  setRowCount = (newSize) => {
    this.setState({ rowCount: newSize })
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
        setStitchCount: this.setStitchCount,
        changeColourPick: this.changeColourPick,
        updateColours: this.updateColours,
        setRowCount: this.setRowCount,
        setChartID: this.setChartID,
        setSelectedCells: this.setSelectedCells,
        setMirroring: this.setMirroring,
        setSaved: this.setSaved,
        setLoggedIn: this.setLoggedIn,
        changeOrientation: this.changeOrientation,
        setUser: this.setUser,
        setUserName: this.setUserName,
        setUserAbilities: this.setUserAbilities
      }}>
      {this.props.children}
      </GlobalContext.Provider>
    )
  }
}

export default GlobalContextProvider;
