import { AbstractControl, ValidationErrors } from '@angular/forms';

export class PasswordMatch {
  static verify(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password');
    const confirmPassword = group.get('confirmPassword');
    if (!password || !confirmPassword) {
      return { controlNotFound: true };
    }
    const error =
      password.value === confirmPassword.value
        ? null
        : { noPasswordMatch: true };
    confirmPassword.setErrors(error);
    return error;
  }
}
