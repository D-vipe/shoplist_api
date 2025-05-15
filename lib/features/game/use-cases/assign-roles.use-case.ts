import Roles from '../core/enums/roles';
import Player from '../core/entities/player.class';


const assignRolesUseCase = ({ players, roles }: { players: Array<Player>, roles: Array<Roles> }): Array<Player> => {
    console.warn('[assignRoles] start');
    let rolesArray: Array<Roles>;
    let mafiaCount = 0;

    const numPlayers: number = players.length;
    const roundedOffMafiaAmount: number = Math.floor(numPlayers * .3);
    const minMafiaRoles: number = roundedOffMafiaAmount < 2 ? 2 : roundedOffMafiaAmount;

    if (numPlayers > 5) {
        for (let i = 0; i < numPlayers - 1; i++) {
            if (rolesArray.length == numPlayers) {
                break;
            }
            if (roles.includes(Roles.MAFIABOSS)) {
                if (mafiaCount < minMafiaRoles && !rolesArray.includes(Roles.MAFIABOSS)) {
                    rolesArray.push(Roles.MAFIABOSS);
                    console.info('ADDED MAFIABOSS');
                    mafiaCount++;
                    return;
                }
            }

            if (mafiaCount < minMafiaRoles) {
                rolesArray.push(Roles.MAFIA);
                console.info('ADDED MAFIA');
                mafiaCount++;
                return;
            }

            if (roles.includes(Roles.SHERIFF) && !rolesArray.includes(Roles.SHERIFF)) {
                rolesArray.push(Roles.SHERIFF);
                console.info('ADDED SHERIFF');
                return;
            }

            if (roles.includes(Roles.DOCTOR) && !rolesArray.includes(Roles.DOCTOR)) {
                rolesArray.push(Roles.DOCTOR);
                console.info('ADDED DOCTOR');
                return;
            }

            if (roles.includes(Roles.MISTRESS) && !rolesArray.includes(Roles.MISTRESS)) {
                rolesArray.push(Roles.MISTRESS);
                console.info('ADDED MISTRESS');
                return;
            }

            rolesArray.push(Roles.TOWNSPERSON);
            console.info('ADDED TOWNSPERSON');
        }

        console.table({ 'ROLES ARRAY': rolesArray });
    } else {
        console.error('NOT ENOUGH PLAYERS');
        return;
    }

    // Тасование ролей (Fisher-Yates Shuffle)
    for (let i = rolesArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [rolesArray[i], rolesArray[j]] = [rolesArray[j], rolesArray[i]];
    }

    let assignedPlayersRoles: Array<Player>;

    for (let i = 0; i < numPlayers; i++) {
        assignedPlayersRoles.push(players[i].update({ role: rolesArray[i] }));
    }

    return assignedPlayersRoles;
};

export default assignRolesUseCase;
