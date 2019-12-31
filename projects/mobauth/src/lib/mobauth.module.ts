import { NgModule } from '@angular/core';
import { MobauthComponent } from './mobauth.component';
import { AuthService } from './auth.service';



@NgModule({
  declarations: [MobauthComponent],
  imports: [
  ],
  providers: [
    AuthService
  ],
  exports: [MobauthComponent]
})
export class MobauthModule { }
