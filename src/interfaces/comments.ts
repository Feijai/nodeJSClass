import { UserProps } from "./user";

export interface CommentProps {
  _id: string;
  comment: string;
  cardId: string;
  userId: Pick<UserProps, "_id" | "name" | "avatar" | "email">;
  createdAt: string;
  updatedAt: string;
}

export interface NewCommentProps {
  cardId: string;
  comment: string;
}
