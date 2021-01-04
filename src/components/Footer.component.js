import React, { Component, useContext, useEffect, useState } from 'react';
import Colours from './Colours.Array'
import { GlobalContext } from '../contexts/GlobalContext.js'

import '../styles/footer.css';

const Footer = () => {


  return (
    <div className='footer'>
      <table>
        <tbody>
          <tr>
            <td>
              <img src={require('../assets/PJKnitCrochet-SMALL.png').default} />
            </td>
            <td>
              <p>PJ Knit and Crochet | Created By Ben Lynch</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Footer
