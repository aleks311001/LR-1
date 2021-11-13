import { combineReducers } from "redux";
import { user } from "./user";
import { automatas } from "./automatas";

export const reducers = combineReducers({ user, automatas });
