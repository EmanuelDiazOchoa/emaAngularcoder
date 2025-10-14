import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appTituloGrande]'
})
export class TituloGrandeDirective {
  constructor(el: ElementRef, renderer: Renderer2) {
    renderer.setStyle(el.nativeElement, 'font-size', '20px');
    renderer.setStyle(el.nativeElement, 'font-weight', 'bold');
  }
}
