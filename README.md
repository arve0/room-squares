# room-squares

Constructs Room squares from k=7 to k=47.

## Install
```
npm install room-squares
```

## Usage
```js
let RS = require('room-square')

let square = RS(7)
```

Which gives you:
```json
[
  [ [0,5], null,  null,  [7,3], null,  [4,6], [1,2] ],
  [ [2,3], [0,6], null,  null,  [1,4], null,  [5,7] ],
  [ [6,1], [3,4], [0,7], null,  null,  [2,5], null  ],
  [ null,  [7,2], [4,5], [0,1], null,  null,  [3,6] ],
  [ [4,7], null,  [1,3], [5,6], [0,2], null,  null  ],
  [ null,  [5,1], null,  [2,4], [6,7], [0,3], null  ],
  [ null,  null,  [6,2], null,  [3,5], [7,1], [0,4] ]
]
```

Which is useful for creating schedules for tournaments, because the square has the properties:

1. Has k + 1 unique symbols, grouped in pairs.
2. Every pair appear exactly once in the whole square.
3. Every symbol is appear excatly once in each row.
4. Every symbol is appear excatly once in each column.

In a tournament this translates to rows being rounds, columns being tables/problems. Every player will therefor meet every oponent exactly once, and do every problem exactly once.

## Theory
Starters are from [Contruction of Room Squares](https://projecteuclid.org/euclid.aoms/1177698135) by Stanton and Mullin.

## License
MIT - Arve Seljebu 2017
