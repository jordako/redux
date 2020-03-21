import { Component, ChangeDetectionStrategy, ViewEncapsulation, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-incoming-and-expenses-new',
  templateUrl: './new.page.html',
  styleUrls: ['./new.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { class: 'app-incoming-and-expenses-new' },
})
export class NewPage implements OnInit {
  newForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit() {
    this.createForm();
  }

  onAdd() {
    console.log(this.newForm.value);
  }

  private createForm() {
    this.newForm = this.formBuilder.group({
      description: ['', Validators.required],
      amount: [0, Validators.min(0)],
      type: 'income',
    });
  }
}
