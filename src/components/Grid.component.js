import React, { Component, useContext } from 'react';
import { GlobalContext } from '../contexts/GlobalContext.js';

import '../styles/Grid.css';

const Grid = () => {
  const { stitchGrid } = useContext(GlobalContext)

  console.log(stitchGrid)

  return (
    <div className='grid'>{stitchGrid}</div>
  )
}

export default Grid
