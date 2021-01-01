import React, { Component, useContext, useState } from 'react';
import { GlobalContext } from '../contexts/GlobalContext.js';

import '../styles/Grid.css';

const Grid = () => {
  const { stitches, rows, colourPick, selectedCells, setSelectedCells, mirroring } = useContext(GlobalContext)
  const gridCells = []
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
    console.log(gridCells)
    return jsx
  }



  const renderStitches = (rowNo) => {

    const stitchJSX = []
    const rowCells = []
    // const dimensions = 400 * ((100 / stitches) / 100);

    for(let y=0; y < stitches; y++) {
      const id = `${rowNo}_${y+1}`
      rowCells.push(id)
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
