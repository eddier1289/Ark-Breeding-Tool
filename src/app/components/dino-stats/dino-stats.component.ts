import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DinosaurStats, TamedDinosaurViewModel} from "../../services/dinosaur.model";

@Component({
  selector: 'app-dino-stats',
  templateUrl: './dino-stats.component.html',
  styleUrls: ['./dino-stats.component.scss']
})
export class DinoStatsComponent implements OnInit {
  @Input()
  dino: TamedDinosaurViewModel | null = null;

  @Output()
  deleteDino: EventEmitter<number> = new EventEmitter<number>();

  constructor() {
  }

  ngOnInit(): void {
  }

  totalLevel(): number {
    if (this.dino === null) {
      return 0;
    } else {
      return this.dino?.stats.speed +
        this.dino?.stats.health +
        this.dino?.stats.attack +
        this.dino?.stats.weight +
        this.dino?.stats.food +
        this.dino?.stats.oxygen +
        this.dino?.stats.stamina;
    }
  }

  containsMaxStat(stat: keyof DinosaurStats): boolean {
    return this.dino === null ?
      false :
      this.dino?.maxStats.filter(s => s === stat).length > 0;
  }

  removeDino(id: number | undefined) {
    if (id !== undefined) {
      this.deleteDino.emit(id);
    }
  }
}
