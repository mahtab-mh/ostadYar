import { Component } from '@angular/core';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
    selector: 'login-component',
    templateUrl: 'login.Component.html',
    standalone: true,
    imports: [DividerModule, ButtonModule, InputTextModule]
})
export class loginComponent {}