import Role from "../enums/roles";

// interface _Player {
//   _id: string,
//   userId: string,
//   nickname: string,
//   role: Role,
//   alive: boolean,
//   votes: Array<string>,
// }

class Player {
  readonly _id: string;
  readonly userId: string;
  readonly nickname: string;
  readonly role: Role;
  readonly alive: boolean;
  readonly votes: Array<string>;  // Array of [Player._id]s voted against current Player

  constructor({ id, userId, nickname, role, alive = true, votes = [] }: { id: string, userId: string, nickname: string, role: Role, alive?: boolean, votes?: Array<string> }) {
    this._id = id;
    this.userId = userId;
    this.nickname = nickname;
    this.role = role;
    this.alive = alive;
    this.votes = votes;
  }

  update({ id, userId, nickname, role, alive, votes }: { id?: string, userId?: string, nickname?: string, role?: Role, alive?: boolean, votes?: Array<string> }): Player {
    return new Player({
      id: id ?? this._id,
      userId: userId ?? this.userId,
      nickname: nickname ?? this.nickname,
      role: role ?? this.role,
      alive: alive ?? this.alive,
      votes: votes ?? this.votes
    });
  }

  public get currentVotesAgainst(): number {
    return this.votes.length;
  }

  public get isMafia(): boolean {
    return this.role === Role.MAFIA || this.role === Role.MAFIABOSS;
  }
}

export default Player;
