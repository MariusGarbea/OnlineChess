# OnlineChess

## Candidate Release Log

- 1.0.0
 - Initial version with functioning game 

## Quick Start

```bash

# Go inside the directory
cd simple-react-full-stack

# Install dependencies
yarn (or npm install)

# Start development server
yarn dev (or npm run dev)

# Build for production
yarn build (or npm run build)

# Start production server
yarn start (or npm start)
```

## Running Linter

This project is using [ESLint](https://eslint.org/) as a static analysis tool.

Make sure to install it using the following:

```bash
npm install eslint --save-dev

# or

yarn add eslint --dev
```

The configuration file we'll be using should be present in the repo.
Check out `app/.eslintrc.json` to see the full configuration

Then to perform static analysis of the JS files, run:

```bash
npx eslint src/
```

within the app directory and the tool will produce a report about errors
it finds.

## Documentation

### Board
- There are three representation of the game board
```
chess: null, // a chess object
ascii: null, // ascii string representation of the game
board: null, // matrix representation of the game
```

- **chess**: the chess.js object
```
var chess = new Chess();
```

- **ascii**: the ascii representation of the board
```
chess.move('e4');
chess.move('e5');
chess.move('f4');

chess.ascii();
// -> '   +------------------------+
//      8 | r  n  b  q  k  b  n  r |
//      7 | p  p  p  p  .  p  p  p |
//      6 | .  .  .  .  .  .  .  . |
//      5 | .  .  .  .  p  .  .  . |
//      4 | .  .  .  .  P  P  .  . |
//      3 | .  .  .  .  .  .  .  . |
//      2 | P  P  P  P  .  .  P  P |
//      1 | R  N  B  Q  K  B  N  R |
//        +------------------------+
//          a  b  c  d  e  f  g  h'
```


- **board**: a 8 x 8 matrix representation of the board object
This is obtained by parsing the FEN representation of the board
(https://en.wikipedia.org/wiki/Forsyth%E2%80%93Edwards_Notation)
should result in something like the ascii representation above.

```
Example: rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1
```
  - **Piece notation**: (pawn = "P", knight = "N", bishop = "B", rook = "R", queen = "Q" and king = "K")
  - **Color**: white pieces are designated using upper-case letters ("PNBRQK") while black pieces use lowercase ("pnbrqk")
  - **Empty squares**: noted using digits 1 through 8 (the number of empty squares), and "/" separates ranks.
    - E.g, so '4P3' means 4 empty space, follow by a white pawn, follow by 3 empty space
  - **Move**: 'w' means White moves next, "b" means Black moves next.
