const fs = require('fs')

let input = fs.readFileSync('starters.txt', 'utf-8')
let lines = input.split('\n')
let numberOfStarters = lines.length / 5

let output = {}

for (let i = 0; i < numberOfStarters; i++) {
  let startRow = parseLine(lines[1 + i * 5])
  let endColumn = parseLine(lines[3 + i * 5])

  let n = startRow.length
  let k = 2 * n - 1
  let starter = [startRow.shift()]

  let diff = startRow.map((p, ii) => {
    let d = endColumn[ii][0] - p[0]
    let e = endColumn[ii][1] - p[1]
    // - 1 -> k - 1
    d = d < 0 ? d + k : d
    e = e < 0 ? e + k : e
    if (e !== d) {
      let msg = `Difference not equal between pair ${ii}, row=${p} col=${endColumn[ii]}.\n`
      msg += `diff=${d},${e} k=${k}\n`
      msg += `PATTERNED STARTER\n${lines[1 + i * 5]}\n`
      msg += `POSSIBLE COLUMN IS\n${lines[3 + i * 5]}`
      throw new Error(msg)
    }
    return d
  })
  // k=7 gives 6 as last index. Subtract difference to get start columns for first row.
  let positions = diff.map(d => k - d - 1)

  for (let i = 1; i < k; i++) {
    let pairPosition = positions.indexOf(i)
    if (pairPosition !== -1) {
      starter.push(startRow[pairPosition])
    } else {
      starter.push(null)
    }
  }

  output[k] = starter
}

output = JSON.stringify(output).replace(/("\d+":)/g, '\n  $1')
fs.writeFileSync('starters.json', output)


/**
 * Parses a line like this to (0 5) (1 2) (4 6) (7 3)
 * an array like this
 *
 * @param {string} str Line to parse
 */
function parseLine (str) {
  //           (number number)
  let pairRegExp = /\((\d+) (\d+)\)/
  // matches all pairs
  let globalRegExp = new RegExp(pairRegExp, 'g')
  let pairs = str.match(globalRegExp)
  return pairs.map(p => {
    let match = p.match(pairRegExp)
    if (!match) {
      throw new Error(`Match error for pairs on line: ${str}`)
    }
    return [parseInt(match[1], 10), parseInt(match[2], 10)]
  })
}
