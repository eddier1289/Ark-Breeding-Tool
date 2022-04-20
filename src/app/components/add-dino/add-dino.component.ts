import {Component} from '@angular/core';
import {DinosaurService} from "../../services/dinosaur.service";

@Component({
  selector: 'app-add-dino',
  templateUrl: './add-dino.component.html',
  styleUrls: ['./add-dino.component.scss']
})
export class AddDinoComponent {
  name: string | undefined = 'Billy';
  sex: 'M' | 'F' | undefined = 'M';
  stamina: number | undefined = 38;
  oxygen: number | undefined = 40;
  food: number | undefined = 25;
  weight: number | undefined = 38;
  attack: number | undefined = 40;
  speed: number | undefined = 28;
  health: number | undefined = 41;

  constructor(private service: DinosaurService) {
  }

  submit(): void {
    console.log('submitted');

    if (this.name !== undefined &&
      this.sex !== undefined &&
      this.stamina !== undefined &&
      this.oxygen !== undefined &&
      this.food !== undefined &&
      this.weight !== undefined &&
      this.attack !== undefined &&
      this.speed !== undefined &&
      this.health !== undefined) {
      this.service.addDino({
        id: 0, sex: this.sex, name: this.name, stats: {
          stamina: this.stamina,
          oxygen: this.oxygen,
          food: this.food,
          weight: this.weight,
          attack: this.attack,
          speed: this.speed,
          health: this.health
        }
      }, "Raptors");
    }
  }
}
