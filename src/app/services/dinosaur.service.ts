import {
  BreedingGroup,
  DinosaurStats,
  TamedDinosaur,
  TamedDinosaurGroup,
  TamedDinosaurViewModel
} from "./dinosaur.model";
import {Injectable} from "@angular/core";

interface GoodMaleStats {
  id: number;
  maxStats: (keyof DinosaurStats)[];
}

interface PotentialBreedingPair {
  maleId: number;
  femaleId: number;
  maxStats: (keyof DinosaurStats)[];
}

@Injectable()
export class DinosaurService {
  private _dinoGroups: TamedDinosaurGroup[] = [];

  constructor() {
    this._dinoGroups = JSON.parse(localStorage.getItem('dinoGroups') ?? '[]');
  }

  get dinoGroups(): TamedDinosaurGroup[] {
    return this._dinoGroups;
  }

  private createDinoViewModel(dino: TamedDinosaur, bestStats: DinosaurStats | null): TamedDinosaurViewModel {
    return ({...dino, maxStats: this.getMaxStats(dino, bestStats)});
  }

  private getNextDinoId(): number {
    return this._dinoGroups
      .reduce((maxId, currentGroup) => {
        const maxDinoId = currentGroup.dinosaurs.reduce((maxId, currentDino) =>
          maxId > currentDino.id ? maxId : currentDino.id, 0);

        return maxId > maxDinoId ? maxId : maxDinoId;
      }, 0) + 1;
  }

  public addDino(dino: TamedDinosaur, dinoGroup: string) {
    console.log('adding dino');
    console.log(dino);

    dino.id = this.getNextDinoId();

    let group = this._dinoGroups.find(value => value.groupName === dinoGroup);

    if (group === undefined) {
      group = {groupName: dinoGroup, dinosaurs: [], breedingGroups: [], bestStats: null} as TamedDinosaurGroup;
      this._dinoGroups.push(group);
    }

    group.bestStats = this.calculateBestDinoStats([...group.dinosaurs, dino]);

    group.dinosaurs.push(this.createDinoViewModel(dino, group.bestStats));

    const bestStats = group.bestStats;

    group.dinosaurs.forEach(d => d.maxStats = this.getMaxStats(d, bestStats));

    group.breedingGroups = this.getBreedingGroups(group.dinosaurs);

    localStorage.setItem('dinoGroups', JSON.stringify(this._dinoGroups));
  }

  public deleteDino(dinoId: number) {
    for (let dinoGroup of this._dinoGroups) {
      dinoGroup.dinosaurs = dinoGroup.dinosaurs.filter(d => d.id !== dinoId);
    }

    localStorage.setItem('dinoGroups', JSON.stringify(this._dinoGroups));
  }

  getMaxStats(dino: TamedDinosaur, maxStats: DinosaurStats | null): (keyof DinosaurStats)[] {
    if (maxStats === null) {
      return [];
    } else {
      return (Object.keys(maxStats) as Array<keyof DinosaurStats>).filter(s => dino.stats[s] === maxStats[s]);
    }
  }

  private calculateBestDinoStats(dinos: TamedDinosaur[]): DinosaurStats {
    return {
      health: dinos.map(d => d.stats.health).reduce((p, c) => c > p ? c : p, 0),
      oxygen: dinos.map(d => d.stats.oxygen).reduce((p, c) => c > p ? c : p, 0),
      food: dinos.map(d => d.stats.food).reduce((p, c) => c > p ? c : p, 0),
      speed: dinos.map(d => d.stats.speed).reduce((p, c) => c > p ? c : p, 0),
      stamina: dinos.map(d => d.stats.stamina).reduce((p, c) => c > p ? c : p, 0),
      weight: dinos.map(d => d.stats.weight).reduce((p, c) => c > p ? c : p, 0),
      attack: dinos.map(d => d.stats.attack).reduce((p, c) => c > p ? c : p, 0),
    };
  }

  private areMaxStatsCoveredByExistingMales(currentMale: TamedDinosaurViewModel, goodMales: GoodMaleStats[]): boolean {
    // filter good males to only ones that cover all max stats of current male.
    return goodMales.filter(gm => this.containsAllMaxStats(gm.maxStats, currentMale.maxStats)).length > 0;
  }

  private containsAllMaxStats(goodMaleStats: (keyof DinosaurStats)[], currentMaxStats: (keyof DinosaurStats)[]): boolean {
    // filter to just the currentMaxStats that aren't in the goodMaleStats.
    return currentMaxStats.filter(cms => goodMaleStats.filter(gms => gms === cms).length === 0).length === 0;
  }

  getGoodDinos(dinos: TamedDinosaurViewModel[]): TamedDinosaurViewModel[] {
    const sortedDinos = dinos
      .sort((a, b) => b.maxStats.length - a.maxStats.length);

    const goodDinoIds = sortedDinos
      .reduce((goodDinoStats: GoodMaleStats[], currentDino) => {
        if (goodDinoStats.length === 0) {
          goodDinoStats.push({id: currentDino.id, maxStats: currentDino.maxStats});
        } else if (!this.areMaxStatsCoveredByExistingMales(currentDino, goodDinoStats)) {
          goodDinoStats.push({id: currentDino.id, maxStats: currentDino.maxStats});
        }

        return goodDinoStats;
      }, []).map(m => m.id);

    return dinos.filter(d => goodDinoIds.filter(gm => gm === d.id).length > 0);
  }

  getPotentialBreedingPairs(dinos: TamedDinosaurViewModel[]): PotentialBreedingPair[] {
    const goodMales = this.getGoodDinos(dinos.filter(d => d.sex === 'M'));

    let females = this.getGoodDinos(dinos.filter(d => d.sex === 'F'));

    return females.reduce((potentialPairs: PotentialBreedingPair[], currentFemale) => {
      const tmpPairs: PotentialBreedingPair[] = [];

      for (let goodMale of goodMales) {
        tmpPairs.push({
          maleId: goodMale.id,
          femaleId: currentFemale.id,
          maxStats: this.combineMaxStats(currentFemale.maxStats, goodMale.maxStats)
        });
      }

      const breedingPair = tmpPairs.sort((a, b) => b.maxStats.length - a.maxStats.length)[0];

      potentialPairs.push(breedingPair);

      return potentialPairs;
    }, []);

  }

  getBreedingGroups(dinos: TamedDinosaurViewModel[]): BreedingGroup[] {
    const goodMales = this.getGoodDinos(dinos.filter(d => d.sex === 'M'));
    const potentialBreedingPairs = this.getPotentialBreedingPairs(dinos);

    const results = potentialBreedingPairs.reduce((groups: BreedingGroup[], currentPair) => {
      let group = groups.find(g => g.male.id === currentPair.maleId);

      if (group === undefined) {
        group = {male: this.getDinoById(currentPair.maleId, dinos), females: []};

        groups.push(group);
      }

      let female = this.getDinoById(currentPair.femaleId, dinos);

      group.females.push({female: female, maxDescendant: this.calculateBestDinoStats([female, group.male])});

      return groups;
    }, []);

    return results;
  }

  getDinoById(id: number, dinos: TamedDinosaurViewModel[]): TamedDinosaurViewModel {
    return dinos.find(v => v.id === id) ?? {} as TamedDinosaurViewModel;
  }

  combineMaxStats(female: (keyof DinosaurStats)[], male: (keyof DinosaurStats)[]): (keyof DinosaurStats)[] {
    const maleStats = [...male];

    for (let ms of female) {
      maleStats.push(ms);
    }

    return maleStats.filter((value, index) => maleStats.indexOf(value) === index);
  }
}
