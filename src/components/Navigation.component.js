import React, { Component, useContext, useEffect, useState, useRef } from 'react';
import Colours from './Colours.Array'
import { GlobalContext } from '../contexts/GlobalContext.js'

import '../styles/navigation.css';

const Navigation = () => {

  let initialRender = useRef(true)

  const { setUserAbilities, user, setUser, stitchCount, rowCount, selectedCells, chartID, setChartID, setStitchCount, setRowCount, setSelectedCells, isSaved, setSaved, changeColourPick, setLoggedIn, disabledButton } = useContext(GlobalContext)

  const [viewChartsList, setViewChartsList] = useState(<li className='charts-list'><div>Please Log In</div></li>)
  const [formButton, setFormButton] = useState(false)
  const [userName, setUserName] = useState(false)
  const [loginMessage, setLoginMessage] = useState(null)
  const [signUpErrorMessage, setSignUpErrorMessage] = useState(null)
  const [inputLoginDetails, setInputLoginDetails] = useState({})
  const [inputSignupDetails, setInputSignupDetails] = useState({})


  const saveCells = () => {
    setSaved(true)
    const data = { cells: selectedCells, chart_id: chartID }
    // fetch(`http://localhost:6030/api/v1/selected_cells/`, {
    fetch(`https://knitting-chart.herokuapp.com/api/v1/selected_cells`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(data)
    })
  }

  const loadChartsList = () => {
    console.log()
    saveCells()
    // fetch(`http://localhost:6030/api/v1/charts/`, {
    fetch('https://knitting-chart.herokuapp.com/api/v1/charts/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(res => res.json())
    .then((data) => { return formatChartsList(data.charts) })
  }

  const formatChartsList = (chartsInfo) => {
     chartsInfo = chartsInfo.map((chart) => {
      return (<li id={`chart_${chart.id}`} className='charts-list'><div className='charts-list div' onClick={ () => { loadChart(chart.id); document.getElementById("load-chart-dropdown").classList.toggle("show-chart"); } }>{chart.name}</div></li>)
    })
    setViewChartsList(chartsInfo)
  }

  const loadChart = (chartID) => {
    setSaved(false)
    // fetch(`http://localhost:6030/api/v1/charts/${chartID}`, {
    fetch(`https://knitting-chart.herokuapp.com/api/v1/charts/${chartID}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(res => res.json())
    .then(data => data.chart)
    .then((chart) => {setChartInfo(chart)})
  }

  const setChartInfo = (chart) => {
    setRowCount(chart.rows);
    setStitchCount(chart.stitches);
    setChartID(chart.id)
    loadCellsForChart(chart.id);
  }

  const loadCellsForChart = (chartID) => {
    let cellsObject = {}
    // fetch(`http://localhost:6030/api/v1/selected_cells/${chartID}`, {
    fetch(`https://knitting-chart.herokuapp.com/api/v1/selected_cells/${chartID}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(res => res.json())
    .then(data => data.cells)
    .then((cells) => {
      cells.forEach((cell, idx) => {
        cellsObject = {...cellsObject, [cell.id]: cell.colour}
      })
      setSelectedCells(cellsObject)
    })
  }

  const logIn = (email, password) => {
    // fetch('http://localhost:6030/api/v1/sessions', {
    fetch('https://knitting-chart.herokuapp.com/api/v1/sessions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: email, password: password })
    })
    .then(res => res.json())
    .then(data => {
      if (data.status == 'incorrect details') {
        setLoginMessage(<td colSpan='2'>Error: Incorrect email or password</td>)
        setInputLoginDetails({ borderWidth: 1, borderColor: '#FF0000' })
        document.getElementById('email').value = "";
        document.getElementById('password').value = "";
      } else {
        localStorage.setItem("token", data.data.token)
        localStorage.setItem("name", data.data.user.first_name)
        localStorage.setItem("user_id", data.data.user.id)
        setLoginMessage(null)
        setInputUserDetails({})
        setLoggedIn(true)
        setUser(true)
        setUserAbilities(userAbilitiesFunc())
        setViewChartsList(<li className='charts-list'><div>Loading...</div></li>)
      }
    })
  }

  const signUp = (event) => {
    if (event.target.signupPassword.value === event.target.signupConfirmPassword.value) {
      // fetch('http://localhost:6030/api/v1/users', {
      fetch('https://knitting-chart.herokuapp.com/api/v1/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user: {
            first_name: event.target.firstName.value,
            last_name: event.target.lastName.value,
            email: event.target.signupEmail.value,
            password: btoa(event.target.signupPassword.value),
            password_confirmation: btoa(event.target.signupConfirmPassword.value)
          }
        })
      })
      .then (res => res.json())
      .then(data => {
        document.getElementById('signupEmail').value = "";
        document.getElementById('signupPassword').value = "";
        document.getElementById('firstName').value = "";
        document.getElementById('lastName').value = "";
        document.getElementById('signupConfirmPassword').value = "";
        if (data.status == 'duplicate email') {
          setSignUpErrorMessage(<td colSpan='2'>Error: Email already exists!</td>)
        } else {
          document.getElementById("signup-dropdown").classList.toggle("show-signup");
          setLoginMessage(<td colSpan='2'>Succesfully registered! Log in</td>)
        }
      })
    } else {
      document.getElementById('signupEmail').value = "";
      document.getElementById('signupPassword').value = "";
      document.getElementById('firstName').value = "";
      document.getElementById('lastName').value = "";
      document.getElementById('signupConfirmPassword').value = "";
      setSignUpErrorMessage(<td colSpan='2'>Error: Passwords don't match!</td>)
      setInputSignupDetails({ borderWidth: 1, borderColor: '#FF0000' })
    }
  }

  const cancelChanges = () => {
    setChartID(null);
    setSelectedCells({});
    setStitchCount(null);
    setRowCount(null);
    changeColourPick('#FFFFFF');
    setSaved(true);
  }

  useEffect(() => {
    if (initialRender.current && !localStorage.getItem('name')) {
      initialRender.current = false
    } else {
      loadChartsList()
    }
  }, [user])

  const loginForm = (event) => {
    if (formButton == 'login') {
      if (event.target.email.value && event.target.password.value) {
        const email = event.target.email.value
        const password = btoa(event.target.password.value)
        logIn(email, password)
      } else {
      }
    }
    setFormButton(false)
  }

  const userAbilitiesFunc = () => {
    if (localStorage.getItem('name')) {
      return (
        <div>
          <p>Welcome {localStorage.getItem('name')}</p>
          <button onClick={ () => { localStorage.clear(); setLoggedIn(false); setUserName(false); setUser(false) } }>Logout</button>
        </div>
      )

    } else {
      return (
        <form onSubmit={ (event) => { event.preventDefault(); loginForm(event); }}>
          <table>
            <tbody>
              <tr>
                <td><label>Email</label></td>
                <td><input type='text' id='email' style={ inputLoginDetails } /></td>
              </tr>
              <tr>
                <td><label>Password</label></td>
                <td><input type='password' id='password' style={ inputLoginDetails } /></td>
              </tr>
              <tr>
                <td colSpan='2' className='login buttons cell'>
                  <button type='submit' style={{ marginTop: 5, marginRight: 5 }} onClick={ () => { setFormButton('login') }}>Log In</button>
                  <button style={{ marginTop: 5, marginLeft: 5 }} onClick={ () => { document.getElementById("signup-dropdown").classList.toggle("show-signup"); } } >Sign Up</button>
                </td>
              </tr>
              <tr>
                { loginMessage }
              </tr>
            </tbody>
          </table>
        </form>
      )
    }
  }

  useEffect(() => {
    if (localStorage.getItem('name')) {
      setViewChartsList(<li className='charts-list'><div>Loading...</div></li>)
    }
  }, [])

  return (
    <div className='navigation'>

      <div className='variable-nav-div left'></div>

      <div className='fixed-nav-div'>
      <table>
        <tbody>
          <tr>
            <td>
              <img src={require('./../assets/PJKnitCrochet-BIG.png').default} alt="Image not found"/>
            </td>
          </tr>
          <tr>
            <td>
              <button className='cancel-btn'  onClick={ () => { cancelChanges(); loadChartsList() }}>Cancel</button>
              <button className={ isSaved ? 'save-btn' : 'save-btn not-saved'} style={ isSaved ? disabledButton : {} } disabled={isSaved} onClick={ () => { saveCells(); loadChartsList() } }>Save</button>
              <button className='load-btn' disabled={!isSaved} style={ isSaved ? {} : disabledButton } onClick={ () => { document.getElementById("load-chart-dropdown").classList.toggle("show-chart"); } }>Load</button>
            </td>
          </tr>
        </tbody>
      </table>
      </div>

      <div className='variable-nav-div right'>
        { userAbilitiesFunc() }
      </div>

      <div id='load-chart-dropdown' className='load-chart'>
        <ul>
          { viewChartsList }
        </ul>
      </div>

      <div id='signup-dropdown' className='signup'>
        <form onSubmit={ (event) => { event.preventDefault(); signUp(event);  }}>
          <table>
            <tbody>
              <tr>
                <td><label>Name:</label></td>
              </tr>
              <tr><td><input className='name-info' id='firstName' style={{ marginRight: 5}}/><input className='name-info' id='lastName' style={{ marginLeft: 5}}/></td></tr>
              <br />
              <tr><td><label>Email </label></td></tr>
              <tr><td><input type='email' id='signupEmail' style={ inputSignupDetails }/></td></tr>
              <br />
              <tr><td><label>Password</label></td></tr>
              <tr><td><input type='password' id='signupPassword' minLength="6" style={ inputSignupDetails }/></td></tr>
              <br />
              <tr><td><label>Confirm Password</label></td></tr>
              <tr><td><input type='password' id='signupConfirmPassword' minLength="6" style={ inputSignupDetails }/></td></tr>
              <br />
              <tr><td><button>Sign Up</button></td></tr>
              <tr>{signUpErrorMessage}</tr>
            </tbody>
          </table>
        </form>
      </div>

    </div>
  )
}

export default Navigation;
