import {Component, OnInit} from '@angular/core';
import {DinosaurService} from "../../services/dinosaur.service";
import {TamedDinosaur} from "../../services/dinosaur.model";

@Component({
  selector: 'app-dino-breeding',
  templateUrl: './dino-breeding.component.html',
  styleUrls: ['./dino-breeding.component.scss']
})
export class DinoBreedingComponent {
  constructor(public service: DinosaurService) {
  }

  deleteDino($event: number) {
    this.service.deleteDino($event);
  }
}
