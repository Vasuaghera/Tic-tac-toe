export type Player = 'X' | 'O';
export type BoardState = (Player | null)[];
export type GameStatus = 'playing' | 'won' | 'draw';