import {Component, OnInit} from '@angular/core';
import {DinosaurService} from "../../services/dinosaur.service";
import {TamedDinosaurGroup} from "../../services/dinosaur.model";

@Component({
  selector: 'app-dino-groups',
  templateUrl: './dino-groups.component.html',
  styleUrls: ['./dino-groups.component.scss']
})
export class DinoGroupsComponent implements OnInit {
  dinoGroups: TamedDinosaurGroup[] = [];

  constructor(private service: DinosaurService) {
  }

  ngOnInit(): void {
    this.dinoGroups = this.service.dinoGroups;
  }

}
