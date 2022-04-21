import {Component, Input, OnInit} from '@angular/core';
import {DinosaurStats} from "../../services/dinosaur.model";

@Component({
  selector: 'app-wild-dino-stats',
  templateUrl: './wild-dino-stats.component.html',
  styleUrls: ['./wild-dino-stats.component.scss']
})
export class WildDinoStatsComponent {
  @Input()
  stats: DinosaurStats | null = null;

  @Input()
  maxStats: (keyof DinosaurStats)[] = [];

  totalLevel(): number {
    if (this.stats === null) {
      return 0;
    } else {
      return this.stats?.speed +
        this.stats?.health +
        this.stats?.attack +
        this.stats?.weight +
        this.stats?.food +
        this.stats?.oxygen +
        this.stats?.stamina;
    }
  }

  containsMaxStat(stat: keyof DinosaurStats): boolean {
    return this.stats === null ?
      false :
      this.maxStats?.filter(s => s === stat).length > 0;
  }
}
