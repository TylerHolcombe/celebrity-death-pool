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
  updatedCelebs: boolean[];

  constructor(private playerService: PlayerService) { }

  ngOnInit(): void {
    this.getCelebs();
  }

  getCelebs(): void {
    this.playerService.getCelebrities().subscribe(celebs => {
      this.celebs = celebs;
      this.updatedCelebs = new Array(this.celebs.length).fill(false);
    });
  }

  updateCeleb(index: number): void {
    this.celebs[index].dead = !this.celebs[index].dead
    this.updatedCelebs[index] = true;
  }

  saveCelebs(): void {
    let saveCelebs: Celebrity[] = [];
    for (let index in this.updatedCelebs) {
      if (this.updatedCelebs[index]) {
        saveCelebs.push(this.celebs[index]);
      }
    }

    this.playerService.saveCelebs(saveCelebs).subscribe(status => {
      // TODO: show error or success message based on response.
      this.updatedCelebs.fill(false);
    });
  }
}
