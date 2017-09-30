import { Component, AfterViewChecked, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'test-form',
    templateUrl: 'simple.validation.form.component.html'
})
export class SimpleValidationFormComponent {
    heroForm: NgForm;
    @ViewChild('heroForm') currentForm: NgForm;

    hero = { name: 'liu feifei', age: 3 };
    active = true;
    ngAfterViewChecked() {
        this.formChanged();
    }

    formChanged() {
        if (this.currentForm === this.heroForm) { return; }
        this.heroForm = this.currentForm;
        // if (this.heroForm) {
        //     this.heroForm.valueChanges
        //         .subscribe(data => this.onValueChanged(data));
        // }
    }

    ok() {
        console.log(this.heroForm);
    }
}