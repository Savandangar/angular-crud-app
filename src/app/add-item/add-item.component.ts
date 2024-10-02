import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Data } from '../Data';
import { v4 as uuidv4 } from 'uuid';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit{
  
  id: number | undefined;
  fName: string | undefined;
  lName: string | undefined;
  email: string | undefined;
  phoneno: number | undefined;
  desc: string | undefined;
  @Output() addItem: EventEmitter<Data> = new EventEmitter();
  
  contactForm: FormGroup = new FormGroup({
    fName: new FormControl(''),
    lName: new FormControl(''),
    email: new FormControl(''),
    phoneno: new FormControl(''),
    desc: new FormControl(''),
  })
  submitted = false;
  constructor(private formBuilder: FormBuilder){}

  ngOnInit(): void {
    this.contactForm = this.formBuilder.group({
      fName: ['', Validators.required],
      lName: ['',Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneno: ['', [Validators.required, Validators.pattern("^[0-9]{10}$")]],
      desc: ['', [Validators.required, Validators.minLength(50),Validators.maxLength(150)]],
    });
  }

  onSubmit(): void{
    this.submitted = true;

    if (this.contactForm.invalid) {
      return;
    }
    const data = {
      id: uuidv4(),
      fName: this.fName,
      lName: this.lName,
      email: this.email,
      phoneno: this.phoneno,
      desc: this.desc
    }
    this.addItem.emit(data);
  }

  get f(): { [key: string]: AbstractControl } {
    return this.contactForm.controls;
  }
}
