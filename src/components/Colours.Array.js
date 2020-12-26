export default class Colours extends Array {

  constructor(props) {
    super(props)
    this.array = [['#000000', '#FF0000'], ['#FFFFFF', '#00FF00'], ['#0000FF', '#FFFF00']]
  }

  add(colour) {
    if (colour.includes('#')) {
      colour = colour
    } else {
      colour = `#${colour}`
    }
    this.element = this.array[this.array.length - 1]
    if( this.element[1] == null) {
      this.array[this.array.length - 1][1] = `${colour}`
    } else {
      this.array.push([`${colour}`, null])
    }
    this.returning()
  }

  returning() {
    return this.array
  }
}
