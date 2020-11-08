import { Component, OnInit } from '@angular/core';

import { Entry } from '../player';
import { PlayerService } from '../player.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  entries: Entry[];

  constructor(private playerService: PlayerService) { }

  ngOnInit(): void {
    this.getEntries();
  }

  getEntries(): void {
    this.playerService.getApprovedEntries().subscribe(entries => this.entries = entries);
  }

}
