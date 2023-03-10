
import {
  Directive,
  Input,
  Output,
  EventEmitter,
  HostBinding,
  HostListener
} from '@angular/core';

@Directive({
  selector: '[appLongPress]'
})
export class LongPressDirective {

  @Input() duration = 10;

  @Output() onLongPress: EventEmitter<any> = new EventEmitter();
  @Output() onLongPressing: EventEmitter<any> = new EventEmitter();
  @Output() onLongPressEnd: EventEmitter<any> = new EventEmitter();

  private pressing!: boolean;
  private longPressing!: boolean;
  private timeout: any;
  private mouseX = 0;
  private mouseY = 0;

  @HostBinding('class.press')
  get press(): any { return this.pressing; }

  @HostBinding('class.longpress')
  get longPress(): any { return this.longPressing; }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: any): any {
    // don't do right/middle clicks
    if (event.which !== 1) { return; }

    this.mouseX = event.clientX;
    this.mouseY = event.clientY;

    this.pressing = true;
    this.longPressing = false;

    this.timeout = setTimeout(() => {
      this.longPressing = true;
      this.onLongPress.emit(event);
      this.loop(event);
    }, this.duration);

    this.loop(event);
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: any): any {
    if (this.pressing && !this.longPressing) {
      const xThres = (event.clientX - this.mouseX) > 10;
      const yThres = (event.clientY - this.mouseY) > 10;
      if (xThres || yThres) {
        this.endPress();
      }
    }
  }

  loop(event: any): any {
    if (this.longPressing) {
      this.timeout = setTimeout(() => {
        this.onLongPressing.emit(event);
        this.loop(event);
      }, 50);
    }
  }

  endPress(): any{
    clearTimeout(this.timeout);
    this.longPressing = false;
    this.pressing = false;
    this.onLongPressEnd.emit(true);
  }

  @HostListener('mouseup')
  onMouseUp(): any { this.endPress(); }

}
