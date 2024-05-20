
<template>
  <div>
    <article v-for="(review, index) in storeReview.reviews" :key="index" class="timeline-post-item timeline-post-item-feed">
      <!-- 게시글 -->
      <div class="timeline-header">
        <!-- 게시글 헤더 -->
        <div class="profile">
          <div class="profile-pic">
            <img :src="review.imagePath || 'https://kr.object.ncloudstorage.com/ssg-starroad/ssg/user/profile/3d39940d-eca8-4b43-8720-014ca10af220_aW1hZ2U%3D.png'" height="42" width="42" alt="" class="img" />
          </div>
          <div class="__info">
            <span class="name username">{{ review.userNickname }}</span>
            <span class="userinfo"> 리뷰 수 {{ review.reviewcount }} </span>
          </div>
        </div>
      </div>
      <div class="timeline-gallery more" style="border-radius: 4px">
        <div class="gallery" style="border-radius: 4px">
          <div class="imgin">
            <!-- Loop through reviewImages to display all images -->
            <img v-for="image in review.reviewImages" :key="image.id" :src="image.imagePath" @error="setDefaultImage($event)" alt="" />
          </div>
        </div>
      </div>
      <div class="timeline-post-content">
        <div class="__post-meta">
          <div class="rating-segment">
            <p class="ooezpq2 _1ltqxco1e" style="--ooezpq0: 4px; --ooezpq1: var(--_1ltqxcoa)"></p>
          </div>
          <div class="post-date">{{ formatRelativeDate(review.createDate) }}</div>
        </div>
        <!-- <h3 class="post-title">{{ review.summary }}</h3> -->
        <div class="post-content">
          <div id="post-content1_2650757">{{ review.contents }}</div>
        </div>
        <div class="feedback-icons">
          <span v-for="(feedback, index) in review.reviewFeedbacks" :key="index" class="feedback">
            <img :src="feedback.emoji" class="emoji-icon" alt="" width="18" height="18" />{{ feedback.reviewFeedbackSelection }}
          </span>
        </div>
      </div>
      <div class="timeline-post-footer _10fm75h6 _10fm75hg _10fm75hj">
        <div class="__post-meta">
          <span class="__like la3t9m0" style="transform: none">{{ review.likeCount }}</span>
        </div>
        <div class="_1vfgwok0">
          <button type="button" class="_1vfgwok1">
            <span class="_1e99eu30">MORE</span>
          </button>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
import moment from 'moment';
import 'moment/locale/ko';

export default {
  name: 'ReviewCard',
  props: {
    storeReview: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    formatRelativeDate(date) {
    moment.locale('ko');
    return moment(date).fromNow();
  },
    setDefaultImage(event) {
      event.target.src = 'https://kr.object.ncloudstorage.com/ssg-starroad/ssg/user/profile/3d39940d-eca8-4b43-8720-014ca10af220_aW1hZ2U%3D.png';
    }
  }
};
</script>

<style>
@import '@/css/review/review.css';
/* 공통 CSS 파일을 가져옵니다. */
</style>