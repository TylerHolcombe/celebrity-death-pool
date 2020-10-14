import { Component, Input, OnInit } from '@angular/core';

import { Player } from '../../player';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  @Input() players: Player[];
  @Input() showApproved?: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
