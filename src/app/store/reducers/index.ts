import { ActionReducerMap, MetaReducer } from "@ngrx/store";
import { environment } from "../../../environments/environment";

export const reducers: ActionReducerMap<unknown> = {};

export const metaReducers: MetaReducer<unknown>[] = !environment.production
  ? []
  : [];
