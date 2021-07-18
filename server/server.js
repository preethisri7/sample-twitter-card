const express = require('express');
const app = express();
const rp = require('request-promise-native');
require('dotenv').config({ path: __dirname + '/.env' })
const BEARER_TOKEN = process.env.TWITTER_BEARER_TOKEN;
const reqHeaders = {
  'User-Agent': 'Request-Promise',
  "Authorization": 'Bearer ' + BEARER_TOKEN
};

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.get('/api/search/:id', (req, res) => {
  if (!BEARER_TOKEN) {
    res.status(400).send(authMessage);
  }
  rp({
    uri: 'https://api.twitter.com/2/tweets/search/recent',
    headers: reqHeaders,
    qs: {
      'tweet.fields': 'author_id,created_at',
      'query': 'conversation_id:' + req.params.id,
      'expansions': 'author_id',
      'user.fields': 'profile_image_url'
    },
    json: true
  })
    .then(parsedBody => {
      if (res.statusCode !== 200) {
        if (res.statusCode === 403) {
          res.status(403).send(response.body);
        } else {
          throw new Error(res.body.error.message);
        }
      }

      var result = parsedBody.data.map((item, index) => ({
        ...item, ...parsedBody.includes.users[index]
      }))
      res.send(result);
    })
    .catch(err => {
      res.send(err);
    });
})

app.get('/api/:id', (req, res) => {
  if (!BEARER_TOKEN) {
    res.status(400).send(authMessage);
  }

  rp({
    uri: 'https://api.twitter.com/2/tweets/' + req.params.id,
    headers: reqHeaders,
    qs: {
      'tweet.fields': 'public_metrics,attachments,author_id,created_at,entities,source',
      'expansions': 'author_id,attachments.media_keys',
      'media.fields': 'url',
      'user.fields': 'profile_image_url'
    },
    json: true
  })
    .then(parsedBody => {
      var result = {
        text: parsedBody.data.text,
        user: parsedBody.includes.users,
        hashtags: parsedBody.data.entities.hashtags,
        postImage: parsedBody.includes.media,
        date: parsedBody.data.created_at,
        source: parsedBody.data.source,
        likeCount: parsedBody.data.public_metrics.like_count,
        commentCount: parsedBody.data.public_metrics.reply_count
      };


      if (res.statusCode !== 200) {
        if (res.statusCode === 403) {
          res.status(403).send(response.body);
        } else {
          throw new Error(res.body.error.message);
        }
      }
      res.send(result);
    })
    .catch(err => {
      res.send(err);
    });
});

const server = app.listen(3000, () => {
  const port = server.address().port

  console.log("App listening at Port", port)
});