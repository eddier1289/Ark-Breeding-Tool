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
        id: 1,
        name: 'Bobby',
        stats: {
          stamina: 36,
          oxygen: 41,
          food: 29,
          weight: 42,
          attack: 50,
          speed: 26,
          health: 41
        },
        sex: 'M'
      },
      {
        id: 2,
        name: 'Barb',
        stats: {
          stamina: 36,
          oxygen: 28,
          food: 28,
          weight: 28,
          attack: 41,
          speed: 19,
          health: 45
        },
        sex: 'F'
      },
      {
        id: 3,
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
      },
      {
        id: 4,
        name: 'Baxter',
        stats: {
          stamina: 31,
          oxygen: 35,
          food: 29,
          weight: 42,
          attack: 38,
          speed: 20,
          health: 31
        },
        sex: 'M'
      },
      {
        id: 5,
        name: 'Billy',
        stats: {
          stamina: 31,
          oxygen: 35,
          food: 26,
          weight: 40,
          attack: 38,
          speed: 24,
          health: 31
        },
        sex: 'M'
      },
      {
        id: 8,
        name: 'Bonnie',
        stats: {
          stamina: 36,
          oxygen: 41,
          food: 29,
          weight: 42,
          attack: 50,
          speed: 26,
          health: 41
        },
        sex: 'F'
      },
      {
        id: 10,
        name: 'Bertha',
        stats: {
          stamina: 36,
          oxygen: 41,
          food: 29,
          weight: 42,
          attack: 50,
          speed: 26,
          health: 41
        },
        sex: 'F'
      },
      {
        id: 11,
        name: 'Beth',
        stats: {
          stamina: 32,
          oxygen: 36,
          food: 27,
          weight: 40,
          attack: 50,
          speed: 24,
          health: 34
        },
        sex: 'F'
      },
      {
        id: 9,
        name: 'Bart',
        stats: {
          stamina: 32,
          oxygen: 36,
          food: 27,
          weight: 36,
          attack: 40,
          speed: 24,
          health: 41
        },
        sex: 'M'
      },
      {
        id: 6,
        name: 'Barney',
        stats: {
          stamina: 31,
          oxygen: 41,
          food: 26,
          weight: 38,
          attack: 38,
          speed: 24,
          health: 31
        },
        sex: 'M'
      }
    ];
  }

  deleteDino($event: number) {
    this.service.deleteDino($event);
  }
}
