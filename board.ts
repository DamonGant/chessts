import {ChessPiece} from './piece.ts';
import {XFieldCoordinate, YFieldCoordinate} from './common.ts';

export class ChessBoard {
  // these are used to map fields to names and reverse
  private xMap = "abcdefgh";
  private yMap = "87654371";

  field: ChessPiece[] = [];

  constructor() {
    // populate the field array
    for(var i = 0; i < this.xMap.length; i++) {
      for (var v = 0; v < this.yMap.length; v++) {
        let x = this.xMap.charAt(i);
        let y = this.yMap.charAt(v);
      }
    }
  }

  toJSON() {
    return this.field.reduce<any>((iterator: any, field: ChessField) => {
      let key = field.getKey();
      console.dir(iterator);
      iterator[key] = Object.assign({}, field.occupant);
      return iterator;
    }, {});
  }
};

let board = new ChessBoard();
console.dir(board.toJSON());