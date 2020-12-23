import { AfterViewInit, Component, ViewChild } from '@angular/core';

import { Entry } from '../../player';
import { TableComponent } from '../../main/table/table.component';
import { PlayerService } from '../../player.service';

@Component({
  selector: 'app-pending',
  templateUrl: './pending.component.html',
  styleUrls: ['./pending.component.css']
})
export class PendingComponent implements AfterViewInit {
  @ViewChild("pendingTable")
  private tableComponent: TableComponent;

  entries: Entry[];

  constructor(private playerService: PlayerService) {
  }

  ngAfterViewInit(): void {
    this.getPendingEntries();
  }

  getPendingEntries(): void {
    this.playerService.getPendingEntries().subscribe(entries => this.entries = entries);
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
      this.getPendingEntries();
    });
  }
}
