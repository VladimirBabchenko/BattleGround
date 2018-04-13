import Squad from "./squad";
import { checkInstance, getFightingInterval, randomMoney } from "./helpers";
import MilitaryResource from "./military-resource";
import { squadJustice, squadEvil, findUnitSide } from "./drag-and-drop";
import { units } from "../../app";

class BattleField {
    private _battlefield: Squad[] = [];
    private attackingWarrior: MilitaryResource;
    private defendingWarrior: MilitaryResource;
    constructor(
        private landscape: string,
        private squads: Squad[]
    ) {
        this.addSquadsToBattleField(squads);
        this.addBattleField(landscape);
    }

    addSquadsToBattleField(squads: Squad[]): void {
        if (!checkInstance(Squad, squads)) return;
        this._battlefield = this._battlefield.concat(squads);
    }

    addBattleField(landscape): void {
        const wrapper: HTMLElement = document.getElementById("wrapper-military");
        wrapper.style.background = landscape;
        const moneyTeam1: HTMLDivElement = document.createElement("div");
        const moneyTeam2: HTMLDivElement = document.createElement("div");
        const btnBlock: HTMLDivElement = document.createElement("div");
        const btnFight: HTMLButtonElement = document.createElement("button");
        const btnRestart: HTMLButtonElement = document.createElement("button");
        moneyTeam1.innerHTML = "Money<br> " + randomMoney();
        moneyTeam2.innerHTML = "Money<br> " + randomMoney();
        moneyTeam1.classList.add("money-justice");
        moneyTeam2.classList.add("money-evil");
        btnFight.innerHTML = "Fight";
        btnRestart.innerHTML = "Restart";
        btnFight.classList.add("btn-fight");
        btnRestart.classList.add("btn-restart");
        btnBlock.classList.add("btn-block");
        btnBlock.appendChild(btnFight);
        btnBlock.appendChild(btnRestart);
        btnBlock.appendChild(moneyTeam1);
        btnBlock.appendChild(moneyTeam2);

        const squadBlock: HTMLElement = document.createElement("section"),
            fieldScoreWrapper: HTMLElement = document.createElement("section"),
            fieldBattleBlock: HTMLDivElement = document.createElement("div"),
            scoreBoard: HTMLDivElement = document.createElement("div");

        squadBlock.appendChild(btnBlock);
        const team1 = document.querySelectorAll(".field .warrior[data-side='justice']");
        const team2 = document.querySelectorAll(".field .warrior[data-side='justice']");
        const enemyTeams = Array.prototype.slice.call([team1, team2])
        this._battlefield.forEach(team => {
            const squadBlockWrapper: HTMLDivElement = document.createElement("div"),
                squadBlock: HTMLUListElement = document.createElement("ul");

            team.squad["squadLength"] = document.createElement("span") as HTMLSpanElement;
            team.squad["squadLength"].innerHTML = 0;

            squadBlockWrapper.classList.add("score-team-wrapper");
            squadBlock.classList.add("score-board-team");
            team.squad["squadLength"].classList.add("team-score");

            squadBlockWrapper.appendChild(team.squad["squadLength"]);
            squadBlockWrapper.appendChild(squadBlock);
            scoreBoard.appendChild(squadBlockWrapper);
        })

        for (let i = 0; i < 172 * 28; i += 172) {
            const fieldCell: HTMLDivElement = document.createElement("div");
            fieldCell.classList.add("field-cell");
            fieldBattleBlock.appendChild(fieldCell);
        }

        squadBlock.classList.add("teamlist-block");
        fieldScoreWrapper.classList.add("field-wrapper");
        fieldBattleBlock.classList.add("field");
        scoreBoard.classList.add("score-board");

        this._battlefield.forEach(squad => squadBlock.appendChild(squad.squadDom));

        wrapper.appendChild(squadBlock);
        wrapper.appendChild(fieldScoreWrapper);
        fieldScoreWrapper.appendChild(fieldBattleBlock);
        fieldScoreWrapper.appendChild(scoreBoard);
    };

    attacked(): void {
        try {
            this.attackingWarrior && this.attackingWarrior.resourceDom.classList.remove("active");
            this.defendingWarrior && this.defendingWarrior.resourceDom.classList.remove("active");
            let { attackingTeam, defendingTeam } = this.defineWhichTeamAttack(squadJustice, squadEvil);
            if (attackingTeam.length === 0 || defendingTeam.length === 0) return;
            let attackingWarriorIndex = this.defineWarriorIndex(attackingTeam.length);
            let defendingWarriorIndex = this.defineWarriorIndex(defendingTeam.length);
            this.attackingWarrior = attackingTeam[attackingWarriorIndex];
            this.defendingWarrior = defendingTeam[defendingWarriorIndex];
            this.attackingWarrior.resourceDom.classList.add("active");
            this.defendingWarrior.resourceDom.classList.add("active");



            this.defendingWarrior.attackedBy(this.attackingWarrior);
            if (this.defendingWarrior.currentHealth <= 0) {
                var fieldCell = <HTMLElement>this.defendingWarrior.resourceDom.parentNode;
                fieldCell.style.backgroundColor = "";

                this.defendingWarrior.resourceDom.parentNode.removeChild(this.defendingWarrior.resourceDom);
                defendingTeam.splice(defendingWarriorIndex, 1);

                updateScoreBoard(defendingTeam, this.defendingWarrior);
            }
            this.showResults();

        } catch (err) {
            console.log(err);
        }
    }

    startBattle(): void {
        if (!checkExistingUnitsForFight()) return;
        let self = this;
        setTimeout(function cb() {
            try {
                self.attacked()
            } catch (err) {
                console.log(err.message);
            } finally {
                setTimeout(cb, getFightingInterval())
            }
        })
    }

    defineWhichTeamAttack(team1, team2) {
        let result: number = Math.floor(Math.random() * (arguments.length)) + 1;
        return result === 1 ? { attackingTeam: team1, defendingTeam: team2 } :
            { attackingTeam: team2, defendingTeam: team1 }
    }

    defineWarriorIndex(ind: number): number {
        return Math.floor(Math.random() * ind);
    }

    showResults() {
        console.log(
            this.attackingWarrior, "\n",
            this.defendingWarrior
        )
    }
}

function checkExistingUnitsForFight() {
    var warriorJustice = document.querySelector(".field .warrior[data-side='justice']");
    var warriorEvil = document.querySelector(".field .warrior[data-side='evil']");
    return warriorJustice && warriorEvil;
}

function updateScoreBoard(defendingTeam, defendingWarrior) {
    var unitName = defendingWarrior.name;
    var unitSide = defendingWarrior.side === "justice" ? 0 : 1;

    document.querySelectorAll(".team-score")[unitSide].innerHTML = defendingTeam.length;
    var defendingTeamInScoreTable = document.querySelectorAll(".score-board-team")[unitSide];
    var defendingWarriorsInTable = Array.prototype.slice.call(defendingTeamInScoreTable.querySelectorAll(".score-board-warrior"));
    var warriorNodeInTable = defendingWarriorsInTable.find(warriorInTable => warriorInTable.innerHTML === unitName);
    warriorNodeInTable.insertAdjacentHTML("beforeEnd", " -was killed");
}

export default BattleField;
