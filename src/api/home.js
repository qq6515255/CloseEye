import axios from 'axios'
import {DayCover,INDEX} from './base.js'

export function getDaycover () {
  return axios.get(DayCover)
  
}

export function getIndex () {
  return axios.get(INDEX)
}