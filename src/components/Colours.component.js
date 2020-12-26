import React, { Component, useContext } from 'react';
import Colours from './Colours.Array'
import { GlobalContext } from '../contexts/GlobalContext.js'

const ColourComponent = () => {

    const { colours, updateColours } = useContext(GlobalContext)
    const coloursClass = new Colours
    // const returnColours = () => { return coloursClass.returning() }
    // const colours = returnColours()
    console.log(colours)




    const addColour = (event) => {
      coloursClass.add(event.target.hexInput.value);
      updateColours(coloursClass.returning())
    }

    const loadColours = () => {
      const renderJSX = colours.map((row) => {
        if(row[1] == null) {
          return (<tr><td><button id='' style={{backgroundColor: `${row[0]}`}}></button></td><td></td></tr>)
        } else {
          return (<tr><td><button id='' style={{backgroundColor: `${row[0]}`}}></button></td><td><button id='' style={{backgroundColor: `${row[1]}`}}></button></td></tr>)
        }
      })
      return renderJSX
    }





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
        <form id='add-colours-form' onSubmit={(event) => {event.preventDefault(); addColour(event) }}>
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
