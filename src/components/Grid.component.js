import React, { Component, useContext, useState } from 'react';
import { GlobalContext } from '../contexts/GlobalContext.js';

import '../styles/Grid.css';

const Grid = () => {
  const { stitches, rows, colourPick, selectedCells, setSelectedCells } = useContext(GlobalContext)
  // const [colour, setColour] = useState('#FFFFFF')
  // const [selectedCells, setSelectedCells] = useState({})
  const currentSelectedCells = selectedCells


  const renderGrid = () => {
    let jsx = []
    for(let i=0; i<rows;i++) {
      jsx.push(
        <tr>
          {renderStitches(i+1)}
        </tr>
      )
    }
    return jsx
  }



  const renderStitches = (rowNo) => {

    const stitchJSX = []
    // const dimensions = 400 * ((100 / stitches) / 100);

    for(let y=0; y < stitches; y++) {
      const id = `${rowNo}_${y+1}`
      let styling;
      if (id in selectedCells) {
        styling = {
          width: 30,
          height: 30,
          backgroundColor: selectedCells.[id]
        }
      } else {
        styling = {
          width: 30,
          height: 30,
          backgroundColor: '#FFFFFF'
        }
      }
      stitchJSX.push(<td><div className='stitch' id={id} style={styling} onClick={(event) => { event.preventDefault(); setSelectedCells({...currentSelectedCells, [id]: colourPick }) }}></div></td>)
    }
    return stitchJSX
  }


  if (stitches == null || rows == null) {
    return (
      <div className='grid'>

      </div>
    )
  } else {
    return (
      <div className='grid'>
        <table>
          <tbody>
          {renderGrid()}
          </tbody>
        </table>
      </div>
    )
  }
}

export default Grid
