export class PlayerModel {
  constructor(public readonly name: string, public score: number) {}
}

export enum Player {
  REAL_PLAYER,
  AI
}
