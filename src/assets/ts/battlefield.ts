import Squad from "./squad";
import { checkInstance, getFightingInterval } from "./helpers";
import MilitaryResource from "./military-resource";

class BattleField {
    private _battlefield: Squad[] = [];
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

        const squadBlock: HTMLElement = document.createElement("section"),
            fieldScoreWrapper: HTMLElement = document.createElement("section"),
            fieldBattleBlock: HTMLDivElement = document.createElement("div"),
            scoreBoard: HTMLDivElement = document.createElement("div");

        this._battlefield.forEach(team => {
            const squadBlockWrapper: HTMLDivElement = document.createElement("div"),
                squadBlock: HTMLUListElement = document.createElement("ul");

            team.squad["squadLength"] = document.createElement("span") as HTMLSpanElement;
            team.squad["squadLength"].innerHTML = team.squad.length;

            squadBlockWrapper.classList.add("score-team-wrapper");
            squadBlock.classList.add("score-board-team");
            team.squad["squadLength"].classList.add("team-score");

            team.squad.forEach(resource => {
                const res: HTMLLIElement = document.createElement("li");
                resource["scoreTitle"] = res;
                res.classList.add("score-board-warrior");
                res.innerHTML = resource.name;
                squadBlock.appendChild(res);
            });

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
            let { attackingTeam, defendingTeam } = this.defineWhichTeamAttack(this._battlefield[0], this._battlefield[1]);
            if (attackingTeam.length === 0 || defendingTeam.length === 0) return;
            let attackingWarrior: MilitaryResource = attackingTeam[this.defineWarriorIndex(attackingTeam.length)];
            let defendingWarrior: MilitaryResource = defendingTeam[this.defineWarriorIndex(defendingTeam.length)];

            defendingWarrior.attackedBy(attackingWarrior);
            if (defendingWarrior.currentHealth <= 0) {
                defendingWarrior.resourceDom.parentNode.removeChild(defendingWarrior.resourceDom);
                defendingTeam.splice(defendingTeam.indexOf(defendingWarrior), 1);
                defendingTeam["squadLength"].innerHTML = defendingTeam.length;
                defendingWarrior["scoreTitle"].insertAdjacentHTML("beforeEnd", " -was killed");
                throw new Error(defendingWarrior.name + " was killed");
            }
            this.showResults(attackingWarrior, defendingWarrior);

        } catch (err) {
            console.log(err);
        }
    }

    startBattle(): void {
        let self = this;
        setTimeout(function cb() {
            try {
                self.attacked()
            } catch(err) {
                console.log(err.message);
            } finally {
                setTimeout(cb, getFightingInterval())
            }
        })
    }

    defineWhichTeamAttack(team1: Squad, team2: Squad) {
        let result: number = Math.floor(Math.random() * (arguments.length)) + 1;
        return result === 1 ? { attackingTeam: team1.squad, defendingTeam: team2.squad } :
            { attackingTeam: team2.squad, defendingTeam: team1.squad }
    }

    defineWarriorIndex(ind: number): number {
        return Math.floor(Math.random() * ind);
    }

    showResults(attacker, defender) {
        console.log(
            `${attacker}
        ${defender}`
        )
    }
}

export default BattleField;