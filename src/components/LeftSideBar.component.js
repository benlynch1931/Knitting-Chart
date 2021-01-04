import React, { Component, useContext } from 'react';
import '../styles/LeftSideBar.css';
import ColourComponent from './Colours.component'
import { GlobalContext } from '../contexts/GlobalContext.js'



const LeftSideBar = () => {

  const { stitches, rows, changeStitches, changeRows, chartID, setChartID, mirroring, setMirroring, setSaved, isSaved } = useContext(GlobalContext)
  const selectedMirrorOption = {
    backgroundColor: '#07535B',
    color: '#F4F5EF'
  }

  const saveChart = () => {
    setSaved(true)
    const data = { chart_name: event.target.name.value, row_count: event.target.rows.value, stitch_count: event.target.stitches.value }
      fetch(`https://chart-api-staging.herokuapp.com/api/v1/charts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'mode': 'no-cors',
          'Access-Control-Allow-Origin': 'https://knitting-chart.vercel.app'
        },
        body: JSON.stringify(data),
        redirect: 'follow'
      })
    .then(res => res.json())
    .then(data => setChartID(data['charts'][0]['id']))

  }



    return (
      <div className='left-side-bar'>
        <div className='chart-form div'>
        <h3>Create New Chart</h3>
          <form id='generate-chart' onSubmit={(event) => {event.preventDefault(); changeStitches(event.target.stitches.value); changeRows(event.target.rows.value); saveChart(); document.getElementById('generate-chart').reset(), setSaved(false) }}>
            <table className='chart-form table'>
              <tbody>
              <tr className='title-label'><td colSpan='2'><label>Title</label></td></tr>
                <tr className='form-control name'>
                  <td colSpan='2' ><input type='text' name='name' className='name-input' required/></td>
                </tr>
                <tr className='form-control'>
                  <td className='form-control label numbers'><label>Rows</label></td>
                  <td className='numbers'><input type='text' name='rows' className='number-input' required/></td>
                </tr>
                <tr className='form-control'>
                  <td className='form-control label numbers'><label>Stitches</label></td>
                  <td className='numbers'><input type='text' name='stitches' className='number-input' required/></td>
                </tr>
                <tr>
                  <td colSpan='2' className='generate-chart table submit'><button disabled={!isSaved} type='submit'>Generate</button></td>
                </tr>
              </tbody>
            </table>
          </form>
        </div>
        <hr />
        <div className='mirrorOptionDiv'>
          <table>
            <tbody>
              <tr>
                <td><button style={mirroring == 'horizontal' ? selectedMirrorOption : {}} onClick={() => { setMirroring('horizontal') }}>x | x</button></td>
                <td><button style={mirroring == 'vertical' ? selectedMirrorOption : {}} onClick={() => { setMirroring('vertical') }}  >x <br/> -- <br/> x</button></td>
                <td><button style={mirroring == false ? selectedMirrorOption : {}} onClick={() => { setMirroring(false) }}       >None</button></td>
              </tr>
            </tbody>
          </table>
        </div>
        <hr />
        <ColourComponent />
      </div>

    )

}

export default LeftSideBar;
