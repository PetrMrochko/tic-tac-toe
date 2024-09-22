{\rtf1\ansi\ansicpg1251\cocoartf2639
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx566\tx1133\tx1700\tx2267\tx2834\tx3401\tx3968\tx4535\tx5102\tx5669\tx6236\tx6803\pardirnatural\partightenfactor0

\f0\fs24 \cf0 const X_CLASS = 'x';\
const CIRCLE_CLASS = 'circle';\
const WINNING_COMBINATIONS = [\
  [0, 1, 2],\
  [3, 4, 5],\
  [6, 7, 8],\
  [0, 3, 6],\
  [1, 4, 7],\
  [2, 5, 8],\
  [0, 4, 8],\
  [2, 4, 6]\
];\
\
const cellElements = document.querySelectorAll('[data-cell]');\
const board = document.querySelector('.board');\
const winningMessageElement = document.getElementById('winningMessage');\
const winningMessageTextElement = document.querySelector('[data-winning-message-text]');\
const restartButton = document.getElementById('restartButton');\
let circleTurn;\
\
startGame();\
\
restartButton.addEventListener('click', startGame);\
\
function startGame() \{\
  circleTurn = false;\
  cellElements.forEach(cell => \{\
    cell.classList.remove(X_CLASS);\
    cell.classList.remove(CIRCLE_CLASS);\
    cell.removeEventListener('click', handleClick);\
    cell.addEventListener('click', handleClick, \{ once: true \});\
  \});\
  setBoardHoverClass();\
  winningMessageElement.classList.remove('show');\
\}\
\
function handleClick(e) \{\
  const cell = e.target;\
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;\
  placeMark(cell, currentClass);\
  if (checkWin(currentClass)) \{\
    endGame(false);\
  \} else if (isDraw()) \{\
    endGame(true);\
  \} else \{\
    swapTurns();\
    setBoardHoverClass();\
  \}\
\}\
\
function endGame(draw) \{\
  if (draw) \{\
    winningMessageTextElement.innerText = '\uc0\u1053 \u1080 \u1095 \u1100 \u1103 !';\
  \} else \{\
    winningMessageTextElement.innerText = `$\{circleTurn ? "O" : "X"\} \uc0\u1074 \u1099 \u1080 \u1075 \u1088 \u1072 \u1083 !`;\
  \}\
  winningMessageElement.classList.add('show');\
\}\
\
function isDraw() \{\
  return [...cellElements].every(cell => \{\
    return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS);\
  \});\
\}\
\
function placeMark(cell, currentClass) \{\
  cell.classList.add(currentClass);\
\}\
\
function swapTurns() \{\
  circleTurn = !circleTurn;\
\}\
\
function setBoardHoverClass() \{\
  board.classList.remove(X_CLASS);\
  board.classList.remove(CIRCLE_CLASS);\
  if (circleTurn) \{\
    board.classList.add(CIRCLE_CLASS);\
  \} else \{\
    board.classList.add(X_CLASS);\
  \}\
\}\
\
function checkWin(currentClass) \{\
  return WINNING_COMBINATIONS.some(combination => \{\
    return combination.every(index => \{\
      return cellElements[index].classList.contains(currentClass);\
    \});\
  \});\
\}\
}