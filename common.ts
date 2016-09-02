import {ChessBoard} from "./board"

export type XFieldCoordinate = "a" | "b" | "c" | "d" | "e" | "f" | "g" | "h";
export type YFieldCoordinate = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8";

export type Stepper = (i: number) => {x:number, y:number};

// these are used to map fields to names and reverse
export var xMap = "abcdefgh";
export var yMap = "87654371";

export interface SerializedChessPiecePosition {
  x: XFieldCoordinate,
  y: YFieldCoordinate
};

export interface ChessPiecePosition {
  x: number;
  y: number;
}

export enum ChessPieceColor {
  White = 0,
  Black = 1
};

export function SerializePosition(p: ChessPiecePosition) : SerializedChessPiecePosition {
  return {
    x: <XFieldCoordinate>xMap.charAt(p.x),
    y: <YFieldCoordinate>yMap.charAt(p.y)
  }
}

export function DeserializePosition(p: SerializedChessPiecePosition) : ChessPiecePosition {
  return {
    x: xMap.indexOf(p.x),
    y: yMap.indexOf(p.y)
  }
}

export function isPositionInBounds(p: ChessPiecePosition) : boolean {
  if (!(p.x < 8) || !(p.x >= 0)) {
    return false;
  }
  if (!(p.y < 8) || !(p.y >= 0)) {
    return false;
  }
  return true;
}

export function isOccupied(b: ChessBoard, p: ChessPiecePosition) : boolean {
  return (b.getPieceAtPosition(p) !== null)
}

export var rookSteppers : Stepper[] = [
  function(i: number) { return {x: this.position.x + i, y: this.position.y + i} },
  function(i: number) { return {x: this.position.x + i, y: this.position.y - i} },
  function(i: number) { return {x: this.position.x + i, y: this.position.y + i} },
  function(i: number) { return {x: this.position.x + i, y: this.position.y + i} }
]

export var bishopSteppers  : Stepper[] = [
  function(i: number) { return {x: this.position.x + i, y: this.position.y} },
  function(i: number) { return {x: this.position.x - i, y: this.position.y} },
  function(i: number) { return {x: this.position.x, y: this.position.y + i} },
  function(i: number) { return {x: this.position.x, y: this.position.y - i} }
]

// hey we saved a lot of code here i feel really good about myself
export var queenSteppers  : Stepper[] = [].concat(bishopSteppers, rookSteppers);