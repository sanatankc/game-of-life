import React, { Component } from 'react'
import Board from './components/Board'
import './App.css'
import { setTimeout } from 'core-js/library/web/timers';

/**
 * 0: Dead Cell
 * 1: Live Live Cell
 * 2: Young Live Cell
 */

const themes = [
  { aliveOldCellColor: '#1B263B', aliveYoungCellColor: '#415A77', deadCellColor: '#FBF6F5', lineColor: '#0D1B2A' },
  { aliveOldCellColor: '#104F55', aliveYoungCellColor: '#32746D', deadCellColor: '#9EC5AB', lineColor: '#01200F' },
  { aliveOldCellColor: '#EA3788', aliveYoungCellColor: '#ED5B9D', deadCellColor: '#FBF6F5', lineColor: '#C02E70' },
  { aliveOldCellColor: '', aliveYoungCellColor: '', deadCellColor: '', lineColor: '' },
]
const theme = themes[2]

class App extends Component {
  state = {
    board: [],
    generation: 0,
  }
  
  componentDidMount() {
    this.setState({board: this.generateInitialBoardState()}, () => {
      this.generateNextGeneration()
    })
  }
  
  generateInitialBoardState() {
    return new Array(30).fill(0)
      .map(() => {
        const row = new Array(50).fill(0)
        return row.map(() => Math.floor(Math.random() * 2))
      })
  }
  
  generateaGlider() {
  const state =  new Array(30).fill(0)
    .map(() => {
      const row = new Array(50).fill(0)
      return row
    })
  
  state[0 + 3][0 + 3] = 1
  state[1 + 3][1 + 3] = 1
  state[1 + 3][2 + 3] = 1
  state[2 + 3][0 + 3] = 1
  state[2 + 3][1 + 3] = 1
  return state
  }
  
  generateNextGeneration() {
    const nextGenerationBoard = this.state.board.map((row, y) => (
        row.map((cell, x) => (
          this.transformCellByRule(cell, this.findNeighbours(x, y))
        ))
      ))
    this.setState(prev => ({
      board: nextGenerationBoard,
      generation: prev.generation + 1
    }), () => {
      setTimeout(this.generateNextGeneration.bind(this), 100)
    })
  }
  
  transformCellByRule(cell, neighbours) {
    const cellIsAlive = cell === 1 || cell === 2
    const aliveInNeighbour = neighbours.filter(cell => (cell === 1 || cell === 2 ))
    const numOfAliveNeighbours = aliveInNeighbour.length
    if (cellIsAlive) {
      if (numOfAliveNeighbours < 2) {
        return 0
      } else if (numOfAliveNeighbours === 2 || numOfAliveNeighbours === 3) {
        return 1
      } else {
        return 0
      }
    } else {
      if (numOfAliveNeighbours === 3) {
        return 2
      } else {
        return 0
      }
    }
  }
  
  findNeighbours(x, y) {
    const leftX = (x - 1 === -1) 
      ? 49
      : x - 1
    const rightX = (x + 1 === 50)
      ? 0
      : x + 1
    const topY = (y - 1 === -1)
      ? 29
      : y - 1
    const bottomY = (y + 1 === 30)
      ? 0
      : y + 1
    
    const left =  this.state.board[y][leftX]
    const right = this.state.board[y][rightX]
    const top = this.state.board[topY][x]
    const bottom = this.state.board[bottomY][x]
    const leftTop = this.state.board[topY][leftX]
    const leftBottom = this.state.board[bottomY][leftX]
    const rightTop = this.state.board[topY][rightX]
    const rightBottom = this.state.board[bottomY][rightX]
    
    return [left, right, top, bottom, leftTop, leftBottom, rightTop, rightBottom]
  }
  
  
  
  render() {
    return (
      <div className='Main'>
        <Board 
          board={this.state.board}
          lineColor={theme.lineColor}
          deadCellColor={theme.deadCellColor}
          aliveYoungCellColor={theme.aliveYoungCellColor}
          aliveOldCellColor={theme.aliveOldCellColor}
          cellWidth={12}
          cellHeight={12}
          rowPadding={2}
          colPadding={2}
        />
      </div>
    )
  }
}

export default App
