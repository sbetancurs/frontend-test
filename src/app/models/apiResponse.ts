import { Container } from './container';

export interface ApiResponse {
  code: number;
  status: string;
  data: Container;
  etag: string;
  copyright: string;
  attributionText: string;
  attributionHTML: string;
}
