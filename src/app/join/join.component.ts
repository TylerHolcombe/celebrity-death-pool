import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.css']
})
export class JoinComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    console.log('Submitted!');
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
