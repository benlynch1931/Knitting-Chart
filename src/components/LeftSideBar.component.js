import React, { Component, useState } from 'react';
import '../styles/LeftSideBar.css';
import ColourComponent from './Colours.component'



export default class LeftSideBar extends Component {


  constructor(props) {
    super(props)

  }

  render() {
    return (
      <div className='left-side-bar'>
        <div className='chart-form div'>
          <form id='generate-chart'>
            <table className='chart-form table'>
              <tbody>
                <tr className='form-control'>
                  <td className='form-control label'><label>Rows</label></td>
                  <td><input type='text' name='rows'/></td>
                </tr>
                <tr className='form-control'>
                  <td className='form-control label'><label>Stitches</label></td>
                  <td><input type='text' name='stitches' /></td>
                </tr>
                <tr>
                  <td colSpan='2' className='generate-chart table submit'><button type='submit'>Generate</button></td>
                </tr>
              </tbody>
            </table>
          </form>
        </div>
        <ColourComponent />
      </div>

    )
  }
}
