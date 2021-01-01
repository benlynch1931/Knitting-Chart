import React, { Component, useContext, useEffect, useState } from 'react';
import Colours from './Colours.Array'
import { GlobalContext } from '../contexts/GlobalContext.js'

import '../styles/navigation.css';

const Navigation = () => {
  const { stitches, rows, selectedCells, chartID, changeStitches, changeRows, setSelectedCells, isSaved, setSaved } = useContext(GlobalContext)
  const [viewChartsList, setViewChartsList] = useState(null)

  const saveCells = () => {
    setSaved(true)
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
    // console.log(JSON.stringify(data))
  }

  const loadChartsList = () => {
    saveCells()
    fetch('https://chart-api-staging.herokuapp.com/api/v1/charts/', {
      method: 'GET',
      // mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'https://knitting-chart.vercel.app'
      }
    })
    // .then(res => console.log(res))
    // .then(res => console.log(res.json()))
    .then(res => res.json())
    // .then(data => console.log(data.colours[1].colour_code))
    .then((data) => { return formatChartsList(data.charts) })
    // .then(returning => returning)
  }

  const formatChartsList = (chartsInfo) => {
     chartsInfo = chartsInfo.map((chart) => {
      return (<li id={`chart_${chart.id}`} className='charts-list'><div className='charts-list div' onClick={ () => { loadChart(chart.id); document.getElementById("load-chart-dropdown").classList.toggle("show"); } }>{chart.name}</div></li>)
    })
    // console.log(viewChartsList)
    setViewChartsList(chartsInfo)
  }

  const loadChart = (chartID) => {
    setSaved(false)
    fetch(`https://chart-api-staging.herokuapp.com/api/v1/charts/${chartID}`, {
    // fetch(`http://localhost:6030/api/v1/charts/10`, {
      method: 'GET',
      // mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'https://knitting-chart.vercel.app'
      }
    })
    .then(res => res.json())
    // .then(res => console.log(res.json()))
    .then(data => data.chart)
    // .then(chart => console.log(setChartInfo(chart)))
    .then((chart) => {setChartInfo(chart)})
  }

  const setChartInfo = (chart) => {
    // return true
    console.log("rows: " + chart.rows)
    console.log("stitches: " + chart.stitches)
    changeRows(chart.rows);
    changeStitches(chart.stitches);
    loadCellsForChart(chart.id);
  }

  const loadCellsForChart = (chartID) => {
    let cellsObject = {}
    fetch(`https://chart-api-staging.herokuapp.com/api/v1/selected_cells/${chartID}`, {
      method: 'GET',
      // mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'https://knitting-chart.vercel.app'
      }
    })
    .then(res => res.json())
    .then(data => data.cells)
    .then((cells) => {
      cells.forEach((cell, idx) => {
        cellsObject = {...cellsObject, [cell.id]: cell.colour}
      })
    })
  }

  useEffect(() => {
    loadChartsList()
  }, [])



  return (
    <div className='navigation'>
      <button className={ isSaved ? 'save-btn' : 'save-btn not-saved'}  onClick={ () => { saveCells(); } }>Save</button>
      <button className='load' disabled={!isSaved} onClick={ () => { document.getElementById("load-chart-dropdown").classList.toggle("show"); } }>Load</button>
      <div id='load-chart-dropdown' className='load-chart'>
        <ul>
          { viewChartsList }
        </ul>
      </div>
    </div>
)
}

export default Navigation;
