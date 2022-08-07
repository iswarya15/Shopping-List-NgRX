import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appDropdown]',
})
export class DropdownDirective {
  @HostBinding('class.show') isOpen = false;

  constructor() {}

  @HostListener('click') toggleManageRecipe() {
    console.log('Open => ', this.isOpen);
    this.isOpen = !this.isOpen;
  }
}
