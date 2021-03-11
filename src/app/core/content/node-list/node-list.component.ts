import { Component, OnInit, OnDestroy } from '@angular/core';
import { ResolveService } from '../../services/resolve.service';
import { environment } from '../../../../environments/environment';
import { Subscription } from 'rxjs';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
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
      if ( change.mqAlias === 'xs') {
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
      .pipe(mergeMap(nodes => {
        return nodes.map(node => ({
          id: node.nid[0].value,
          uuid: node.uuid[0].value,
          type: node.type[0].target_id,
          title: node.title[0].value,
          summary: (node.body[0].summary.length === 0) ?
          node.body[0].processed.substr(0, 500).replace(/<\/?[^>]+(>|$)/g, '')
          : node.body[0].summary,
          created: new Date(node.created[0].value).toDateString(),
          image: {
            src: node.field_image[0] ? node.field_image[0].url : '',
            alt: node.field_image[0] ? node.field_image[0].alt : '',
          },
          tags: node.field_tags,
          user: node.uid[0].url,
          path: (node.path[0].alias === null) ? '/node/' + node.nid[0].value
          : node.path[0].alias,
        }));
      }))
      .subscribe(node => {
        // @ts-ignore
        node.tags.forEach((_tag, index) => {
          this.resolveService.getTag(_tag.url).subscribe(tag => {
            // @ts-ignore
            node.tags[index] = {
              title: tag.name[0].value,
              url: tag.path[0].alias,
            };
          });
        });
        // @ts-ignore
        this.resolveService.getUser(node.user).subscribe(user => {
          // @ts-ignore
          node.user = {
            name: user.name[0].value,
            path: (user.path[0].alias === null) ? '/user/' + user.uid[0].value
              : user.path[0].alias,
          }
        });
        this.nodes.push(node);
      });
  }

  ngOnDestroy() {
    this.watcher.unsubscribe();
  }
}
