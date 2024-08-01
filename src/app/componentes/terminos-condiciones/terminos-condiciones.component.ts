import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-terminos-condiciones',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './terminos-condiciones.component.html',
  styleUrl: './terminos-condiciones.component.css'
})
export class TerminosCondicionesComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.form = this.fb.group({
      aceptoTerminos: [false, Validators.requiredTrue],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  get aceptoTerminos() { return this.form.get('aceptoTerminos'); }
  get email() { return this.form.get('email'); }

  canDeactivate(): boolean {
    return this.form.valid;
  }

  onSubmit() {
    if (this.form.valid) {
      this.router.navigate(['/home']);
      console.log('Formulario enviado:', this.form.value);
    }
  }
}
