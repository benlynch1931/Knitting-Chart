import React, { Component, useContext, useEffect, useState } from 'react';
import Colours from './Colours.Array'
import { GlobalContext } from '../contexts/GlobalContext.js'
import { ChromePicker } from 'react-color';

import '../styles/Colours.css'

const ColourComponent = () => {


    const { colours, updateColours, colourPick, changeColourPick } = useContext(GlobalContext)
    const coloursFunction = Colours()
    const [refresh, setRefresh] = useState(false)
    const [toggleDropdown, setToggleDropdown] = useState(false)
    const [pickerColor, setPickerColor] = useState('#0000FF')




    const addColour = (colour) => {
      const data = { colour_code: colour}
      // fetch('https://testing-save-capabilities.herokuapp.com/api/v1/colours', {
      fetch('https://chart-api-staging.herokuapp.com/api/v1/colours', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'https://knitting-chart.vercel.app'
        },
        body: JSON.stringify(data)
      })
      setRefresh(!refresh)
      // coloursFunction.add(event.target.hexInput.value);
    }

    const loadColours = () => {
      // console.log(colours)
      const renderJSX = colours.map((row) => {
        if(row[1] == null) {
          if(row[0] == colourPick) {
            return (<tr><td><button id=''style={{backgroundColor: `${row[0]}`, borderColor: '#09DBD8', borderWidth: 2}} onClick={() => { changeColourPick(row[0])}}></button></td><td></td></tr>)
          } else {
            return (<tr><td><button id='' style={{backgroundColor: `${row[0]}`}} onClick={() => { changeColourPick(row[0])}}></button></td><td></td></tr>)
          }
        } else {
          if(row[0] == colourPick) {
            return (<tr><td><button id='' style={{backgroundColor: `${row[0]}`, borderColor: '#09DBD8', borderWidth: 2}} onClick={() => { changeColourPick(row[0])}}></button></td><td><button id='' style={{backgroundColor: `${row[1]}`}} onClick={() => { changeColourPick(row[1])}}></button></td></tr>)
          } else if(row[1] == colourPick) {
            return (<tr><td><button id='' style={{backgroundColor: `${row[0]}`}} onClick={() => { changeColourPick(row[0])}}></button></td><td><button id='' style={{backgroundColor: `${row[1]}`, borderColor: '#09DBD8', borderWidth: 2}} onClick={() => { changeColourPick(row[1])}}></button></td></tr>)
          } else {
            return (<tr><td><button id='' style={{backgroundColor: `${row[0]}`}} onClick={() => { changeColourPick(row[0])}}></button></td><td><button id='' style={{backgroundColor: `${row[1]}`}} onClick={() => { changeColourPick(row[1])}}></button></td></tr>)
          }
        }
      })
      return renderJSX
    }

    const formatColours = (jsonColours) => {
      let coloursArray = [['#FFFFFF', '#000000']]
      let rowArray = null
      for (let i = 0; i < jsonColours.length; i+=2) {
        if(jsonColours[i+1]) {
          rowArray = [jsonColours[i].colour_code, jsonColours[i+1].colour_code]
        } else {
          rowArray = [jsonColours[i].colour_code, null]
        }
        coloursArray.push(rowArray)
      }
      updateColours(coloursArray)
    }

    const getColours = () => {
      fetch('https://chart-api-staging.herokuapp.com/api/v1/colours/', {
        method: 'GET',
        // mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'https://knitting-chart.vercel.app'
        }
      })
      // .then(res => console.log(res.json()))
      .then(res => res.json())
      // .then(data => console.log(data.colours[1].colour_code))
      .then(data => formatColours(data.colours))
    }

    useEffect(() => {
      getColours()
    }, []);

    useEffect(() => {
      getColours()
    }, [refresh]);

    const handleChangeComplete = (color, event) => {
      console.log(color)
    }

    const handleChange = (color) => {
      setPickerColor({pickerColor: color.hex})
    }

    const eventListeningAdd = () => {
      console.log("eventListeningAdd")
      document.addEventListener('click', eventListeningHandler, true)
    }

    const eventListeningHandler = (event) => {
      if (event.target.id != 'toggle-dropdown') {
        console.log("toggle colour picker")
        dropMenuHandler()
        setToggleDropdown(false)
        eventListeningRemove()
      }
    }

    const eventListeningRemove = () => {
      console.log("removing event listener")
      document.removeEventListener('click', eventListeningHandler, true)
    }

    const dropMenuHandler = () => {
      document.getElementById('add-colours-dropmenu').classList.toggle('show')
    }





    return (
      <div className='colours'>
      <table className='colours table'>
        <tbody>
        {loadColours()}
          <tr>
            <td colSpan='2'>
            <button id='toggle-dropdown' disabled={toggleDropdown} onClick={(event) => {
              dropMenuHandler(); eventListeningAdd(); setToggleDropdown(true);
            }}>+</button></td>
          </tr>
        </tbody>
      </table>
      <div id='add-colours-dropmenu' className='add-colours'>
        <ChromePicker color={pickerColor} onChangeComplete={ (color) => { setPickerColor(color.hex) }}/>
        <button className='add-colour-button' onClick={ () => {event.preventDefault(); addColour(pickerColor); document.getElementById("add-colours-dropmenu").classList.toggle("show");} }>Add</button>
      {/*  <form id='add-colours-form' onSubmit={(event) => {event.preventDefault(); addColour(event); event.target.reset(); document.getElementById("add-colours-dropmenu").classList.toggle("show"); }}>
        <table className='colours-table-form'>
          <tbody>
            <tr className='rgb-inputs'>
             <td>
                <label>RGB:</label>
              </td>
             <td><input type='text' /></td>
              <td><input type='text' /></td>
              <td><input type='text' /></td>
           </tr>

            <tr id='hex-inputs'>
              <td className='hex-inputs label'>
                <label>Hex: #</label>
              </td>
              <td colSpan='2'><input type='text' name='hexInput' /></td>
            </tr>
            <tr id='add-colour-submit'>
              <td colSpan='4'><button type='submit'>Add</button></td>
            </tr>
          </tbody>
        </table>
        </form> */}
      </div>
      </div>
    )

}

export default ColourComponent;
