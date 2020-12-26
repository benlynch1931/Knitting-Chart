import React, { Component, useState } from 'react';
import Colours from './Colours.Array'

export default class ColourComponent extends Component {

  constructor(props) {
    super(props)
    this.coloursClass = new Colours;
    this.renderJSX = null
    this.state = {
      colours: this.coloursClass.returning()
    }
  }



    addColour(event) {
      this.coloursClass.add(event.target.hexInput.value);
      this.setState({colours: this.coloursClass.returning()});
    }

    loadColours() {
      this.renderJSX = this.state.colours.map((row) => {
        if(row[1] == null) {
          return (<tr><td><button id='' style={{backgroundColor: `${row[0]}`}}></button></td><td></td></tr>)
        } else {
          return (<tr><td><button id='' style={{backgroundColor: `${row[0]}`}}></button></td><td><button id='' style={{backgroundColor: `${row[1]}`}}></button></td></tr>)
        }
      })
      return this.renderJSX
    }




  render() {
    return (
      <div className='colours'>
      <table className='colours table'>
        <tbody>
        {this.loadColours()}
          <tr>
            <td colSpan='2'>
            <button onClick={(event) => {
              document.getElementById("add-colours-dropmenu").classList.toggle("show");
            }}>+</button></td>
          </tr>
        </tbody>
      </table>
      <div id='add-colours-dropmenu' className='add-colours'>
        <form id='add-colours-form' onSubmit={(event) => {event.preventDefault(); this.addColour(event) }}>
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
}
