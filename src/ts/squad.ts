import MilitaryResource from "./military-resource";
import { checkInstance, checkExistingIndex } from "./helpers";

class Squad {
    private _squad: MilitaryResource[] = [];
    private _squadBlock: HTMLDivElement;
    constructor(
        private teamColor: string,
        private militaryResources: MilitaryResource[],
    ) {
        this.addToSquad(militaryResources);
        this.addDom(teamColor);
    }

    addToSquad(militaryResources: MilitaryResource[]): void {
        try {
            if (!militaryResources && !checkInstance(MilitaryResource, militaryResources)) throw "You can't combine this resources";
            this._squad = this._squad.concat(militaryResources)
        } catch (err) {
            console.log(err);
        }
    }

    isReadyToMove(dist: number, ind?: number): boolean {
        return checkExistingIndex(this._squad, ind) ? this._squad[ind].isReadyToCross(dist) :
            this._squad.every(resource => resource.isReadyToCross(dist));
    }

    isReadyToFight(damage: number, ind?: number): boolean {
        return checkExistingIndex(this._squad, ind) ? this._squad[ind].isReadyToFight(damage) :
            this._squad.every(resource => resource.isReadyToFight(damage));
    }

    restore(): void {
        this._squad.forEach(resource => resource.restoreFull());
    }

    getResourcesReadyToMove(dist: number): MilitaryResource[] {
        return this._squad.filter(resource => resource.isReadyToCross(dist));
    }

    getResourcesReadyToBattle(damage: number): MilitaryResource[] {
        return this._squad.filter(resource => resource.isReadyToFight(damage));
    }

    replaceSquadResources(ind1: number, ind2: number): void {
        try {
            if (!checkExistingIndex(this._squad, ind1, ind2)) throw "Number of this units doesn't exist";
            let unit1: MilitaryResource = this._squad[ind1],
                unit2: MilitaryResource = this._squad[ind2];
            this._squad[ind1] = unit2;
            this._squad[ind2] = unit1;

        } catch (err) {
            console.log(err);
        }
    }

    clone(): MilitaryResource[] {
        const newSquadPrototype = Object.create(Squad.prototype);
        return Object.assign(newSquadPrototype, this);
    }

    addDom(teamColor): void {
        this._squadBlock = document.createElement("div");
        this._squadBlock.classList.add("team-block");
        this._squadBlock.style.backgroundColor = teamColor;
        

        this._squad.forEach(resource => this._squadBlock.appendChild(resource.resourceDom));
    }

    get squad() {
        return this._squad;
    }

    get squadDom() {
        return this._squadBlock;
    }
}

export default Squad;