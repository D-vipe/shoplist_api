import Player from "./player.class";

interface Vote {
    player: Player, // [Player._id] who voted
    target: string, // [Player._id] voted against
}

export default Vote;
