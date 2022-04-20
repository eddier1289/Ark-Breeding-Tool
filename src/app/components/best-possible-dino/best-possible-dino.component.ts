import {Component, Input} from '@angular/core';
import {DinosaurService} from "../../services/dinosaur.service";
import {TamedDinosaurGroup, TamedDinosaurViewModel} from "../../services/dinosaur.model";

@Component({
  selector: 'app-best-possible-dino',
  templateUrl: './best-possible-dino.component.html',
  styleUrls: ['./best-possible-dino.component.scss']
})
export class BestPossibleDinoComponent {
  @Input()
  dinoGroup: TamedDinosaurGroup | null = null;

  constructor() {
  }

  totalLevel(): number | undefined {
    if (this.dinoGroup === null || this.dinoGroup.bestStats === null) {
      return undefined;
    } else {
      return this.dinoGroup.bestStats.speed +
        this.dinoGroup.bestStats.health +
        this.dinoGroup.bestStats.attack +
        this.dinoGroup.bestStats.weight +
        this.dinoGroup.bestStats.food +
        this.dinoGroup.bestStats.oxygen +
        this.dinoGroup.bestStats.stamina;
    }
  }
}
