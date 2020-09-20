import { Component, OnInit } from '@angular/core';
import { ResolveService } from '../../services/resolve.service';
import {MediaChange, MediaObserver} from '@angular/flex-layout';
import {environment} from '../../../../environments/environment';
import {Subscription} from 'rxjs';


@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  public article: any[];
  public cols = 4; // To set columns for responsive displays
  public rowHeight = '600px'; // To set rowHeight for responsive displays
  watcher: Subscription;

  constructor(private resolveService: ResolveService, private mediaObserver: MediaObserver) {
    this.watcher = mediaObserver.media$.subscribe((change: MediaChange) => {
      if ( change.mqAlias === 'xs') {
        this.cols = 1;
        this.rowHeight = '620px';
      }
      if (change.mqAlias === 'sm' || change.mqAlias === 'md') {
        this.cols = 2;
        this.rowHeight = '650px';
      }
      if (change.mqAlias === 'lg') {
        this.cols = 3;
        this.rowHeight = '600px';
      }
      if (change.mqAlias === 'xl') {
        this.cols = 4;
        this.rowHeight = '550px';
      }
    });
  }
  private baseUrl = environment.apiUrl;

  ngOnInit() {

    // this.resolveService.getArticle().subscribe(
    //   article => {
    //     this.article = this.buildArticleObject(article);
    //   },
    // )
  }

  private buildArticleObject(article: any) {
    return [];
  }
}
