import { NgModule } from '@angular/core';
import { ToggleFullscreenDirective } from './fullscreen/toggle-fullscreen.directive';
import { TodoService } from './todo.service';

@NgModule({
  declarations: [ ToggleFullscreenDirective ],
  exports:      [ ToggleFullscreenDirective ],
  providers:    [ TodoService ]
})
export class SharedModule {
}
