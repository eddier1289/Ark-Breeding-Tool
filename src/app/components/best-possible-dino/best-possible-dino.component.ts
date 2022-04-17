import {Component} from '@angular/core';
import {DinosaurService} from "../../services/dinosaur.service";

@Component({
  selector: 'app-best-possible-dino',
  templateUrl: './best-possible-dino.component.html',
  styleUrls: ['./best-possible-dino.component.scss']
})
export class BestPossibleDinoComponent {
  constructor(public service: DinosaurService) {
  }

  totalLevel(): number {
    if (this.service.bestStats === null) {
      return 0;
    } else {
      return this.service.bestStats.speed +
        this.service.bestStats.health +
        this.service.bestStats.attack +
        this.service.bestStats.weight +
        this.service.bestStats.food +
        this.service.bestStats.oxygen +
        this.service.bestStats.stamina;
    }
  }
}
