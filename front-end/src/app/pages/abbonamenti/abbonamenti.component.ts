import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Membership } from 'src/app/shared/interfaces';
import { membershipsUrl } from 'src/app/shared/routes';

@Component({
  selector: 'app-abbonamenti',
  templateUrl: './abbonamenti.component.html',
  styleUrls: ['./abbonamenti.component.scss']
})
export class AbbonamentiComponent {

  memberships: Membership[] = [];

  constructor(private httpClient: HttpClient) {
    const sub = this.httpClient.get(membershipsUrl).subscribe((data) => {
      console.log(data);
      this.memberships= (data as []).map(m => {
        return new Membership(m);
      });
      sub.unsubscribe();
    });
  }
}
