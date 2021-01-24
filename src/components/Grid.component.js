import React, { Component, useContext, useState, useEffect} from 'react';
import { GlobalContext } from '../contexts/GlobalContext.js';

import '../styles/Grid.css';

const Grid = () => {
  const { stitchCount, rowCount, colourPick, selectedCells, setSelectedCells, mirroring, setSaved } = useContext(GlobalContext)

  const gridCells = []
  const currentSelectedCells = selectedCells



  const renderGrid = () => {
    let jsx = []
    // jsx.push(<tr>{renderStitchCount()}</tr>)
    // console.log("jsx: " + jsx)
    for(let i = 0; i < rowCount; i++) {
      jsx.push(<tr>{renderStitches(i+1)}</tr>)
    }
    // setTimeout(() => {setGridHeight()}, 1000)
    return jsx
  }

  const setGridHeight = () => {
    let height = document.getElementsByClassName('left-side-bar')[0].clientHeight
    console.log(height)
    document.getElementById('chart').style.height = height;
  }

  const scrollStitchCount = () => {
    scrollX = document.getElementById('chart').scrollLeft
    let divs = document.getElementsByClassName('stitch-count')
    console.log(divs)
    for(let i = 0; i < divs.length; i++ ) {
      divs[i].scrollLeft = scrollX
    }
  }
  const scrollRowCount = () => {
    scrollY = document.getElementById('chart').scrollTop
    let divs = document.getElementsByClassName('row-count')
    console.log(divs)
    for(let i = 0; i < divs.length; i++ ) {
      divs[i].scrollTop = scrollY
    }
  }

  const renderStitchCount = () => {
    let countJSX = []
    for(let i = 1; i <= stitchCount; i++) {
      countJSX.push(<div className='numbers-stitch'>{i}</div>)
    }
    return countJSX
  }

  const renderRowCount = () => {
    let countJSX = []
    for(let i = 1; i <= rowCount; i++) {
      countJSX.push(<div className='numbers-row'>{i}</div>)
    }
    return countJSX
  }


  const renderStitches = (rowNo) => {
    const stitchJSX = []
    const rowCells = []

    for(let y=0; y < stitchCount; y++) {
      const id = `${rowNo}_${y+1}`
      rowCells.push(id)
      let styling = { width: 30, height: 30, backgroundColor: '#FFFFFF' }
      if (id in selectedCells) {
        styling.backgroundColor = selectedCells.[id]
      }
      stitchJSX.push(<td><div className='stitch' id={id} style={styling} onClick={(event) => { event.preventDefault(); selectingCells(id) }}></div></td>)
    }
    gridCells.push(rowCells)
    return stitchJSX
  }

  const selectingCells = (selectedID) => {
    setSaved(false)
    let findCellColumn = null
    let findCellRow = null

    if ( mirroring == 'horizontal' ) {

      gridCells.forEach((cellRow, idxRow) => {
        if (cellRow.includes(selectedID)) {
          cellRow.forEach((cell, idxCell) => {
            if (cell == selectedID) {
              const mirroredID = cellRow[cellRow.length - (1 + idxCell)]
              setSelectedCells({...currentSelectedCells, [selectedID]: colourPick, [mirroredID]: colourPick})
            }
          });
        }
      });

    } else if ( mirroring == 'vertical' ) {

      gridCells.forEach((cellRow, idxRow) => {
        if (cellRow.includes(selectedID)) {
          cellRow.forEach((cell, idxCell) => {
            if (cell == selectedID) {
              const mirroredID = gridCells[gridCells.length - (1 + idxRow)][idxCell]
              setSelectedCells({...currentSelectedCells, [selectedID]: colourPick, [mirroredID]: colourPick})
            }
          });
        }
      });

    } else if ( mirroring == false ) {

      setSelectedCells({...currentSelectedCells, [selectedID]: colourPick })
    }
  }



  if (stitchCount == null || rowCount == null) {

    return (
      <div className='grid-outer'></div>
    )
  } else {

    return (
      <div className='grid-outer'>
        <div className='stitch-count top'>{renderStitchCount()}</div>
        <div className='row-count'>{renderRowCount()}</div>
        <div className='grid-inner' id='chart' onScroll={() => { scrollStitchCount(); scrollRowCount() }}>
          <table>
            <tbody>
            {renderGrid()}
            </tbody>
          </table>
        </div>
        <div className='row-count right'>{renderRowCount()}</div>
        <div className='stitch-count bottom'>{renderStitchCount()}</div>
      </div>
    )

  }
}

export default Grid
