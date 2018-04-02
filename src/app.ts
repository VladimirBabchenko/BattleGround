import "./assets/scss/styles.scss";
import MilitaryResource from "./assets/ts/military-resource";
import Squad from "./assets/ts/squad";
import BattleField from "./assets/ts/battlefield";

console.log(MilitaryResource)

let archer = new MilitaryResource("archer", 100, 1000, 1000, 1000, 1000, "/src/assets/img/paladin.png");
let paladin = new MilitaryResource("palladin", 100, 1000, 1000, 1000, 1000, "/src/assets/img/paladin.png");

let squad = new Squad("blue", [archer, paladin]);
document.body.appendChild(squad.squadDom);
console.log(squad);

let archer1 = new MilitaryResource("archer", 100, 1000, 1000, 1000, 1000, "/src/assets/img/paladin.png");
let paladin2 = new MilitaryResource("palladin", 100, 1000, 1000, 1000, 1000, "/src/assets/img/paladin.png");
let squad1 = new Squad("yellow", [archer1, paladin2]);

const battlefield = new BattleField("url(/src/assets/img/landscape.jpg)", [squad, squad1]);
let result = battlefield.startBattle.bind(battlefield);
document.querySelector(".btn-fight").addEventListener("click", battlefield.startBattle.bind(battlefield));
// document.querySelector(".btn-restart").addEventListener("click", function() {
//     document.querySelector(".btn-fight").removeEventListener("click", result, false);
    // location.reload();
    // battlefield.startBattle.bind(battlefield);
    // result();
// })


