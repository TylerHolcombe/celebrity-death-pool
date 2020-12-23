import { Component, Input, OnInit } from '@angular/core';

import { Entry } from '../../player';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  @Input() entries: Entry[];
  @Input() showApproved?: boolean;
  updatedEntries: boolean[];

  constructor() { }

  ngOnInit(): void {
  }

  updateEntry(index: number): void {
    this.entries[index].approved = !this.entries[index].approved;
    if (!this.updatedEntries) {
      this.updatedEntries = new Array(this.entries.length).fill(false);
    }
    this.updatedEntries[index] = true;
  }
}
