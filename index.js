const starters = require('./starters.json')

module.exports = RoomSquare

/**
 * Get Room square with side `k`.
 *
 * @param {number} k Odd integer, size of side in square returned.
 */
function RoomSquare (k) {
  if (typeof k !== 'number' || k % 2 === 0 || k < 7 || k > 47) {
    throw new Error(`Exptected odd k, minimum 7, maximum 47. Got k=${k}.`)
  }
  return generateRoomSquare(starters[k])
}

/**
 * Creates a Room Square from a starter row. For more, see
 * "Construction of Room Squares" by Stanton and Mullin, 1968.
 *
 * Here is an example starter, for k=7:
 *   [[0,6], null, null, [1,4], null, [7,5], [2,3]]
 *
 * @param {array} starter Array of pairs at correct column, such that
 *                        a room square can be created by shifting and
 *                        adding 1 for each row modulus `starter.length`.
 */
function generateRoomSquare (starter) {
  let k = starter.length
  let temp = starter.slice()
  let square = [starter.slice()]  // starter is first row
  for (let i = 1; i < k; i++) {
    // copy array
    temp = temp.slice()
    // shift array
    let last = temp.pop()
    temp.unshift(last)
    // add 1
    temp = temp.map(i => adder(i, k))
    // push row to result
    square.push(temp)
    debugger
  }
  return square
}

/**
 * Adds one to each item of pair if item is not zero. Wraps around k, k + 1 = 1.
 * Returns the pair unaltered if it's falsy (null, undefined).
 *
 * @param {array} pair
 */
function adder (pair, k) {
  debugger
  return pair ? pair.map(item => {
    if (item === 0) {
      // special symbol, should be the same through the diagonal
      return 0
    } else if (item === k) {
      // % modulo in js gives 7 % 7 = 0, which is the "special" symbol
      // so we do the modulo manually
      return 1
    } else {
      return item + 1
    }
  })
  : pair
}
