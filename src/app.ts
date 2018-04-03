import "./assets/scss/styles.scss";
import MilitaryResource from "./assets/ts/military-resource";
import Squad from "./assets/ts/squad";
import BattleField from "./assets/ts/battlefield";

const archer = new MilitaryResource("archer", 200, 650, 450, 600, 600, "/src/assets/img/archer.png");
const palladin = new MilitaryResource("palladin", 230, 1500, 1500, 1000, 1000, "/src/assets/img/paladin.png");
const knight = new MilitaryResource("knight", 250, 1250, 850, 500, 500, "/src/assets/img/knight.png"); 
const assasin = new MilitaryResource("assasin", 400, 650, 650, 500, 500, "/src/assets/img/assasin.png");
const lich = new MilitaryResource("lich", 300, 660, 660, 500, 500, "/src/assets/img/lich.png");
const vampire = new MilitaryResource("vampire", 250, 1000, 1000, 1000, 1000, "/src/assets/img/vampire.png"); 

const squad = new Squad("aqua", [archer, palladin, knight]);
const squad1 = new Squad("yellow", [assasin, lich, vampire]);
document.body.appendChild(squad.squadDom);

const battlefield = new BattleField("url(/src/assets/img/landscape.jpg)", [squad, squad1]);
let result = battlefield.startBattle.bind(battlefield);
document.querySelector(".btn-fight").addEventListener("click", battlefield.startBattle.bind(battlefield));

document.querySelector(".btn-restart").addEventListener("click", function() {
    location.reload();
})


