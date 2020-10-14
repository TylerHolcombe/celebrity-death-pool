import { Component, OnInit } from '@angular/core';

import { Player } from '../../player';
import { PlayerService } from '../../player.service';

@Component({
  selector: 'app-pending',
  templateUrl: './pending.component.html',
  styleUrls: ['./pending.component.css']
})
export class PendingComponent implements OnInit {
  players: Player[];

  constructor(private playerService: PlayerService) { }

  ngOnInit(): void {
    this.players = this.playerService.getPendingPlayers();
  }
}
