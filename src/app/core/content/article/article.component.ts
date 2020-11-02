import {Component, OnInit} from '@angular/core';
import {ResolveService} from '../../services/resolve.service';
import {MediaChange, MediaObserver} from '@angular/flex-layout';
import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  public article: any;
  public cols = 4; // To set columns for responsive displays
  public rowHeight = '600px'; // To set rowHeight for responsive displays
  public url = '';
  watcher: Subscription;

  constructor(private resolveService: ResolveService, private mediaObserver: MediaObserver, private route: ActivatedRoute) {
    this.route.url.subscribe(url => {
      this.url = url.toString().replace(/,/g, '/');
    });
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

  ngOnInit() {
    this.resolveService.getArticle(this.url).subscribe(
      article => {
        this.article = this.buildArticleObject(article);
        this.updateTagTitles();
      },
    )
  }

  private buildArticleObject(article: any) {
    return {
      id: article.nid[0].value,
      title: article.title[0].value,
      body: article.body[0].value,
      type: article.type[0].value,
      created: article.created[0].value,
      image: {
        src: article.field_image[0].url,
        alt: article.field_image[0].alt,
      },
      tags: this.getTags(article.field_tags),
      url: article.path[0].alias,
      user: '',
    };
  }

  private getTags(tagsArray: any) {
    const tags: Array<any> = [];
    tagsArray.forEach(tag => {
      tags.push({
        title: 'Tag',
        url: tag.url,
      });
    });
    return tags;
  }

  private updateTagTitles() {
    const tags = this.article.tags;
    tags.forEach((tag, index) => {
      this.resolveService.getTag(tag.url).subscribe(
        _tag => {
          console.log(_tag);
          tags[index].title = _tag.name[0].value;
        }
      )
    });
  }
}
