import { Types } from "mongoose";
import { IAnnoteTypeEnum } from "../../enums/IAnnoteTypeEnum";

interface IAnnoteSchema {
  user_id: Types.ObjectId;
  book_id: Types.ObjectId;
  annote_type: IAnnoteTypeEnum;
  cfi_position: string;
  selected_text: string;
}

export { IAnnoteSchema };
