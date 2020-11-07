import { Component, OnInit } from '@angular/core';

import { Entry } from '../../player';
import { PlayerService } from '../../player.service';

@Component({
  selector: 'app-pending',
  templateUrl: './pending.component.html',
  styleUrls: ['./pending.component.css']
})
export class PendingComponent implements OnInit {
  entries: Entry[];

  constructor(private playerService: PlayerService) { }

  ngOnInit(): void {
    this.getPendingEntries();
  }

  getPendingEntries(): void {
    this.playerService.getPendingEntries().subscribe(entries => this.entries = entries);
  }
}
