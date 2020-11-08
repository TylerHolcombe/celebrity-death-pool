import { Component, OnInit } from '@angular/core';

import { Celebrity } from '../../player';
import { PlayerService } from '../../player.service';

@Component({
  selector: 'app-celebs',
  templateUrl: './celebs.component.html',
  styleUrls: ['./celebs.component.css']
})
export class CelebsComponent implements OnInit {
  celebs: Celebrity[];

  constructor(private playerService: PlayerService) { }

  ngOnInit(): void {
    this.getCelebs();
  }

  getCelebs(): void {
    this.playerService.getCelebrities().subscribe(celebs => this.celebs = celebs);
  }
}
