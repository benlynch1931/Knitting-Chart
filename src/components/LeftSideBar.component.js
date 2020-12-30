import React, { Component, useContext } from 'react';
import '../styles/LeftSideBar.css';
import ColourComponent from './Colours.component'
import { GlobalContext } from '../contexts/GlobalContext.js'



const LeftSideBar = () => {

  const { stitches, rows, changeStitches, changeRows, chartID, setChartID } = useContext(GlobalContext)
  const saveChart = () => {
    const data = { chart_name: "Testing", row_count: rows, stitch_count: stitches }
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
          <form id='generate-chart' onSubmit={(event) => {event.preventDefault(); changeStitches(event.target.stitches.value); changeRows(event.target.rows.value); saveChart() }}>
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
