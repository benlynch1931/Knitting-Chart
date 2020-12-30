import React, { Component, useContext, useEffect, useState } from 'react';
import Colours from './Colours.Array'
import { GlobalContext } from '../contexts/GlobalContext.js'

import '../styles/navigation.css';

const Navigation = () => {
  const { stitches, rows, selectedCells, chartID } = useContext(GlobalContext)

  const saveCells = () => {
    // const data = [CHART, SELECTEDCELLS]
    // const data = { chart_name: "Testing", row_count: rows, stitch_count: stitches }
    console.log(selectedCells)
    const data = { cells: selectedCells, chart_id: chartID }
    // fetch('https://testing-save-capabilities.herokuapp.com/api/v1/charts', {
    fetch(`https://chart-api-staging.herokuapp.com/api/v1/selected_cells`, {
    // fetch(`http://localhost:6030/api/v1/selected_cells`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'mode': 'no-cors',
        'Access-Control-Allow-Origin': 'https://knitting-chart.vercel.app'
      },
      body: JSON.stringify(data)
    })
    console.log(JSON.stringify(data))
  }



  return (
    <div className='navigation'>
      <button className='save' onClick={() => {saveCells(); }}>Save</button>
      {/*save('selected_cells', ) */}
    </div>
)
}

export default Navigation;
