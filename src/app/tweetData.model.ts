import { hashTag } from "./hashtagData.model";
import { userData } from "./userData.model";
import { postImage } from "./postImage.model";

export interface tweetData {
    user?: userData[],
    text: string,
    hashtags: hashTag[],
    postImage?: postImage[],
    date: string;
    source: string;
    likeCount?: number;
    commentCount?: number;
  }