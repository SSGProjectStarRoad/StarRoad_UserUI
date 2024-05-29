<template>
  <div>
    <article
      v-for="(review, index) in reviews"
      :key="index"
      class="timeline-post-item timeline-post-item-feed"
    >
      <!-- 게시글 -->
      <div class="timeline-header">
        <!-- 게시글 헤더 -->
        <div class="profile">
          <div class="profile-pic">
            <img
              :src="
                review.imagePath ||
                'https://kr.object.ncloudstorage.com/ssg-starroad/ssg/user/profile/3d39940d-eca8-4b43-8720-014ca10af220_aW1hZ2U%3D.png'
              "
              height="42"
              width="42"
              alt=""
              class="img"
            />
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

            <img
              v-for="image in review.reviewImages"
              :key="image.id"
              :src="image.imagePath"
              @error="setDefaultImage($event)"
              alt=""
            />
          </div>
        </div>
      </div>
      <div class="timeline-post-content">
        <div class="__post-meta">
          <div class="rating-segment">
            <p
              class="ooezpq2 _1ltqxco1e"
              style="--ooezpq0: 4px; --ooezpq1: var(--_1ltqxcoa)"
            ></p>
          </div>
          <div class="post-date">
            {{ formatRelativeDate(review.createDate) }}
          </div>
        </div>
        <!-- <h3 class="post-title">{{ review.summary }}</h3> -->
        <div class="post-content">
          <div id="post-content1_2650757">{{ review.contents }}</div>
        </div>
        <div class="feedback-icons">
          <span
            v-for="(feedback, index) in review.reviewFeedbacks"
            :key="index"
            class="feedback"
          >
            <img
              :src="getFeedbackImage(feedback.reviewFeedbackSelection)"
              class="emoji-icon"
              alt=""
              width="18"
              height="18"
            />
            {{ feedback.reviewFeedbackSelection }}
          </span>
        </div>
      </div>
      <div class="timeline-post-footer _10fm75h6 _10fm75hg _10fm75hj">
        <div class="__post-meta">
          <span
            :class="{ liked: review.liked }"
            @click="toggleLike(review, index)"
            style="cursor: pointer"
          >
            <img
              :src="
                review.liked
                  ? require('@/img/imoji/heart-solid.svg')
                  : require('@/img/imoji/heart-regular.svg')
              "
              alt="like"
              width="18"
              height="18"
            />
            {{ review.likeCount }}
          </span>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
import moment from 'moment';
import { likeReview } from '@/api/index.js';

export default {
  name: 'ReviewCard',
  props: {
    reviews: {
      type: Array,

      default: () => [],
    },
    userEmail: {
      type: String,
      required: true,
    },
  },
  async created() {
    this.feedbackImageMap = await this.fetchFeedbackImageMap();
  },
  methods: {
    formatRelativeDate(date) {
      return moment(date).fromNow();
    },
    setDefaultImage(event) {
      event.target.src =
        'https://kr.object.ncloudstorage.com/ssg-starroad/ssg/user/profile/3d39940d-eca8-4b43-8720-014ca10af220_aW1hZ2U%3D.png';
    },
    async fetchFeedbackImageMap() {
      return {
        '재방문 하고싶어요': require('@/img/imoji/박수.png'),
        '매장이 넓어요': require('@/img/imoji/별.png'),
        '제품이 신선해요': require('@/img/imoji/신선.png'),
        '가격이 합리적입니다': require('@/img/imoji/가격.png'),
        '웨이팅시간이 짧았어요': require('@/img/imoji/대기.png'),
        '신상품이 많아요': require('@/img/imoji/신상.png'),
        '가성비가 좋아요': require('@/img/imoji/가성비.png'),
        '서비스가 마음에 들어요': require('@/img/imoji/파란하트.png'),
        '매장이 청결합니다': require('@/img/imoji/청결.png'),
        '스타일 추천을 잘해줘요': require('@/img/imoji/스타일.png'),
        '음식이 맛있습니다': require('@/img/imoji/도넛.png'),
        '음식이 빨리나와요': require('@/img/imoji/음식빠름.png'),
        '종류가 다양해요': require('@/img/imoji/하트와리본.png'),
        '시설이 청결했습니다': require('@/img/imoji/청결.png'),
        '재료가 신선해요': require('@/img/imoji/하트장식.png'),
        트랜디해요: require('@/img/imoji/오렌지하트.png'),
        '재고가 충분해요': require('@/img/imoji/재고.png'),
        '품질이 좋아요': require('@/img/imoji/반짝임.png'),
        '시간이 금방가요': require('@/img/imoji/시계.png'),
        '볼거리가 많아요': require('@/img/imoji/볼거리춤.png'),
        '남녀노소 즐기기 좋아요': require('@/img/imoji/별눈얼굴.png'),
        '주차하기 편해요': require('@/img/imoji/자동차.png'),
        '시설이 깔끔해요': require('@/img/imoji/청결.png'),
        '가격이 적절해요': require('@/img/imoji/가격.png'),
        '상품이 다양해요': require('@/img/imoji/오렌지하트.png'),
        '행사 상품이 다양해요': require('@/img/imoji/파란하트.png'),
        '매장이 넓어요': require('@/img/imoji/별눈얼굴.png'),
        '특색 있는 제품이 많아요': require('@/img/imoji/더블하트.png'),
        'A/S가 세심해요': require('@/img/imoji/AS.png'),
        '아이들이 좋아해요': require('@/img/imoji/키즈.png'),
        '다양한 상품구색': require('@/img/imoji/반짝임.png'),
      };
    },
    getFeedbackImage(feedbackText) {
      if (!feedbackText) {
        console.error('Invalid feedback text:', feedbackText);
        return require('@/img/imoji/별눈얼굴.png');
      }
      return (
        this.feedbackImageMap[feedbackText] ||
        require('@/img/imoji/별눈얼굴.png')
      );
    },
    toggleLike(review, index) {
      const reviewId = review.id;
      const userEmail = this.userEmail;

      likeReview(reviewId, userEmail)
        .then(response => {
          const { liked, likeCount } = response.data;
          review.liked = liked;
          review.likeCount = likeCount;
        })
        .catch(error => {
          console.error('좋아요/취소 실패:', error);
        });
    },
  },
};
</script>

<style>
@import '@/css/review/review.css';

.feedback-icons {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  /* 아이콘과 텍스트 간격 조정 */
}

.feedback {
  display: flex;
  align-items: center;
  background-color: #f5f5f5;
  border-radius: 8px;
  padding: 4px 8px;
}

.emoji-icon {
  vertical-align: middle;
  margin-right: 4px;
}
</style>
