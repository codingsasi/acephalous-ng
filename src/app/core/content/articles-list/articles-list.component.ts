import { Component, OnInit, OnDestroy } from '@angular/core';
import { ResolveService } from '../../services/resolve.service';
import { environment } from '../../../../environments/environment';
import { Subscription } from 'rxjs';
import { MediaChange, MediaObserver } from '@angular/flex-layout';

@Component({
  selector: 'app-articles-list',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.scss']
})
export class ArticlesListComponent implements OnInit, OnDestroy {
  public articles: any[];
  public rowHeight: string = "600px"; // To set rowHeight for responsive displays
  watcher: Subscription;

  constructor(private resolveService: ResolveService, private mediaObserver: MediaObserver) {
    this.watcher = mediaObserver.media$.subscribe((change: MediaChange) => {
      if ( change.mqAlias == 'xs') {
        this.rowHeight = "350px";
      }
      if (change.mqAlias == 'sm' || change.mqAlias == 'md') {
        this.rowHeight = "400px";
      }
      if (change.mqAlias == 'lg') {
        this.rowHeight = "400px";
      }
      if (change.mqAlias == 'xl') {
        this.rowHeight = "450px";
      }
    });
  }
  private baseUrl = environment.apiUrl;

  ngOnInit() {
    this.resolveService.getArticles().subscribe(
      articles => {
        this.articles = this.buildArticlesObject(articles);
        this.buildImageUrls();
        this.buildTagUrls();
        this.buildUserUrl();
      },
    )
  }

  buildArticlesObject(articles) {
    articles = articles.data;
    let articlesArray: Array<any> = [];
    articles.forEach(article => {
      articlesArray.push({
        'id': article.id,
        'type': article.type,
        'title': article.attributes.title,
        'summary': article.attributes.body.summary,
        'created': article.attributes.created,
        'image': '',
        'tags': [],
        'user': '',
      });
    });
    return articlesArray;
  }

  buildImageUrls() {
    let articles = this.articles;
    articles.forEach((article, i) => {
      this.resolveService.getImage(article.id, article.type).subscribe(
        image => {
          this.articles[i].image = this.baseUrl + '/' + image.data.attributes.uri.url;
        }
      )
    });
  }

  buildTagUrls() {
    let articles = this.articles;
    articles.forEach((article, i) => {
      this.resolveService.getTags(article.id, article.type).subscribe(
        tags => {
          tags = tags.data;
          let tagsArray: Array<any> = [];
          tags.forEach(tag => {
            tagsArray.push({
              'name': tag.attributes.name,
              'link': tag.attributes.path.alias,
            });
          });
          this.articles[i].tags = tagsArray;
        }
      )
    });
  }

  buildUserUrl() {
    let articles = this.articles;
    articles.forEach((article, i) => {
      this.resolveService.getUser(article.id, article.type).subscribe(
        user => {
          this.articles[i].user = user.data.attributes.name;
        }
      )
    });
  }

  ngOnDestroy() {
    this.watcher.unsubscribe();
  }

}
