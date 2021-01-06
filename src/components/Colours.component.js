import React, { Component, useContext, useEffect, useState } from 'react';
import Colours from './Colours.Array'
import { GlobalContext } from '../contexts/GlobalContext.js'
import { ChromePicker } from 'react-color';

import '../styles/Colours.css'

const ColourComponent = () => {


    const { colours, updateColours, colourPick, changeColourPick, disabledButton } = useContext(GlobalContext)
    const coloursFunction = Colours()
    const [refresh, setRefresh] = useState(false)
    const [toggleDropdown, setToggleDropdown] = useState(false)
    const [pickerColor, setPickerColor] = useState('#0000FF')




    const addColour = (colour) => {
      setToggleDropdown(false)
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
      .then(res => getColours())
      setRefresh(!refresh)
      document.getElementById("add-colours-dropmenu").classList.toggle("show");
    }

    const renderColours = () => {

      const renderJSX = colours.map((row) => {
        if(row[1] == null) {

          if(row[0] == colourPick) {
            return (<tr><td><button id=''style={{backgroundColor: `${row[0]}`, borderColor: '#09DBD8', borderWidth: 3, borderStyle: 'solid'}} onClick={() => { changeColourPick(row[0])}}></button></td><td></td></tr>)
          } else {
            return (<tr><td><button id='' style={{backgroundColor: `${row[0]}`, borderStyle: 'solid'}} onClick={() => { changeColourPick(row[0])}}></button></td><td></td></tr>)
          }

        } else {

          if(row[0] == colourPick) {
            return (<tr><td><button id='' style={{backgroundColor: `${row[0]}`, borderColor: '#09DBD8', borderWidth: 3, borderStyle: 'solid'}} onClick={() => { changeColourPick(row[0])}}></button></td><td><button id='' style={{backgroundColor: `${row[1]}`, borderStyle: 'solid'}} onClick={() => { changeColourPick(row[1])}}></button></td></tr>)
          } else if(row[1] == colourPick) {
            return (<tr><td><button id='' style={{backgroundColor: `${row[0]}`, borderStyle: 'solid'}} onClick={() => { changeColourPick(row[0])}}></button></td><td><button id='' style={{backgroundColor: `${row[1]}`, borderColor: '#09DBD8', borderWidth: 3, borderStyle: 'solid'}} onClick={() => { changeColourPick(row[1])}}></button></td></tr>)
          } else {
            return (<tr><td><button id='' style={{backgroundColor: `${row[0]}`, borderStyle: 'solid'}} onClick={() => { changeColourPick(row[0])}}></button></td><td><button id='' style={{backgroundColor: `${row[1]}`, borderStyle: 'solid'}} onClick={() => { changeColourPick(row[1])}}></button></td></tr>)
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
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'https://knitting-chart.vercel.app'
        }
      })
      .then(res => res.json())
      .then(data => formatColours(data.colours))
    }

    useEffect(() => {
      getColours()
    }, []);


    const handleChangeComplete = (color, event) => {
      console.log(color)
    }

    const handleChange = (color) => {
      setPickerColor({pickerColor: color.hex})
    }

    const eventListeningAdd = () => {
      document.addEventListener('click', eventListenerCallback, true)
    }

    const eventListenerCallback = (event) => {
      if (event.target.id != 'toggle-dropdown' && !document.querySelector('#add-colours-dropmenu').contains(event.target)) {
        dropMenuHandler()
        setToggleDropdown(false)
        eventListeningRemove()
      }
    }

    const eventListeningRemove = () => {
      document.removeEventListener('click', eventListenerCallback, true)
    }

    const dropMenuHandler = () => {
      document.getElementById('add-colours-dropmenu').classList.toggle('show')
    }





    return (
      <div className='colours'>

        <table className='colours table'>
          <tbody>
            {renderColours()}
            <tr>
              <td colSpan='2'>
                <button id='toggle-dropdown' style={toggleDropdown ? disabledButton : {} } disabled={toggleDropdown} onClick={(event) => {
                  dropMenuHandler(); eventListeningAdd(); setToggleDropdown(true);
                }}>+</button>
              </td>
            </tr>
          </tbody>
        </table>

        <div id='add-colours-dropmenu' className='add-colours'>
          <ChromePicker color={pickerColor} onChangeComplete={ (color) => { setPickerColor(color.hex) }}/>
          <button className='add-colour-button' onClick={ () => {event.preventDefault(); addColour(pickerColor); } }>Add</button>
        </div>
        
      </div>
    )

}

export default ColourComponent;
