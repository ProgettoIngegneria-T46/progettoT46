import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Course } from 'src/app/shared/interfaces';
import { coursesUrl } from 'src/app/shared/routes';

@Component({
  selector: 'app-corsi',
  templateUrl: './corsi.component.html',
  styleUrls: ['./corsi.component.scss']
})
export class CorsiComponent {

  courses: Course[] = [];

  constructor(private httpClient: HttpClient) {
    const sub = this.httpClient.get(coursesUrl).subscribe((data) => {
      console.log(data);
      this.courses = (data as []).map(c => {
        return new Course(c);
      });
      sub.unsubscribe();
    });
  }
}
