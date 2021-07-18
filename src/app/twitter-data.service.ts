import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { tweetData } from './tweetData.model';
import { tweetReplyData } from './tweetReplyData.model';

@Injectable({
  providedIn: 'root'
})


export class TwitterDataService {

  api_url = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  getTweet(id: String) {
    return this.http
      .get<tweetData>(`${this.api_url}/${id}`).pipe(
        map((result): tweetData => ({
          user: result.user,
          text: result.text,
          hashtags: result.hashtags,
          postImage: result.postImage,
          date: result.date,
          source: result.source,
          likeCount: result.likeCount,
          commentCount: result.commentCount
        }))

      );

  }

  getTweetReplies(id: String) {
    return this.http
      .get<tweetReplyData[]>(`${this.api_url}/search/${id}`);

  }

}
