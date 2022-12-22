import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafePipe } from './safe.pipe';
import { CastPipe } from './cast.pipe';



@NgModule({
  declarations: [
    SafePipe,
    CastPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SafePipe,
    CastPipe
  ]
})
export class PipesModule { }
