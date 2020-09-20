import { Component, OnInit } from '@angular/core';
import {ResolveService} from '../core/services/resolve.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {FrontPageComponent} from '../core/content/front-page/front-page.component';
import {ArticlesGridComponent} from '../core/content/articles-grid/articles-grid.component';
import {ArticlesListComponent} from '../core/content/articles-list/articles-list.component';

@Component({
  selector: 'app-routing',
  templateUrl: './routing.component.html',
  styleUrls: ['./routing.component.scss']
})
export class RoutingComponent implements OnInit {
  watcher: Subscription;
  public someComponent: any;
  constructor(private resolveService: ResolveService, private router: Router, private route: ActivatedRoute) { }

    ngOnInit() {
      this.route.url.subscribe(url => {
        if (url.length !== 0) {
          this.getComponent(url.toString().replace(/,/g, '/'));
        }
        else {
          this.someComponent = FrontPageComponent;
        }
      });
    }


  private getComponent(url: string) {
    this.resolveService.getRouteDetailsFromDrupal(url).subscribe(response => {
      if (response.entity !== undefined) {
        if (response.entity.type === 'node') {
          switch (response.entity.bundle) {
            case 'article':
              this.someComponent = ArticlesListComponent;
              break;
            case 'default':
              this.someComponent = ArticlesGridComponent;
          }
        }
      }
    });
  }
}
