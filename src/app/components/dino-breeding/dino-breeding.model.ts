export interface WildDinosaur {
    sex: 'M' | 'F';
    stamina: number;
    oxygen: number;
    food: number;
    weight: number;
    attack: number;
    speed: number;
    health: number;
}

export interface TamedDinosaur extends WildDinosaur {
    name: string;
}