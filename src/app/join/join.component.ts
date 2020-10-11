import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { JoinService } from './join.service';

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.css']
})
export class JoinComponent implements OnInit {
  errorMessage?: string;

  constructor(private joinService: JoinService, private router: Router) { }

  ngOnInit(): void {
  }

  private clearErrors() {
    this.errorMessage = null;
  }

  onSubmit(): void {
    this.clearErrors();
    var celebs: string[] = [this.choice0.value, this.choice1.value, this.choice2.value, this.choice3.value, this.choice4.value];
    var wildcards: string[] = [this.wildcard0.value];
    status = this.joinService.submitChoices(this.name.value, this.email.value, celebs, wildcards);
    // TODO: Not fantastic to do string comparisons for statuses. Implement a proper status code and message system.
    if (status === '') {
      this.router.navigate(['/success']);
    }
    else {
      this.errorMessage = status;
    }
  }

  joinForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    // TODO: update to use a dynamic form for repeated fields
    choice0: new FormControl('', [Validators.required]),
    choice1: new FormControl('', [Validators.required]),
    choice2: new FormControl('', [Validators.required]),
    choice3: new FormControl('', [Validators.required]),
    choice4: new FormControl('', [Validators.required]),
    wildcard0: new FormControl('', [Validators.required]),
  });

  get name() { return this.joinForm.get('name'); }
  get email() { return this.joinForm.get('email'); }
  get choice0() { return this.joinForm.get('choice0'); }
  get choice1() { return this.joinForm.get('choice1'); }
  get choice2() { return this.joinForm.get('choice2'); }
  get choice3() { return this.joinForm.get('choice3'); }
  get choice4() { return this.joinForm.get('choice4'); }
  get wildcard0() { return this.joinForm.get('wildcard0'); }
}
