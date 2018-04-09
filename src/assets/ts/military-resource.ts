import { checkArgsForNumber, checkInstance } from "./helpers";

enum side {
    justice = "justice",
    evil = "evil"
}

class MilitaryResource {
    private _resourceBlock: HTMLDivElement
    constructor(
        public name: string,
        public damage: number,
        public currentHealth: number,
        public maxHealth: number,
        public availableDist: number,
        public maxDist: number,
        public price: number,
        public side: side,
        private url: string,
    ) {
        this.addDom(this.url);
    }

    isReadyToCross(dist: number): boolean {
        try {
            if (!checkArgsForNumber(dist)) throw "Enter a valid distanation. It should be a number";
            return this.availableDist - dist >= 0;
        } catch (err) {
            console.log(err);
        }
    };

    isReadyToFight(damage: number): boolean {
        try {
            if (!checkArgsForNumber(damage)) throw "Enter a valid damage. It should be a number";
            return this.currentHealth - damage > 0
        } catch (err) {
            console.log(err);
        }
    };

    restoreFull(): void {
        this.currentHealth = this.maxHealth;
        this.availableDist = this.maxDist;
    };

    clone(): MilitaryResource {
        try {
            if (!checkInstance(this, MilitaryResource)) throw "You cannot copy this. It should be any of Military Resources";
            let clonedResource: number = Object.create(MilitaryResource.prototype);
            return Object.assign(clonedResource, this);
        } catch (err) {
            console.log(err);
        }
    };

    attackedBy(resource: MilitaryResource): number {
        return this.currentHealth -= resource.damage;
    }

    private addDom(url) {
        this._resourceBlock = document.createElement("div");
        const resourceTitle: HTMLHeadingElement = document.createElement("h2"),
            resourcePrice: HTMLDivElement = document.createElement("div"),
            resourceImg: HTMLImageElement = document.createElement("img");

        this._resourceBlock.classList.add("warrior");
        this._resourceBlock.draggable = true;
        this._resourceBlock.dataset.side = this.side.toString();
        this._resourceBlock.classList.add("draggable");
        resourceImg.src = url;

        resourceTitle.innerHTML = this.name;
        resourcePrice.classList.add("price");
        resourcePrice.innerHTML = `Price: ${this.price.toString()}`;

        this._resourceBlock.appendChild(resourceTitle);
        this._resourceBlock.appendChild(resourcePrice);
        this._resourceBlock.appendChild(resourceImg);
    }

    get resourceDom() {
        return this._resourceBlock;
    }

    set setResourceDom(val) {
        this._resourceBlock = val
    }
}

export default MilitaryResource;
export {side};
