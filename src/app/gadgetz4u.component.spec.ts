import {
  beforeEachProviders,
  describe,
  expect,
  it,
  inject
} from '@angular/core/testing';
import { Gadgetz4uAppComponent } from '../app/gadgetz4u.component';

beforeEachProviders(() => [Gadgetz4uAppComponent]);

describe('App: Gadgetz4u', () => {
  it('should create the app',
      inject([Gadgetz4uAppComponent], (app: Gadgetz4uAppComponent) => {
    expect(app).toBeTruthy();
  }));

  it('should have as title \'gadgetz4u works!\'',
      inject([Gadgetz4uAppComponent], (app: Gadgetz4uAppComponent) => {
    expect(app.title).toEqual('gadgetz4u works!');
  }));
});
