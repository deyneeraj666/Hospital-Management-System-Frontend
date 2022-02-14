import { Directive, Input } from "@angular/core";
import { AbstractControl, NG_VALIDATORS, Validator } from "@angular/forms"

@Directive({
selector:'[confirmPasswdValidatior]',
providers:[{
    provide:NG_VALIDATORS,
    useExisting:ConfirmEqualValidatorDirective,
    multi:true
}]
})
export class ConfirmEqualValidatorDirective implements Validator{
    @Input() confirmPasswdValidatior:string|any;
    validate(control:AbstractControl):{[key:string]:any}|null{
        const controlToCompare=control.parent?.get(this.confirmPasswdValidatior);
        if(controlToCompare&&controlToCompare.value!=control.value){
            return {'notEqual':true}
        }
        return null;
    }
}