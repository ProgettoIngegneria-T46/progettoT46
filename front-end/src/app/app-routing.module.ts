import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './misc/cart/cart.component';
import { AbbonamentiComponent } from './pages/abbonamenti/abbonamenti.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { CorsiComponent } from './pages/corsi/corsi.component';
import { HomeComponent } from './pages/home/home.component';
import { ShopComponent } from './pages/shop/shop.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'shop', component: ShopComponent },
  { path: 'contattaci', component: ContactsComponent },
  { path: 'abbonamenti', component: AbbonamentiComponent },
  { path: 'corsi', component: CorsiComponent },
  { path: 'carrello', component: CartComponent },
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
