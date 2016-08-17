export type XFieldCoordinate = "a" | "b" | "c" | "d" | "e" | "f" | "g" | "h";
export type YFieldCoordinate = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8";

export interface ChessPiecePosition {
  x: XFieldCoordinate,
  y: YFieldCoordinate
};

export enum ChessPieceColor {
  White = 0,
  Black = 1
};