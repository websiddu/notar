import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { ApiService } from './api.service';

@Injectable()
export class DocResolver implements Resolve<any> {

  constructor(private api: ApiService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    return this.api.getDocWithObserver(route.params['id']);
  }
}
