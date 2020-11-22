import { Component, OnInit } from '@angular/core';
import {ResolveService} from '../../services/resolve.service';
import {MediaObserver} from '@angular/flex-layout';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  public user: any;
  public url = '';
  constructor(private resolveService: ResolveService, private mediaObserver: MediaObserver, private route: ActivatedRoute) {
    this.user = '';
    this.route.url.subscribe(url => {
      this.url = url.toString().replace(/,/g, '/');
    }).unsubscribe();
  }

  ngOnInit() {
    this.resolveService.getUser(this.url).subscribe(user => {
      this.user = {
        id: user.uid[0].value,
        name: user.name[0].value,
        path: (user.path[0].alias === null) ? '/user/' + user.uid[0].value
          : user.path[0].alias,
      }
    })
  }

}
