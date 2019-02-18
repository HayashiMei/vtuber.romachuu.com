const fs = require('fs');
const path = require('path');
const axios = require('axios');
const { stringify } = require('querystring');

const channels = require('./vtuber');
const config = require('./config.json');

const http = axios.create();

let i = 0;

let result = [],
  errors = [];

const search = async () => {
  http
    .get(
      'https://content.googleapis.com/youtube/v3/channels?' +
        stringify({
          part: 'snippet,statistics',
          id: channels[i],
          key: 'AIzaSyDdfJyUj5wv7XozRu8AmzzV3kd0Kju9s5g',
        })
    )
    .then(res => {
      i++;

      const channelData = res.data.items[0];

      if (channelData) {
        const { snippet, statistics, id } = channelData;

        const output = {
          id,
          title: snippet.title,
          thumbnail: snippet.thumbnails.medium.url,
          subscriberCount: +statistics.subscriberCount,
          viewCount: +statistics.viewCount,
          videoCount: +statistics.videoCount,
        };

        // console.info(`${i}/${channels.length}`, output);
        result.push(output);
      }

      if (i < channels.length) {
        search();
      } else {
        const data = {
          updateTime: new Date().getTime(),
          channels: result.sort((a, b) => b.subscriberCount - a.subscriberCount),
        };

        fs.writeFileSync(path.resolve(__dirname, config.dataPath), JSON.stringify(data));
        result = [];
        errors = [];
        i = 0;
      }
    })
    .catch(e => {
      errors.push(channels[i]);
      i++;
      return Promise.reject(e);
    });
};

module.exports = {
  search,
};
