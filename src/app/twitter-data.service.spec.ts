import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TwitterDataService } from './twitter-data.service';
import { tweetData } from './tweetData.model';
import { tweetReplyData } from './tweetReplyData.model';

describe('TwitterDataService', () => {
  let service: TwitterDataService;
  let httpMock: HttpTestingController;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TwitterDataService]
    });

    service = TestBed.inject(TwitterDataService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('#getTweet', () => {
    let id = '1318536307216363520';
    it('should return an Observable<tweetData[]>', () => {
      const dummyTweetData: tweetData = ({
        user: [{
          'name': 'About You Tech',
          'username': 'aboutyou_tech',
          'profile_image_url': 'https://pbs.twimg.com/profile_images/1128599974906871808/c92l87A7_normal.png'
        }],
        text: 'text',
        hashtags: [{ 
          "start": 220, 
          "end": 225, 
          "tag": "move" }],
        postImage: [{
          "key": "3_1318536303928053760",
          "type": "photo",
          "url": "https://pbs.twimg.com/media/EkxhyFMWkAARews.jpg"
        }],
        date: "2020-10-20T12:55:27.000Z",
        source: "Src",
        likeCount: 1,
        commentCount: 2,
      })

      service.getTweet(id).subscribe(result => {
        //console.log(result);
        expect(result).toEqual(dummyTweetData);
      });

      const req = httpMock.expectOne(`${service.api_url}/${id}`);
      expect(req.request.method).toBe("GET");
      req.flush(dummyTweetData);
    });
  });

  describe('#getReplyOfTweet', () => {
    let id = '1406980263645790208';
    it('should return an Observable<tweetReplyData[]>', () => {
      const dummyTweetReplyData: tweetReplyData[] = [{           
          "name": 'preethi', 
          "username": "@preethi",
          "profile_image_url": "https://pbs.twimg.com/profile_images/1344936176235458560/tXfzPh3T_normal.jpg",
          'text':'reply text',
          'created_at':'2020-10-20T12:55:27.000Z'
      }]

      service.getTweetReplies(id).subscribe(result => {
        //console.log(result);
        expect(result).toEqual(dummyTweetReplyData);
      });

      const req = httpMock.expectOne(`${service.api_url}/search/${id}`);
      expect(req.request.method).toBe("GET");
      req.flush(dummyTweetReplyData);
    });
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
