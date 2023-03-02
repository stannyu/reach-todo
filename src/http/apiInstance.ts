import axios from "axios";

export const BASE_URL = 'http://localhost:4000';
const TYPICODE_URL = 'https://jsonplaceholder.typicode.com';

export const todosApi = axios.create({
  baseURL: BASE_URL,
});