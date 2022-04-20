export interface DinosaurStats {
  stamina: number;
  oxygen: number;
  food: number;
  weight: number;
  attack: number;
  speed: number;
  health: number;
}

export interface WildDinosaur {
  sex: 'M' | 'F';
  stats: DinosaurStats;
}

export interface TamedDinosaur extends WildDinosaur {
  id: number;
  name: string;
}

export interface TamedDinosaurViewModel extends TamedDinosaur {
  maxStats: (keyof DinosaurStats)[];
}

export interface BreedingPair {
  female: TamedDinosaur;
  maxDescendant: DinosaurStats;
}

export interface BreedingGroup {
  male: TamedDinosaur;
  females: BreedingPair[];
}

export interface TamedDinosaurGroup {
  groupName: string;
  bestStats: DinosaurStats | null;
  breedingGroups: BreedingGroup[];
  dinosaurs: TamedDinosaurViewModel[];
}
