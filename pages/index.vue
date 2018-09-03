<template>
  <div>
    <header class="yt-header">
      <h1>YouTube Trends History</h1>
      <el-date-picker
        class="yt-el-date-picker"
        v-model="value1"
        type="datetime"
        format="yyyy-MM-dd HH:mm"
        placeholder="Select date and time" v-on:change="update">
      </el-date-picker>
      <a href="https://github.com/GitHub30/youtube-trends" target="_blank"
         style="color: black; text-decoration: none; padding: 8px; border: 2px solid; border-radius: 2px;margin-right: 16px;">GitHub</a>
    </header>
    <section class="container">
      <a class="video-renderer" v-for="video in videos" :key="video.id"
         :href="'https://www.youtube.com/watch?v=' + video.id" target="_blank">
        <img class="video-renderer--img" :src="video.snippet.thumbnails.high.url" width="256px"
             height="144px">
        <div class="video-renderer--info">
          <h2 class="video-renderer--h2">{{ video.snippet.title }}</h2>
          <div class="video-renderer--statistics">
            <a class="video-renderer--statistics--a"
               :href="'https://www.youtube.com/channel/' + video.snippet.channelId"
               target="_blank">{{ video.snippet.channelTitle }}</a>
            <p class="video-renderer--statistics--p">視聴回数 {{ video.statistics.viewCount | toJPUnit }}回・{{
              video.snippet.publishedAt | formatRemainDate }}</p>
          </div>
          <p class="video-renderer--description">{{ video.snippet.description }}</p>
        </div>
      </a>
    </section>
  </div>
</template>
<script>
  import AppLogo from '~/components/AppLogo.vue'

  export default {
    created() {
      if (process.browser) {
        window.getTrending = items => this.videos = items;
        const script = document.createElement('script');
        script.src = 'https://script.google.com/macros/s/AKfycbyskzNPIDvHA8099w7AUcVZl0QJoHM9zkOqTvZViRpb_Cs1PbuR/exec?callback=getTrending';
        document.head.appendChild(script);
      }
    },
    data() {
      return {
        videos: [],
        value1: ''
      }
    },
    components: {
      AppLogo
    },
    filters: {
      toJPUnit(num) {
        let str = num.toString();
        let n = "";
        let count = 0;
        let ptr = 0;
        let kName = ["万", "億", "兆", "京", "垓", "杼", "穰", "溝", "澗", "正", "載", "極", "恒河沙", "阿僧祇", "那由他", "不可思議", "無量大数"];
        for (let i = str.length - 1; i >= 0; i--) {
          n = str.charAt(i) + n;
          count++;
          if (((count % 4) === 0) && (i !== 0)) n = kName[ptr++] + n;
        }
        return n;
      },
      formatRemainDate(datetime) {
        return new Date(datetime).toLocaleString();
      }
    },
    methods: {
      update() {
        if (!this.value1) return;
        if (process.browser) {
          window.getTrending = items => this.videos = items;
          const script = document.createElement('script');
          const fileName = this.value1.toISOString().slice(0, 16) + '.json.gz';
          script.src = 'https://script.google.com/macros/s/AKfycbyskzNPIDvHA8099w7AUcVZl0QJoHM9zkOqTvZViRpb_Cs1PbuR/exec?callback=getTrending&fileName=' + fileName;
          document.head.appendChild(script);
        }
      }
    }
  }
</script>

<style>
  .yt-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    background: #f90001;
  }

  h1 {
    width: 100px;
    white-space: nowrap;
  }

  .yt-el-date-picker .el-input__inner {
    width: 256px;
  }

  .container {
    display: flex;
    max-width: 960px;
    min-height: 100vh;
    flex-direction: column;
  }

  .title {
    font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
    display: block;
    font-weight: 300;
    font-size: 100px;
    color: #35495e;
    letter-spacing: 1px;
  }

  .subtitle {
    font-weight: 300;
    font-size: 42px;
    color: #526488;
    word-spacing: 5px;
    padding-bottom: 15px;
  }

  .links {
    padding-top: 15px;
  }

  .video-renderer {
    display: flex;
    flex-direction: row;
    margin-bottom: 16px;
    text-decoration: none;
    color: black;
  }

  .video-renderer--img {
    object-fit: cover;
    min-width: 256px;
    min-height: 144px;
  }

  .video-renderer--info {
    padding: 0 8px;
    text-align: left;
  }

  .video-renderer--h2 {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
    font-size: 20px;
  }

  .video-renderer--statistics--a {
    text-decoration: none;
    margin-right: 8px;
    color: black;
  }

  .video-renderer--statistics {
    display: flex;
    flex-direction: row;
    margin: 4px 0;
  }

  .video-renderer--statistics--p {
    margin: 0;
  }

  .video-renderer--description {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
    margin: 0;
  }
</style>
