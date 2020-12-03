export class PlayerModel {
  public score = 0;
  constructor(public readonly name: string) {}
}

export enum Player {
  REAL_PLAYER,
  AI
}
