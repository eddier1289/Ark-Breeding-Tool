import {Component, OnInit} from '@angular/core';
import {DinosaurService} from "../../services/dinosaur.service";

@Component({
  selector: 'app-dino-breeding',
  templateUrl: './dino-breeding.component.html',
  styleUrls: ['./dino-breeding.component.scss']
})
export class DinoBreedingComponent implements OnInit {
  constructor(public service: DinosaurService) {
  }

  ngOnInit(): void {
    this.service.dinos = [
      {
        name: 'Bobby',
        stats: {
          stamina: 31,
          oxygen: 35,
          food: 26,
          weight: 42,
          attack: 38,
          speed: 26,
          health: 31
        },
        sex: 'M'
      },
      {
        name: 'Barb',
        stats: {
          stamina: 36,
          oxygen: 28,
          food: 28,
          weight: 28,
          attack: 41,
          speed: 19,
          health: 36
        },
        sex: 'F'
      },
      {
        name: 'Betsy',
        stats: {
          stamina: 32,
          oxygen: 36,
          food: 29,
          weight: 18,
          attack: 50,
          speed: 20,
          health: 36
        },
        sex: 'F'
      }
    ];
  }
}
