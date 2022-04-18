import {BreedingGroup, DinosaurStats, TamedDinosaur, TamedDinosaurViewModel} from "./dinosaur.model";
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
  private _dinos: TamedDinosaurViewModel[] = [];
  bestStats: DinosaurStats | null = null;
  breedingGroups: BreedingGroup[] = [];

  get dinos(): TamedDinosaurViewModel[] {
    return this._dinos.sort((a, b) => a.sex.localeCompare(b.sex));
  }

  set dinos(value: TamedDinosaur[]) {
    this.bestStats = this.calculateBestDinoStats(value);

    this._dinos = value.map(d => ({...d, maxStats: this.getMaxStats(d, this.bestStats)}));

    this.breedingGroups = this.getBreedingGroups();
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

    return this._dinos.filter(d => goodDinoIds.filter(gm => gm === d.id).length > 0);
  }

  getPotentialBreedingPairs(): PotentialBreedingPair[] {
    const goodMales = this.getGoodDinos(this._dinos.filter(d => d.sex === 'M'));

    let females = this.getGoodDinos(this._dinos.filter(d => d.sex === 'F'));

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

  getBreedingGroups(): BreedingGroup[] {
    const goodMales = this.getGoodDinos(this._dinos.filter(d => d.sex === 'M'));
    const potentialBreedingPairs = this.getPotentialBreedingPairs();

    const results = potentialBreedingPairs.reduce((groups: BreedingGroup[], currentPair) => {
      let group = groups.find(g => g.male.id === currentPair.maleId);

      if (group === undefined) {
        group = {male: this.getDinoById(currentPair.maleId), females: []};

        groups.push(group);
      }

      let female = this.getDinoById(currentPair.femaleId);

      group.females.push({female: female, maxDescendant: this.calculateBestDinoStats([female, group.male])});

      return groups;
    }, []);

    console.log(results);

    return results;
  }

  getDinoById(id: number): TamedDinosaurViewModel {
    return this._dinos.find(v => v.id === id) ?? {} as TamedDinosaurViewModel;
  }

  combineMaxStats(female: (keyof DinosaurStats)[], male: (keyof DinosaurStats)[]): (keyof DinosaurStats)[] {
    const maleStats = [...male];

    for (let ms of female) {
      maleStats.push(ms);
    }

    return maleStats.filter((value, index) => maleStats.indexOf(value) === index);
  }
}
