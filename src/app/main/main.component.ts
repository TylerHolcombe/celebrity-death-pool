import { Component, OnInit } from '@angular/core';

import { Celebrity, Player } from '../player';
import { PlayerService } from '../player.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  players: Player[];

  constructor(private playerService: PlayerService) { }

  ngOnInit(): void {
    this.players = this.playerService.getAllPlayers();
  }

}
