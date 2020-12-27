import React, { Component, useContext } from 'react';
import '../styles/LeftSideBar.css';
import ColourComponent from './Colours.component'
import { GlobalContext } from '../contexts/GlobalContext.js'



const LeftSideBar = () => {

  const { stiches, rows, changeStitches, changeRows } = useContext(GlobalContext)


    return (
      <div className='left-side-bar'>
        <div className='chart-form div'>
          <form id='generate-chart' onSubmit={(event) => {event.preventDefault(); changeStitches(event.target.stitches.value); changeRows(event.target.rows.value); }}>
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

export default LeftSideBar;
