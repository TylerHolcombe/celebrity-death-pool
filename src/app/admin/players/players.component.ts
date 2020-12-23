import { AfterViewInit, Component, ViewChild } from '@angular/core';

import { Entry } from '../../player';
import { TableComponent } from '../../main/table/table.component';
import { PlayerService } from '../../player.service';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements AfterViewInit {
  @ViewChild("acceptedTable")
  private tableComponent: TableComponent;

  entries: Entry[];

  constructor(private playerService: PlayerService) { }

  ngAfterViewInit(): void {
    this.getEntries();
  }

  getEntries(): void {
    this.playerService.getApprovedEntries().subscribe(entries => this.entries = entries);
  }

  saveEntries(): void {
    let saveEntries: Entry[] = [];
    for (let index in this.tableComponent.updatedEntries) {
      if (this.tableComponent.updatedEntries[index]) {
        saveEntries.push(this.tableComponent.entries[index]);
      }
    }

    this.playerService.saveEntries(saveEntries).subscribe(status => {
      this.tableComponent.updatedEntries.fill(false);
      this.getEntries();
    });
  }
}
