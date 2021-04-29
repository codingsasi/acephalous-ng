import {Component, OnInit, OnDestroy} from '@angular/core';
import {ResolveService} from '../../services/resolve.service';
import {environment} from '../../../../environments/environment';
import {Subscription} from 'rxjs';
import {MediaChange, MediaObserver} from '@angular/flex-layout';
import {mergeMap} from 'rxjs/operators';

@Component({
  selector: 'app-node-list',
  templateUrl: './node-list.component.html',
  styleUrls: ['./node-list.component.scss']
})
export class NodeListComponent implements OnInit, OnDestroy {
  public nodes: any[];
  public rowHeight = '600px'; // To set rowHeight for responsive displays
  watcher: Subscription;

  constructor(private resolveService: ResolveService, private mediaObserver: MediaObserver) {
    this.nodes = [];
    this.watcher = mediaObserver.media$.subscribe((change: MediaChange) => {
      if (change.mqAlias === 'xs') {
        this.rowHeight = '350px';
      }
      if (change.mqAlias === 'sm' || change.mqAlias === 'md') {
        this.rowHeight = '400px';
      }
      if (change.mqAlias === 'lg') {
        this.rowHeight = '400px';
      }
      if (change.mqAlias === 'xl') {
        this.rowHeight = '450px';
      }
    });
  }

  private baseUrl = environment.apiUrl;

  ngOnInit() {
    this.resolveService.getNodes()
      .subscribe(nodes => {
        this.nodes = nodes.map(node => ({
          id: node.nid[0].value,
          uuid: node.uuid[0].value,
          type: node.type[0].target_id,
          title: node.title[0].value,
          summary: (node.body[0].summary.length === 0) ?
            node.body[0].processed.substr(0, 500).replace(/<\/?[^>]+(>|$)/g, '')
            : node.body[0].summary,
          created: new Date(node.created[0].value).toDateString(),
          image: {
            src: node.field_image !== undefined && node.field_image[0] ? node.field_image[0].url : '',
            alt: node.field_image !== undefined && node.field_image[0] ? node.field_image[0].alt : '',
          },
          tags: this.getTags(node.field_tags),
          user: {
            name: node.uid[0].name[0].value,
            path: (node.uid[0].path[0].alias === null) ? '/user/' + node.uid[0].uid[0].value
              : node.uid[0].path[0].alias,
          },
          path: (node.path[0].alias === null) ? '/node/' + node.nid[0].value
            : node.path[0].alias,
        }));
      });
  }

  getTags(fieldTags) {
    const tags = [];
    fieldTags.forEach((tag) => {
      tags.push({
        title: tag.name[0].value,
        url: tag.path[0].alias,
      });
    });
    return tags;
  }

  ngOnDestroy() {
    this.watcher.unsubscribe();
  }
}
