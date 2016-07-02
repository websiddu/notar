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

});
