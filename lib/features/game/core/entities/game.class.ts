import Phases from '../enums/phases';
import Roles from '../enums/roles';
import Player from './player.class';
import Vote from './votes.interface';

class Game {
    readonly _id: string;
    readonly roles: Array<Roles>;
    readonly players: Array<Player>;
    readonly phase: Phases;
    readonly votes: Array<Vote>;
    readonly dayNightIndex: number;
    readonly killedThisNight?: string; // Player._id killed this night
    readonly savedThisNight?: string; // Player._id saved this night
    readonly sheriffCheck?: string; // Player._id to be checked by sheriff this night

    constructor({ id, roles, players, votes = [], phase, dayNightIndex = 0, killedThisNight, savedThisNight, sheriffCheck }: { id: string, roles: Array<Roles>, players: Array<Player>, votes?: Array<Vote>, phase: Phases, dayNightIndex?: number, killedThisNight?: string, savedThisNight?: string, sheriffCheck?: string, }) {
        this._id = id;
        this.roles = roles;
        this.players = players;
        this.votes = votes;
        this.phase = phase;
        this.dayNightIndex = dayNightIndex;
        this.killedThisNight = killedThisNight;
        this.savedThisNight = savedThisNight;
        this.sheriffCheck = sheriffCheck;
    }

    update({ players, phase, votes, dayNightIndex, killedThisNight, savedThisNight, sheriffCheck }: { players?: Array<Player>, phase?: Phases, votes?: Array<Vote>, dayNightIndex?: number, killedThisNight?: string, savedThisNight?: string, sheriffCheck?: string }): Game {
        return new Game({
            id: this._id,
            roles: this.roles,
            players: players ?? this.players,
            votes: votes ?? this.votes,
            phase: phase ?? this.phase,
            dayNightIndex: dayNightIndex ?? this.dayNightIndex,
            killedThisNight: killedThisNight,
            savedThisNight: savedThisNight,
            sheriffCheck: sheriffCheck,
        });
    }

}

export default Game;
