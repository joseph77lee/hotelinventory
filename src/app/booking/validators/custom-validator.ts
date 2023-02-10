import { ɵɵtrustConstantResourceUrl } from "@angular/core";
import { AbstractControl, FormGroup } from "@angular/forms";

export class CustomValidator {
  static ValidateName(control: AbstractControl) {
    const value = control.value as string;
    if (value.includes('test')) {
      return {
        invalidNmae: true
      }
    }
    return null;
  }

  static ValidateSpecialChar(char: string) {
    return (control: AbstractControl) => {
      const value = control.value as string;
      if (value.includes(char)) {
        return {
          invalidNmae: true
        }
      }
      return null;
    }
  }

  static ValidateDate(control: FormGroup) {
    const checkinDate: any = new Date(control.get('checkinDate')?.value);
    const checkoutDate: any = new Date(control.get('checkoutDate')?.value);
    const diffTime = checkoutDate - checkinDate;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    console.log(diffDays);
    console.log(diffTime);
    if (diffDays <= 0) {
      control.get('checkoutDate')?.setErrors({
        invaildDate: true
      })
      return {
        invalidDate: true
      };
    }
    return null;
  }
}
