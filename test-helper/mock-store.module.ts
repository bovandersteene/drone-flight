import { NgModule, ModuleWithProviders, APP_INITIALIZER } from "@angular/core";
import {
  ActionReducerMap,
  MetaReducer,
  StoreModule,
  ReducerManager
} from "@ngrx/store";
import { createMockReducer } from "./mock-reducer";
import { EffectsModule } from "@ngrx/effects";
import { MockEffect } from "./mock-effect";

const reducers: ActionReducerMap<unknown> = {};

const metaReducers: MetaReducer<unknown>[] = [];

export function initReducer(featureName: string, initialState: unknown) {
  return (reducer: ReducerManager) => {
    return () =>
      new Promise((resolve, reject) => {
        reducer.addReducer(featureName, createMockReducer(initialState));
        resolve("mocked reducer");
      });
  };
}
@NgModule({
  imports: [
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([MockEffect])
  ],
  exports: {
    StoreModule
  }
})
export class MockStoreModule {
  static forRoot(
    featureName: string,
    initialState: unknown
  ): ModuleWithProviders {
    return {
      ngModule: MockStoreModule,
      providers: [
        {
          provide: APP_INITIALIZER,
          useFactory: initReducer(featureName, initialState),
          deps: [ReducerManager],
          multi: true
        }
      ]
    };
  }
}
