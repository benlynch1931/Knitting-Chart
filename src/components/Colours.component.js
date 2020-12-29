import React, { Component, useContext, useEffect } from 'react';
import Colours from './Colours.Array'
import { GlobalContext } from '../contexts/GlobalContext.js'

const ColourComponent = () => {

    const { colours, updateColours, colourPick, changeColourPick } = useContext(GlobalContext)
    const coloursFunction = Colours()




    const addColour = (event) => {
      const data = { colour_code: [event.target.hexInput.value]}
      fetch('https://chart-api-staging.herokuapp.com/api/v1/colours', {
      // fetch('http://localhost:6030/api/v1/colours/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'https://knitting-chart.vercel.app'
        },
        body: JSON.stringify(data)
      })
      // coloursFunction.add(event.target.hexInput.value);
    }

    const loadColours = () => {
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
      let coloursArray = []
      for (let i = 0; i < jsonColours.length; i+=2) {
        let rowArray = [jsonColours[i].colour_code, jsonColours[i+1].colour_code]
        coloursArray.push(rowArray)
      }
      updateColours(coloursArray)
      console.log(coloursArray)
    }

    useEffect(() => {
      fetch('https://chart-api-staging.herokuapp.com/api/v1/colours', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'https://knitting-chart.vercel.app'
        }
      })

      .then(res => res.json())
      .then(data => formatColours(data.colours))
    }, []);





    return (
      <div className='colours'>
      <table className='colours table'>
        <tbody>
        {loadColours()}
          <tr>
            <td colSpan='2'>
            <button onClick={(event) => {
              document.getElementById("add-colours-dropmenu").classList.toggle("show");
            }}>+</button></td>
          </tr>
        </tbody>
      </table>
      <div id='add-colours-dropmenu' className='add-colours'>
        <form id='add-colours-form' onSubmit={(event) => {event.preventDefault(); addColour(event); event.target.reset(); document.getElementById("add-colours-dropmenu").classList.toggle("show"); }}>
        <table className='colours-table-form'>
          <tbody>
          {/*  <tr className='rgb-inputs'>
             <td>
                <label>RGB:</label>
              </td>
             <td><input type='text' /></td>
              <td><input type='text' /></td>
              <td><input type='text' /></td>
           </tr> */}

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
        </form>
      </div>
      </div>
    )

}

export default ColourComponent;
