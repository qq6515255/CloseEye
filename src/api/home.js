import axios from "axios";
import { DayCover, INDEX, VIEW, VIEWLIST, CHANNEL, SEARCH } from "./base.js";

export function getDaycover() {
  return axios.get(DayCover);
}

export function getIndex() {
  return axios.get(INDEX);
}

export function getViewList() {
  return axios.get(VIEWLIST);
}

export function getView(id) {
  let st = VIEW;
  return axios.get(st + id);
}

export function getChannel() {
  return axios.get(CHANNEL);
}

export function getSearch(key) {
  return axios.get(SEARCH, {
    params: {
      kw: key
    }
  });
}
