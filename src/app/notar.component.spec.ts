import {
  beforeEachProviders,
  describe,
  expect,
  it,
  inject
} from '@angular/core/testing';
import { NotarAppComponent } from '../app/notar.component';

beforeEachProviders(() => [NotarAppComponent]);

describe('App: Notar', () => {
  it('should create the app',
      inject([NotarAppComponent], (app: NotarAppComponent) => {
    expect(app).toBeTruthy();
  }));

  it('should have as title \'notar works!\'',
      inject([NotarAppComponent], (app: NotarAppComponent) => {
    expect(app.title).toEqual('notar works!');
  }));
});
