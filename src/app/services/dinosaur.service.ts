import {DinosaurStats, TamedDinosaur, TamedDinosaurViewModel} from "./dinosaur.model";
import {Injectable} from "@angular/core";

@Injectable()
export class DinosaurService {
  private _dinos: TamedDinosaurViewModel[] = [];
  bestStats: DinosaurStats | null = null;

  get dinos(): TamedDinosaurViewModel[] {
    return this._dinos;
  }

  set dinos(value: TamedDinosaur[]) {
    this.calculateBestDinoStats(value);

    this._dinos = value.map(d => ({...d, maxStats: this.getMaxStats(d, this.bestStats)}));
  }

  getMaxStats(dino: TamedDinosaur, maxStats: DinosaurStats | null): (keyof DinosaurStats)[] {
    if (maxStats === null) {
      return [];
    } else {
      return (Object.keys(maxStats) as Array<keyof DinosaurStats>).filter(s => dino.stats[s] === maxStats[s]);
    }
  }

  calculateBestDinoStats(dinos: TamedDinosaur[]): void {
    this.bestStats = {
      health: dinos.map(d => d.stats.health).reduce((p, c) => c > p ? c : p, 0),
      oxygen: dinos.map(d => d.stats.oxygen).reduce((p, c) => c > p ? c : p, 0),
      food: dinos.map(d => d.stats.food).reduce((p, c) => c > p ? c : p, 0),
      speed: dinos.map(d => d.stats.speed).reduce((p, c) => c > p ? c : p, 0),
      stamina: dinos.map(d => d.stats.stamina).reduce((p, c) => c > p ? c : p, 0),
      weight: dinos.map(d => d.stats.weight).reduce((p, c) => c > p ? c : p, 0),
      attack: dinos.map(d => d.stats.attack).reduce((p, c) => c > p ? c : p, 0),
    };
  }
}
