import { Component, AfterViewChecked, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'test-form',
    templateUrl: 'messages.validation.form.component.html'
})
export class MessagesValidationFormComponent {
    hero = { name: 'liu feifei', age: 3 };
    active = true;
    heroForm: NgForm;
    @ViewChild('heroForm') currentForm: NgForm;

    ngAfterViewChecked() {
        this.formChanged();
    }

    formChanged() {
        if (this.currentForm === this.heroForm) { return; }
        this.heroForm = this.currentForm;
        if (this.heroForm) {
            this.heroForm.valueChanges
                .subscribe(data => this.onValueChanged(data));
        }
    }

    onValueChanged(data?: any) {
        if (!this.heroForm) { return; }
        const form = this.heroForm.form;

        for (const field in this.formErrors) {
            // clear previous error message (if any)
            this.formErrors[field] = '';
            const control = form.get(field);

            if (control && control.dirty && !control.valid) {
                const messages = this.validationMessages[field];
                for (const key in control.errors) {
                    this.formErrors[field] += messages[key] + ' ';
                }
            }
        }
    }

    formErrors = {
        'name': '',
        'age': ''
    };

    validationMessages = {
        'name': {
            'required': 'Name is required.',
            'minlength': 'Name must be at least 9 characters long.',
            'maxlength': 'Name cannot be more than 20 characters long.',
            'forbiddenName': 'Someone named "Bob" cannot be a hero.'
        },
        'age': {
            'required': 'Age is required.',
            'pattern':'must be a 3 digital number'
        }
    };

    ok() {
        console.log('haha');
        console.log(this.heroForm);
    }
}