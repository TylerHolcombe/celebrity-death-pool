import { Component, OnInit } from '@angular/core';

import { Entry } from '../../player';
import { PlayerService } from '../../player.service';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {
  entries: Entry[];

  constructor(private playerService: PlayerService) { }

  ngOnInit(): void {
    this.getEntries();
  }

  getEntries(): void {
    this.playerService.getApprovedEntries().subscribe(entries => this.entries = entries);
  }
}
