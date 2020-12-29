import React, { useContext } from 'react';

import { GlobalContext } from '../contexts/GlobalContext.js'

const Colours = () => {

  const { colours, updateColours } = useContext(GlobalContext)

  const add = (addColour) => {
    if (addColour.includes('#')) {
      addColour = addColour
    } else {
      addColour = `#${addColour}`
    }
    const viewLastElement = colours[colours.length-1]
    if (viewLastElement[1] == null) {
      const editLastElement = viewLastElement
      const [...fullColours] = colours
      fullColours.pop()
      editLastElement[1] = addColour
      updateColours([...fullColours, editLastElement])
    } else {
      updateColours([...colours, [addColour, null]])
    }
  }
  

  return {
    add: add
  }
}

export default Colours;
