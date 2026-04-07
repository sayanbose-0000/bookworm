import { Types } from "mongoose";

interface IReadProgress {
  user_id: Types.ObjectId;
  book_id: Types.ObjectId;
  cfi_position: string;
  // last_read_at: Date;
}

export { IReadProgress };
