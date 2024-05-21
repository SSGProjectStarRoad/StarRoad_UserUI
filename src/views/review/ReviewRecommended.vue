<template>
  <div class="contents">
    <div class="tab-menu sticky" style="z-index: 11">
      <ul>
        <li class="tab-menu">
          <router-link to="/review/main"><span>팔로잉</span></router-link>
        </li>
        <li class="active">
          <a><span>추천</span></a>
        </li>
      </ul>
    </div>
    <div v-if="posts === null">로딩 중...</div>
    <div v-else-if="posts.length === 0">데이터가 없습니다.</div>
      <article class="timeline-post-item timeline-post-item-feed" v-for="(post, index) in posts" :key="index">
        <div class="card">
          <!-- 게시글 헤더 -->
          <div class="timeline-header">
            <div class="profile">
              <div class="profile-pic">
                <img height="42" width="42" src="../../img/review/profile_default_v2.png" alt="" class="img" />
              </div>
              <div class="__info">
                <span class="name username">{{ post.userNickname }}</span>
                <span class="userinfo">UserINFO</span>
              </div>
            </div>
            <button type="button" class="btn btn-orange btn-rounded">
              <span class="label">팔로우</span>
            </button>
          </div>

          <!-- 이미지 -->
          <div class="timeline-gallery more" style="border-radius: 4px">
            <div class="gallery" style="border-radius: 4px">
              <div class="gallery-in">
                <div class="imgbox">
                  <div class="imgin">
                    <img :src="post.imgSrc" alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 포스트 콘텐츠 -->
          <div class="timeline-post-content">
            <div class="post-content">
              <div :id="'post-content1_' + index" class="">
                {{ post.contents }}
              </div>
            </div>
            <div class="feedback-icons">
              <span class="feedback">
                <img src="https://ssl.pstatic.net/static/pup/emoji/face_savoring_food20220119222022.png"
                  class=" emoji-icon" alt="" width="18" height="18" />음식이 맛있어요
              </span>
              <span class="feedback">
                <img src="https://ssl.pstatic.net/static/pup/emoji/green_heart20220119222224.png" class=" emoji-icon"
                  alt="" width="18" height="18" />메뉴 구성이 알차요
              </span>
              <span class="feedback">
                <img src="https://ssl.pstatic.net/static/pup/emoji/couch_and_lamp20220119222025.png" class=" emoji-icon"
                  alt="" width="18" height="18" />인테리어가 멋져요
              </span>
              <span class="feedback">
                <img src="https://ssl.pstatic.net/static/pup/emoji/rice_ball20220119222026.png" class=" emoji-icon"
                  alt="" width="18" height="18" />혼밥하기 좋아요
              </span>
              <span class="feedback">
                <img src="https://ssl.pstatic.net/static/pup/emoji/light_bulb20220119222315.png" class=" emoji-icon"
                  alt="" width="18" height="18" />컨셉이 독특해요
              </span>
            </div>

            <!-- 레스토랑 정보 -->
            <div class="restaurant-info">
              <img
                src="https://image.toast.com/aaaaaqx/catchtable/shopinfo/s3cSNdEyRL50KeKUYvOAJug/3csndeyrl50kekuyvoajug_2371115245089616_thumbMenuImage.jpg?small220"
                alt="" class="thumb" style="
                background: url('data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7')
                  center center no-repeat transparent;
              " />
              <div class="__info">
                <h4 class="__name"><span>{{ post.restaurantName }}</span></h4>

              </div>
              <img src="../../img/review/arrow_left_black.svg" alt="" style="
                background: url('data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7')
                  center center no-repeat transparent;
              " />
            </div>
          </div>
          <div class="timeline-post-footer _10fm75h6 _10fm75hg _10fm75hj">
            <div class="__post-meta">
              <span class="__like la3t9m0" style="transform: none">0</span>

            </div>
            <div class="__post-meta">
              <div class="post-date">{{ post.createDate }}</div>
            </div>
          </div>
        </div>
        <div style="height: 40px"></div>

      </article>
    </div>
    <ReviewButton />
</template>

<script>
import ReviewButton from "@/components/review/ReviewButton.vue";
import { getAllReview } from '@/api/index';

export default {
  data() {
    return {
      posts: null,
    }
  },
  components: {
    ReviewButton,
  },
  methods: {
    async getAllReview() {
      try {
        const post = await getAllReview();
        this.posts = post.data;
        console.log('리뷰 로드 성공:', this.posts);
      } catch (error) { // try 블록 내에서 발생하는 예외를 캐치합니다.
        console.error('리뷰 로드 실패:', error);
      }
    },
  },
  async mounted() {
    await this.getAllReview();
  }
};
</script>

<style>
@import '@/css/review/review.css';

.contents {
  width: 400px;
  margin: auto;
  /* padding-bottom: 120px; */
}
</style>
