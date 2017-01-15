import { Directive, ElementRef, HostListener, Renderer, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Directive({ selector: '[MoveAnything]' })

export class MoveAnythingDirective {
  initialPos: MouseEvent;
  notTouched: boolean = true;
  subscribeBool : boolean = true;
  posXY = new Subject<{dx: number, dy: number}>();
  subscribe: any;

  //define the class wich will update the view pos // default will use any class of the element
  @Input() MoveAnything: string = '';

  constructor(private renderer: Renderer, private el: ElementRef) {}

  @HostListener('mouseup')
  onMouseup(event) {
      //must first init subscribe
      if(this.notTouched){ return; }
      //force unscribe in case user input is out of nav scene
      this.toggleSubscribe(true);
  }

  @HostListener('mousedown', ['$event'])
  onMousedown(event) {
    if(this.checkClass(event)){
      //check if last pos is not equal to default pos
      if(this.notTouched){ this.initialPos = event; }

      this.toggleSubscribe();
    }
  }

  @HostListener('mousemove', ['$event'])
  onMousemove(event: MouseEvent) {
      this.posXY.next({ dx: event.clientX, dy: event.clientY});
  }

  toggleSubscribe(bool?: boolean){
    this.subscribeBool = bool || !this.subscribeBool;
    if(this.subscribeBool) { this.subscribe.unsubscribe(); }else{
      this.subscribe = this.posXY.subscribe(
        (posXY) => {
          this.renderer.setElementStyle(this.el.nativeElement, 'transform', 'translate(' + String(posXY.dx - this.initialPos.clientX) + 'px, ' + String(posXY.dy - this.initialPos.clientY) + 'px)');
          this.notTouched = false;
      });
    }
  }

  checkClass(event: Event){
    //default will made the whole container 'moveable'
    if(!this.MoveAnything){ return true }
    return event.srcElement.className == this.MoveAnything;
  }
}
