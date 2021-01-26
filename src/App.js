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
    this.setState({ moves: []});
  }

  getPiece = (x, y) => {
    const list = this.state.moves.filter((item) => {
      return (item.x === x && item.y === y);
    });
    return list[0]
  }

  addMove = (x, y) => {
    const { playerTurn } = this.state;
    const nextPlayerTurn = playerTurn === 'red' ? 'yellow' :'red'
    this.setState({ moves: this.state.moves.concat({ x, y, player: playerTurn }), playerTurn: nextPlayerTurn})
  }

  renderBoard() {
    const { rows, columns } = this.state;
    const rowViews = [];

    for (let row = 0; row < this.state.rows; row++) {
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
        {rowViews}
      </div>
    )
  }
  render() { 
    const { style } = this.props;
    return ( 
      <div style={style ? Object.assign({}, styles.container, style) : styles.container}>
        <div>
          {this.renderBoard()}
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