import { ElementRef, HostListener, Directive} from '@angular/core';

@Directive({
  selector: 'textarea[autosize]'
})

export class Autosize {
  @HostListener('input', ['$event.target'])

  onInput(textArea: HTMLTextAreaElement): void {
    this.adjust();
  }

  constructor(public element: ElementRef) { }

  ngAfterContentChecked(): void {
    this.adjust();
  }

  adjust(): void {
    this.element.nativeElement.style.overflow = 'hidden';
    this.element.nativeElement.style.height = 'auto';
    const thenScrollTo = this.element.nativeElement.scrollHeight + this.element.nativeElement.scrollTop;
    this.element.nativeElement.style.height = this.element.nativeElement.scrollHeight + 40 + 'px';
    window.scrollTo(0, thenScrollTo + 20);

  }
}
