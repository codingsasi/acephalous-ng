import { Component, OnInit, OnDestroy } from '@angular/core';
import { ResolveService } from '../../services/resolve.service';
import { environment } from '../../../../environments/environment';
import { Subscription } from 'rxjs';
import { MediaChange, MediaObserver } from '@angular/flex-layout';

@Component({
  selector: 'app-articles-grid',
  templateUrl: './articles-grid.component.html',
  styleUrls: ['./articles-grid.component.scss']
})
export class ArticlesGridComponent implements OnInit, OnDestroy {
  public articles: any[];
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
    this.resolveService.getArticles().subscribe(
      articles => {
        this.articles = this.buildArticlesObject(articles);
        this.buildImageUrls();
        this.buildImageUrls();
        this.buildTagUrls();
        this.buildUserUrl();
      },
    )
  }

  buildArticlesObject(articles) {
    articles = articles.data;
    const articlesArray: Array<any> = [];
    articles.forEach(article => {
      articlesArray.push({
        id: article.id,
        type: article.type,
        title: (article.attributes.title.length > 45 ) ? article.attributes.title.substr(0, 45) + ' ...' : article.attributes.title,
        summary: article.attributes.body.summary.substr(0, 250),
        created: article.attributes.created,
        image: '',
        tags: [],
        user: '',
      });
    });
    console.log(articlesArray);
    return articlesArray;
  }

  buildImageUrls() {
    const articles = this.articles;
    articles.forEach((article, i) => {
      this.resolveService.getImage(article.id, article.type).subscribe(
        image => {
          this.articles[i].image = this.baseUrl + '/' + image.data.attributes.uri.url
        }
      )
    });
  }

  buildTagUrls() {
    const articles = this.articles;
    articles.forEach((article, i) => {
      this.resolveService.getTags(article.id, article.type).subscribe(
        tags => {
          tags = tags.data;
          const tagsArray: Array<any> = [];
          tags.forEach(tag => {
            tagsArray.push({
              name: tag.attributes.name,
              link: tag.attributes.path.alias,
            });
          });
          this.articles[i].tags = tagsArray;
        }
      )
    });
  }

  buildUserUrl() {
    const articles = this.articles;
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
