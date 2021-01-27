import React, { Component, useContext, useEffect } from 'react';
import '../styles/LeftSideBar.css';
import ColourComponent from './Colours.component'
import { GlobalContext } from '../contexts/GlobalContext.js'



const LeftSideBar = () => {

  const { user, stitchCount, rowCount, setStitchCount, setRowCount, chartID, setChartID, mirroring, setMirroring, setSaved, isSaved, orientation, changeOrientation, disabledButton } = useContext(GlobalContext)



  const selectedMirrorOption = {
    backgroundColor: '#07535B',
    color: '#F4F5EF'
  }

  // const chartGenerateStyle = () => {
  //   if (!isSaved) {
  //     return disabledButton
  //   } else if (localStorage.getItem('name')) {
  //     return {}
  //   } else {
  //     return {}
  //   }
  // }

  const chartGenerate = () => {
    if (!isSaved) {
      return true
    } else if (localStorage.getItem('name')) {
      return false
    } else {
      return false
    }
  }

  const chartGenerateForm = () => {
    if (localStorage.getItem('name')) {
      return (
        <form id='generate-chart' onSubmit={(event) => { event.preventDefault(); setStitchCount(event.target.stitches.value); setRowCount(event.target.rows.value); saveChart(); document.getElementById('generate-chart').reset(); }}>
          <table className='chart-form table'>
            <tbody>
            <tr className='title-label'>
              <td colSpan='2'><label>Title</label></td>
            </tr>
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
                <td colSpan='2' className='generate-chart table submit'><button disabled={chartGenerate()} style={chartGenerate() ? disabledButton : {}} type='submit'>Generate</button></td>
              </tr>
            </tbody>
          </table>
        </form>
      )
    } else {
      return (
        <h5>Please Log In</h5>
      )
    }
  }

  const saveChart = () => {
    setSaved(true)
    const data = { chart_name: event.target.name.value, row_count: event.target.rows.value, stitch_count: event.target.stitches.value, user: localStorage.getItem('user_id') }
    // fetch(`http://localhost:6030/api/v1/charts`, {
      fetch(`https://knitting-chart.herokuapp.com/api/v1/charts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
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
          { chartGenerateForm() }
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
        <div className='orientationDiv'>
          <button style={orientation == 'left' ? selectedMirrorOption : {}} onClick={() => { changeOrientation('left') }}>Left</button>
          <button style={orientation == 'right' ? selectedMirrorOption : {}} onClick={() => { changeOrientation('right') }}  >Right</button>
        </div>
        <hr />
        <ColourComponent />
      </div>

    )

}

export default LeftSideBar;
