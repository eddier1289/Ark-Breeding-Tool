import {Component} from '@angular/core';
import {DinosaurService} from "../../services/dinosaur.service";
import {FormControl, FormGroup} from "@angular/forms";
import {TamedDinosaur} from "../../services/dinosaur.model";

@Component({
  selector: 'app-add-dino',
  templateUrl: './add-dino.component.html',
  styleUrls: ['./add-dino.component.scss']
})
export class AddDinoComponent {
  dinoForm = new FormGroup({
    name: new FormControl(''),
    sex: new FormControl(''),
    stamina: new FormControl(''),
    oxygen: new FormControl(''),
    food: new FormControl(''),
    weight: new FormControl(''),
    attack: new FormControl(''),
    speed: new FormControl(''),
    health: new FormControl('')
  });

  constructor(private service: DinosaurService) {
  }

  submit(): void {
    console.log(this.dinoForm.value);
    this.service.addDino({
      id: 1, name: this.dinoForm.value.name, sex: this.dinoForm.value.sex === 'F' ? 'F' : 'M', stats: {
        stamina: this.dinoForm.value.stamina,
        oxygen: this.dinoForm.value.oxygen,
        food: this.dinoForm.value.food,
        weight: this.dinoForm.value.weight,
        attack: this.dinoForm.value.attack,
        speed: this.dinoForm.value.speed,
        health: this.dinoForm.value.health,
      }
    } as TamedDinosaur, "Raptors");

    this.dinoForm.reset();
  }
}
