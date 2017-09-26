const assert = require('assert')
const RS = require('./')

let tests = [
  {
    k: 7,
    expected: [
      [ [ 0, 5 ], null, null, [ 7, 3 ], null, [ 4, 6 ], [ 1, 2 ] ],
      [ [ 2, 3 ], [ 0, 6 ], null, null, [ 1, 4 ], null, [ 5, 7 ] ],
      [ [ 6, 1 ], [ 3, 4 ], [ 0, 7 ], null, null, [ 2, 5 ], null ],
      [ null, [ 7, 2 ], [ 4, 5 ], [ 0, 1 ], null, null, [ 3, 6 ] ],
      [ [ 4, 7 ], null, [ 1, 3 ], [ 5, 6 ], [ 0, 2 ], null, null ],
      [ null, [ 5, 1 ], null, [ 2, 4 ], [ 6, 7 ], [ 0, 3 ], null ],
      [ null, null, [ 6, 2 ], null, [ 3, 5 ], [ 7, 1 ], [ 0, 4 ] ]
    ]
  }
]

for (let test of tests) {
  let result = RS(test.k)
  assert.deepEqual(result, test.expected)
}

for (let i = 7; i < 47; i += 2) {
  // should not throw any errors
  testConsistency(RS(i))
}

function testConsistency (rs) {
  for (let row of rs) {
    testRowCol(row, 'row')
  }
  for (let col of transpose(rs)) {
    testRowCol(col, 'column')
  }
}

function testRowCol (arr, type) {
  // every row and column should include k + 1 unique symbols
  let nums = arr.reduce((nums, pair) => {
    if (!pair) { return nums }  // null, no pair

    let x = pair[0]
    let y = pair[1]

    if (nums.includes(x) ||
        nums.includes(y)) {
      throw new Error(`Pair ${pair} has symbol that already exist in ${type} ${arr}.`)
    }
    if (x === y) {
      throw new Error(`Equal symbols in pair, row ${arr}.`)
    }

    nums.push(x)
    nums.push(y)

    return nums
  }, [])
  assert.equal(
    nums.length,
    arr.length + 1,
    `Did not find ${arr.length + 1} symbols for ${type} ${arr}.`
  )
}

/**
 * Transposes square, such that returned array is array of columns.
 *
 * @param {array} square 2D array of rows.
 * @returns {array} 2D array of columns.
 */
function transpose (square) {
  let flipped = []
  for (let i = 0; i < square.length; i++) {
    let col = square.map(row => row[i])
    flipped.push(col)
  }
  return flipped
}

