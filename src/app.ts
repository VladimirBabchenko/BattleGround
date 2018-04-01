import "./assets/scss/styles.scss";
import MilitaryResource from "./assets/ts/military-resource";
import Squad from "./assets/ts/squad";
import BattleField from "./assets/ts/battlefield";

console.log(MilitaryResource)

let archer = new MilitaryResource("archer", 200, 150, 150, 200, 200, "/src/assets/img/paladin.png");
let paladin = new MilitaryResource("palladin", 200, 100, 100, 100, 100, "/src/assets/img/paladin.png");

let squad = new Squad("blue", [archer, paladin]);
document.body.appendChild(squad.squadDom);
console.log(squad);

let archer1 = new MilitaryResource("archer", 200, 150, 150, 200, 200, "/src/assets/img/paladin.png");
let paladin2 = new MilitaryResource("palladin", 200, 100, 100, 100, 100, "/src/assets/img/paladin.png");
let squad1 = new Squad("yellow", [archer1, paladin2]);

const battlefield = new BattleField("url(/src/assets/img/landscape.jpg)", [squad, squad1]);
// battlefield.startBattle();
// console.log(battlefield);

