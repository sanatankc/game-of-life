import React, { Component } from 'react'

export default class Board extends Component {
  
  componentDidUpdate() {
    this.draw()
  }
  
  componentWillMount() {
    const { cellHeight, cellWidth, rowPadding, colPadding } = this.props
    this.canvasWidth = (cellWidth + rowPadding) * 50 - 2
    this.canvasHeight = (cellHeight + colPadding) * 30 - 2
  }
  
  draw() {
    this.ctx = this.canvas.getContext('2d')
    const { 
      cellHeight, 
      cellWidth, 
      rowPadding, 
      colPadding,
      deadCellColor,
      aliveOldCellColor,
      aliveYoungCellColor
    } = this.props
    const cellColorFromState = [deadCellColor, aliveOldCellColor, aliveYoungCellColor]
    this.props.board.forEach((row, rowIndex) => {
      const y = (cellHeight + colPadding) * rowIndex
      row.forEach((cell, cellIndex) => {
        const x = (cellWidth + rowPadding) * cellIndex
        this.ctx.fillStyle = cellColorFromState[cell]
        this.ctx.fillRect(x, y, cellWidth, cellHeight)
      })
    })
  }
  
  render() {
    return (
      <canvas 
        ref={canvas => {this.canvas = canvas}}
        width={this.canvasWidth}
        height={this.canvasHeight}
        style={{ 
          background: this.props.lineColor,
          boxShadow: '5px 5px 25px 0px rgba(46, 61, 73, 0.2)'
        }}
      ></canvas>
    )
  }
}