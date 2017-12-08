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
    const el = this.element.nativeElement;
    const scrollLeft = window.pageXOffset;
    const scrollTop = window.pageYOffset + 30;

    el.style.overflow = 'hidden';
    el.style.height = "auto";
    el.style.height = el.scrollHeight + 30 + 'px';

    window.scrollTo(scrollLeft, scrollTop);

  }
}
