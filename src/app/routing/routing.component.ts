import {Component, OnInit} from '@angular/core';
import {ResolveService} from '../core/services/resolve.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {FrontPageComponent} from '../core/content/front-page/front-page.component';
import {ArticleComponent} from '../core/content/article/article.component';
import {NodeListComponent} from '../core/content/node-list/node-list.component';
import {UserComponent} from '../core/user/user/user.component';
import {TagComponent} from '../core/taxonomy/tag/tag.component';

@Component({
  selector: 'app-routing',
  templateUrl: './routing.component.html',
  styleUrls: ['./routing.component.scss']
})
export class RoutingComponent implements OnInit {
  watcher: Subscription;
  public someComponent: any;

  constructor(private resolveService: ResolveService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.url.subscribe(url => {
      if (url.length !== 0) {
        this.getComponent(url.toString().replace(/,/g, '/'));
      } else {
        this.someComponent = FrontPageComponent;
      }
    });
  }


  private getComponent(url: string) {
    this.resolveService.getRouteDetailsFromDrupal(url).toPromise().then((response: any) => {
      if (response.entity === undefined) {
        this.someComponent = NodeListComponent;
      } else {
        switch (response.entity.type) {
          case 'node':
            switch (response.entity.bundle) {
              case 'article':
                this.someComponent = ArticleComponent;
                break;
              case 'default':
                this.someComponent = NodeListComponent;
            }
            break;
          case 'user':
            this.someComponent = UserComponent;
            break;
          case 'taxonomy_term':
            switch (response.entity.bundle) {
              case 'tags':
                this.someComponent = TagComponent;
                break;
            }
            break;
          case 'default':
            this.someComponent = NodeListComponent;
            break;
        }
      }
    }).catch(e => {
      this.someComponent = NodeListComponent;
    });
  }
}
