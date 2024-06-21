import axios from "axios";


export const API = axios.create({
    baseURL: 'http://192.168.0.150:1337/api/',
  });