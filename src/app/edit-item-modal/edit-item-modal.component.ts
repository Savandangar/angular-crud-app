import { Component, Input, OnInit } from '@angular/core';
import {
    AbstractControl,
    FormBuilder,
    FormGroup,
    FormControl,
    Validators,
  } from '@angular/forms';

@Component({
    selector: 'app-edit-item-modal',
    templateUrl: './edit-item-modal.component.html',
    styleUrls: ['./edit-item-modal.component.css']
})
export class EditItemModalComponent implements OnInit{
    @Input() dataToEdit: any;
    localItem: any;
    jsonData: any;
    finalData: any;

    editForm: FormGroup = new FormGroup({
        fName: new FormControl(''),
        lName: new FormControl(''),
        email: new FormControl(''),
        phoneno: new FormControl(''),
        desc: new FormControl('')
    })
    submitted = false;
    constructor(private formBuilder: FormBuilder){}

    ngOnInit(): void {
        this.editForm = this.formBuilder.group({
        fName: ['', Validators.required],
        lName: ['',Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phoneno: ['', [Validators.required, Validators.pattern("^[0-9]{10}$")]],
        desc: ['', [
            Validators.required,
            Validators.minLength(50),
            Validators.maxLength(150)]]
        });
    }

    get f(): { [key: string]: AbstractControl } {
        return this.editForm.controls;
    }

    onSave(){
        this.submitted = true;

        if (this.editForm.invalid) {
            return;
        }
        if (this.dataToEdit){
            this.localItem = window.localStorage.getItem('data');
            if(this.localItem){
                this.jsonData = JSON.parse(this.localItem)
                
                const searchId = this.dataToEdit.id;
                const foundIndex = this.findIndexById(this.jsonData, searchId);
    
                if (foundIndex !== -1) {
                    this.jsonData[foundIndex] = this.dataToEdit;
                    // console.log('Item replaced:', this.jsonData[foundIndex]);
                } else {
                    alert("Unable to edit")
                    console.log('Item not found');
                }
                this.finalData = JSON.stringify(this.jsonData);
                // console.log(this.finalData);
                window.localStorage.setItem('data', this.finalData);
            }
            location.reload();
        }
    }

    findIndexById(obj: { [x: string]: { id: any; }; }, id: any) {
        for (let index in obj) {
            if (obj[index].id === id) {
                return index; 
            }
        }
        return -1; 
    }

    closeModal() {
        const modal = document.getElementById('staticBackdrop');
        if (modal) {
            modal.classList.remove('show');
            modal.setAttribute('style', 'display: none;');
            document.body.style.overflow = "scroll"; 

            const modalBackdrop = document.querySelector('.modal-backdrop');
            if (modalBackdrop) {
                modalBackdrop.remove();
            }
        }
    }
}
