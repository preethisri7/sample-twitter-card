import { Component, OnInit } from '@angular/core';
import { TwitterDataService } from '../twitter-data.service';
import { faShareSquare } from '@fortawesome/free-regular-svg-icons';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { ActivatedRoute, Params } from '@angular/router';
import { tweetData } from '../tweetData.model';
import { tweetReplyData } from '../tweetReplyData.model';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.scss']
})


export class TweetComponent implements OnInit {
  faShareSquare = faShareSquare;
  faTwitter = faTwitter;
  tweetInfo = {} as tweetData;
  id: string = '';
  isShow: boolean = false;
  noComment: boolean = false;
  enableLike: boolean = true;
  likeCount: number = 0;
  tweetReplyInfo: tweetReplyData[] = [];
  routeSubscription = {} as Subscription;
  getTweetSubscription = {} as Subscription;
  getReplySubscription = {} as Subscription;

  constructor(private api: TwitterDataService,
    private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.routeSubscription = this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
    });
    this.getTwitterTweet(this.id);
  }

  getTwitterTweet(id: String): void {
    this.getTweetSubscription = this.api.getTweet(id).subscribe((data: tweetData) => {
      this.tweetInfo = data;
      this.likeCount = data.likeCount as number;

    })
  }

  showComments(): void {
    this.isShow = !this.isShow;
    this.getReplySubscription = this.api.getTweetReplies(this.id).subscribe((data: tweetReplyData[]) => {
      if (data.length !== undefined) {
        this.tweetReplyInfo = data;
      } else {
        this.noComment = true;
        console.log('No Comments Available');        
      }
    })

  }

  togglelike(): void {
    if (this.enableLike) {
      this.likeCount = this.likeCount + 1;
    } else {
      this.likeCount = this.likeCount - 1;
    }
    this.enableLike = !this.enableLike;

  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
    this.getTweetSubscription.unsubscribe();
    this.getReplySubscription.unsubscribe();
  }

}
