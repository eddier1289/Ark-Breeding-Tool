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
    name: string;
}

export interface TamedDinosaurViewModel extends TamedDinosaur {
  maxStats: (keyof DinosaurStats)[];
}
