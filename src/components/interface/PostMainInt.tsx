import { Author } from './Author'
export interface Post {
  id: number;
  title: string;
  text: string;
  image: string;
  reaction: string;
  author: Author;
  created_at: string;
}