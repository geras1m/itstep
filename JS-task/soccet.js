//Task 1

// const game = {
//     team1: 'Bayern Munich',
//     team2: 'Borrussia Dortmund',
//     players: [
//         [
//             'Neuer',
//             'Pavard',
//             'Martinez',
//             'Alaba',
//             'Davies',
//             'Kimmich',
//             'Goretzka',
//             'Coman',
//             'Muller',
//             'Gnarby',
//             'Lewandowski',
//         ],
//         [
//             'Burki',
//             'Schultz',
//             'Hummels',
//             'Akanji',
//             'Hakimi',
//             'Weigl',
//             'Witsel',
//             'Hazard',
//             'Brandt',
//             'Sancho',
//             'Gotze',
//         ],
//     ],
//     score: '4:0',
//     scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
//     date: 'Nov 9th, 2037',
//     odds: {
//         team1: 1.33,
//         x: 3.25,
//         team2: 6.5,
//     },
// };
//
//
// let [players1, players2] = [game.players[0], game.players[1]];
// console.log(players1, players2);
//
// let [gk, ...fieldPlayers] = players1;
// console.log(gk, fieldPlayers);
//
// let allPlayers = [...players1, ...players2];
// console.log(allPlayers);
//
// let players1Final = [...players1, 'Thiago', 'Coutinho', 'Perisic'];
// console.log(players1Final);
//
// ({team1,x: araw, team2} = game.odds);
// console.log(team1,araw, team2);


//Task 2

const gameEvents = new Map([
    [17, '\u26BD'+' GOAL'],
    [36, "\u1f534" + ' Substitution'],
    [47, '\u26BD'+' GOAL'],
    [61, '' + ' Substitution'],
    [64, '' + ' Yellow card'],
    [69, '' + ' Red card'],
    [70, '' + ' Substitution'],
    [72, '' + ' Substitution'],
    [76, '\u26BD'+' GOAL'],
    [80, '\u26BD'+' GOAL'],
    [92, '' + ' Yellow card'],
])

// let events = new Set(gameEvents.values());
// console.log(events);

// gameEvents.delete(64);
// console.log(gameEvents);

for (let item of gameEvents) {
    if(item[0] <= 45){
        console.log(`[ПЕРВЫЙ ТАЙМ] ${item[0]}: ${item[1]}`)
    }
    if(item[0] > 45){
        console.log(`[ВТОРОЙ ТАЙМ] ${item[0]}: ${item[1]}`)
    }
}