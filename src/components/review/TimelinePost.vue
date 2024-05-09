<template>
  <article class="timeline-post-item timeline-post-item-feed">
    <div class="card">
      <!-- 게시글 -->
      <div class="timeline-header">
        <!-- 게시글 헤더 -->
        <div class="profile">
          <div class="profile-pic">
            <img :src="postData.profilePic" height="42" width="42" alt="" class="img" />
          </div>
          <div class="__info">
            <span class="name username">{{ postData.username }}</span>
            <span class="userinfo">{{ postData.userInfo }}</span>
          </div>
        </div>
      </div>

      <div class="timeline-gallery more" style="border-radius: 4px">
        <div class="gallery" style="border-radius: 4px">
          <div class="gallery-in">
            <div class="imgbox">
              <div class="imgin">
                <img :src="postData.galleryImage" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="timeline-post-content">
        <div class="__post-meta">
          <div class="rating-segment">
            <p class="ooezpq2 _1ltqxco1e" style="--ooezpq0: 4px; --ooezpq1: var(--_1ltqxcoa)"></p>
          </div>
          <div class="post-date">1일 전</div>
        </div>
        <h3 class="post-title"></h3>
        <div class="post-content">
          <div id="post-content1_2650757" class="">{{ postData.postContent }}</div>
        </div>

        <div class="feedback-icons">
          <span v-for="(feedback, index) in postData.feedback" :key="index" class="feedback">
            <img :src="feedback.emoji" class="emoji-icon" alt="" width="18" height="18" />{{ feedback.text }}
          </span>
        </div>

        <div class="restaurant-info">
          <img :src="postData.restaurantInfo.thumb" alt="" class="thumb" />
          <div class="__info">
            <h4 class="__name"><span>{{ postData.restaurantInfo.name }}</span></h4>
            <div class="__meta">{{ postData.restaurantInfo.meta }}</div>
          </div>
          <img src="../../img/review/arrow_left_black.svg" alt="" />
        </div>
      </div>

      <div class="timeline-post-footer _10fm75h6 _10fm75hg _10fm75hj">
        <div class="__post-meta">
          <span class="__like la3t9m0" style="transform: none">0</span>
        </div>
        <div class="_1vfgwok0">
          <button type="button" class="_1vfgwok1">
            <span class="_1e99eu30">MORE</span>
          </button>
        </div>
      </div>
    </div>
    <!-- <div style="height: 100px"></div> -->
  </article>
</template>

<script>
import data from './data.js';

export default {
  data() {
    const postData = data.timelinePost;
    console.log('postData:', postData); // 데이터를 콘솔에 출력합니다.
    return {
      postData,
    };
  }
};
</script>

<style>

</style>
