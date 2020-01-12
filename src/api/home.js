import axios from "axios";
import { DayCover, INDEX, VIEW, VIEWLIST, CHANNEL, SEARCH, ListTAB, ListID } from "./base.js";

export function getDaycover() {
  return axios.get(DayCover);
}

export function getIndex() {
  return axios.get(INDEX);
}

export function getViewList() {
  return axios.get(VIEWLIST);
}

export function getTypeListbyTab(key, p) {
  let page = 1;
  if (p !== undefined) {
    page = p;
  }
  return axios.get(ListTAB, {
    params: {
      p: page,
      size: 10,
      tab: key
    }
  });
}

export function getTypeListbyid(key, p) {
  let page = 1;
  if (p !== undefined) {
    page = p;
  }
  return axios.get(ListID, {
    params: {
      p: page,
      size: 10,
      cateid: key
    }
  });
}

export function getView(id) {
  let st = VIEW;
  return axios.get(st, {
    params: {
      postid: id
    }
  });
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
