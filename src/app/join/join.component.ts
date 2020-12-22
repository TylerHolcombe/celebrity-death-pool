import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { PlayerService } from '../player.service';

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.css']
})
export class JoinComponent implements OnInit {
  errorMessage?: string;
  hasError: boolean = false;

  constructor(private playerService: PlayerService, private router: Router) { }

  ngOnInit(): void {
  }

  private clearErrors() {
    this.errorMessage = null;
    this.hasError = false;
  }

  onSubmit(): void {
    this.clearErrors();
    this.playerService.submitPlayer(this.firstname.value, this.lastname.value, this.email.value)
      .subscribe((id) => {
        if (id === undefined) {
          this.errorMessage = 'Something went wrong! Please try again later';
          this.hasError = true;
        }

        if (!this.hasError) {
          let celebs: string[] = [this.choice0.value, this.choice1.value, this.choice2.value, this.choice3.value, this.choice4.value];
          let wildcards: string[] = [this.wildcard0.value];
          this.playerService.submitEntry(id, celebs, wildcards).subscribe((id) => {
            if (id === undefined) {
              this.errorMessage = 'Something went wrong! Please try again later';
              this.hasError = true;
            }
            // TODO: Not fantastic to do string comparisons for statuses. Implement a proper status code and message system.
            if (!this.hasError) {
              this.router.navigate(['/success']);
            }
          });
        }
      });
  }

  joinForm = new FormGroup({
    firstname: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    // TODO: update to use a dynamic form for repeated fields
    choice0: new FormControl('', [Validators.required]),
    choice1: new FormControl('', [Validators.required]),
    choice2: new FormControl('', [Validators.required]),
    choice3: new FormControl('', [Validators.required]),
    choice4: new FormControl('', [Validators.required]),
    wildcard0: new FormControl('', [Validators.required]),
  });

  get firstname() { return this.joinForm.get('firstname'); }
  get lastname() { return this.joinForm.get('lastname'); }
  get email() { return this.joinForm.get('email'); }
  get choice0() { return this.joinForm.get('choice0'); }
  get choice1() { return this.joinForm.get('choice1'); }
  get choice2() { return this.joinForm.get('choice2'); }
  get choice3() { return this.joinForm.get('choice3'); }
  get choice4() { return this.joinForm.get('choice4'); }
  get wildcard0() { return this.joinForm.get('wildcard0'); }
}
