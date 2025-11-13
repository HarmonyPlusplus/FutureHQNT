export interface Comment {
  id: number;
  text: string;
  user: {fullname: string; avatar: string;};
  created_at: string;
  has_reacted: boolean | null;
}

