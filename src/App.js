import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    rows: 6,
    columns: 7,
    moves: [],
    playerTurn: 'red',
  };

  resetBoard = () => {
    this.setState({ moves: [], winner: null });
  }

  getPiece = (x, y) => {
    const list = this.state.moves.filter((item) => {
      return (item.x === x && item.y === y);
    });
    return list[0]
  }

  getWinningMovesForVelocity = (xPosition, yPosition, xVelocity, yVelocity) => {
    const winningMoves = [{ x: xPosition, y: yPosition }];
    const player = this.getPiece(xPosition, yPosition).player;

    for(let delta = 1; delta < 4; delta += 1) {
      const checkX = xPosition + xVelocity * delta;
      const checkY = yPosition + yVelocity * delta;

      const checkPiece = this.getPiece(checkX, checkY);
      if(checkPiece && checkPiece.player === player) {
        winningMoves.push({x: checkX, y: checkY});
      } else {
        break;
      }
    }

    for(let delta = -1; delta > -4; delta -= 1) {
      const checkX = xPosition + xVelocity * delta;
      const checkY = yPosition + yVelocity * delta;

      const checkPiece = this.getPiece(checkX, checkY);
      if(checkPiece && checkPiece.player === player) {
        winningMoves.push({x: checkX, y: checkY});
      } else {
        break;
      }
    }

    return winningMoves;
  }

  checkForWin = (x, y) => {
    const velocities = [{ x: 1, y: 0}, { x: 0, y: 1}, { x: -1, y: 1}, { x: 1, y: 1}];
    for(let idx = 0; idx < velocities.length; idx += 1) {
      const element = velocities[idx];
      const winningMoves = this.getWinningMovesForVelocity(x, y, element.x, element.y);
      if(winningMoves.length > 3) {
        this.setState({ winner: this.getPiece(x,y).player, winningMoves })
      }
    }


  }

  addMove = (x, y) => {
    const { playerTurn } = this.state;
    const nextPlayerTurn = playerTurn === 'red' ? 'yellow' :'red';
    let availableYPosition = null;
    for(let position = this.state.rows - 1; position >= 0; position--) {
      if(!this.getPiece(x, position)) {
        availableYPosition = position;
        break;
      }
    }
    if(availableYPosition !== null) {
      this.setState({ moves: this.state.moves.concat({ x, y: availableYPosition, player: playerTurn }), playerTurn: nextPlayerTurn}, () => this.checkForWin(x, availableYPosition, playerTurn));
      
    }
  }

  renderBoard() {
    const { rows, columns, winner } = this.state;
    const rowViews = [];

    for (let row = 0; row < this.state.rows; row += 1) {
      const columnViews = [];
      for (let column = 0; column < this.state.columns; column += 1) {
        const piece = this.getPiece(column, row);
        columnViews.push(
          <div onClick={() => {this.addMove(column, row)}} style={{ width: '8vw', height: '8vw', backgroundColor: '#00a8ff', display:'flex', padding: 5, cursor: 'pointer' }}>
            <div style={{ borderRadius: '50%', backgroundColor: 'white', flex: 1, display: 'flex' }}>
              {piece ? <div style={{ backgroundColor: piece.player, flex: 1, borderRadius: '50%', border: '1px solid #333' }}/> : undefined}
            </div>
          </div>
        );
      }
      rowViews.push(
        <div style={{display:'flex', flexDirection:'row'}}>{columnViews}</div>
      )
    }
    return (
      <div style={{ backgroundColor: 'red', display: 'flex', flexDirection: 'column' }}>
        {winner && <div onClick={this.resetBoard} style={{ position: 'absolute', left: 0, right: 0, bottom: 0, top: 0, zIndex: 3, backgroundColor: 'rgba(0, 0, 0, .5)', diplay: 'flex', 
        justifyContent: 'center', alignItems: 'center', color: '#fff', fontWeight: '200', fontSize: '8VW' }} > {`${winner} WINS!!`}</div>} 
        {rowViews}
      </div>
    )
  }
  render() { 
    const { style } = this.props;
    const { playerTurn } = this.state
    return ( 
      <div style={{ ...styles.container, backgroundColor: playerTurn }} >
        <div>
          {this.renderBoard()}
          <button onClick={this.resetBoard}>Clear Board</button>
        </div>
      </div>
      
     );
  }
}

const styles = {
  container: {
    height: '100%',
    padding: 5,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
};
 
export default App;