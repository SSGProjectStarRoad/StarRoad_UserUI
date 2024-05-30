<template>
  <div>
    <article class="timeline-post-item timeline-post-item-feed">
      <div class="timeline-header">
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
          <div v-if="showFollowButton">
            <button
              type="button"
              :class="['btn', isUserFollowed ? 'btn-grey' : 'btn-orange', 'btn-rounded']"
              @click="toggleFollow"
            >
              <span class="label">{{ isUserFollowed ? '팔로잉' : '팔로우' }}</span>
            </button>
          </div>
        </div>
      </div>
      <div class="timeline-gallery more" style="border-radius: 4px; position: relative">
        <swiper :options="swiperOptions" @slideChange="onSlideChange" @swiper="onSwiper" v-if="review.reviewImages.length">
          <swiper-slide v-for="(image, imgIndex) in review.reviewImages" :key="image.id">
            <div class="image-container">
              <img :src="image.imagePath" @error="setDefaultImage($event)" alt="" />
            </div>
          </swiper-slide>
          <div v-if="review.showPrevButton" class="swiper-button-prev" @click="slidePrev"></div>
          <div v-if="review.showNextButton" class="swiper-button-next" @click="slideNext"></div>
        </swiper>
      </div>
      <div class="timeline-post-content">
        <div class="__post-meta">
          <div class="rating-segment">
            <p class="ooezpq2 _1ltqxco1e" style="--ooezpq0: 4px; --ooezpq1: var(--_1ltqxcoa)"></p>
          </div>
          <div class="post-date">{{ formatRelativeDate(review.createDate) }}</div>
        </div>
        <div class="post-content">
          <div id="post-content1_2650757" v-html="highlightedContents"></div>
        </div>
        <div class="feedback-icons">
          <span v-for="(feedback, index) in review.reviewFeedbacks" :key="index" class="feedback">
            <img :src="getFeedbackImage(feedback.reviewFeedbackSelection)" class="emoji-icon" alt="" width="18" height="18" />
            {{ feedback.reviewFeedbackSelection }}
          </span>
        </div>
      </div>
      <div class="timeline-post-footer _10fm75h6 _10fm75hg _10fm75hj">
        <div class="__post-meta">
          <span :class="{ liked: review.liked }" @click="toggleLike" style="cursor: pointer">
            <img :src="review.liked ? require('@/img/imoji/heart-solid.svg') : require('@/img/imoji/heart-regular.svg')" alt="like" width="18" height="18" />&nbsp;
            {{ review.likeCount }}
          </span>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
import moment from 'moment';
import 'moment/locale/ko';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/swiper-bundle.css';
import SwiperCore, { Navigation, Pagination } from 'swiper';

SwiperCore.use([Navigation, Pagination]);

export default {
  name: 'reviewCard',
  props: {
    review: {
      type: Object,
      required: true,
    },
    selectedKeyword: {
      type: String,
      default: '',
    },
    likeReview: {
      type: Function,
      required: true,
    },
    userEmail: {
      type: String,
      required: true,
    },
    follow: {
      type: Function,
      required: true,
    },
    showFollowButton: {
      type: Boolean,
      default: true,
    }
  },
  data() {
    return {
      swiper: null,
      isUserFollowed: this.review.following,
      swiperOptions: {
        slidesPerView: 'auto',
        spaceBetween: 10,
        centeredSlides: true,
        loop: false,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        pagination: {
          clickable: true,
        },
      },
      feedbackImageMap: {
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
        '트랜디해요': require('@/img/imoji/오렌지하트.png'),
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
      },
    };
  },
  computed: {
    highlightedContents() {
      if (this.selectedKeyword) {
        const regex = new RegExp(`(${this.selectedKeyword})`, 'gi');
        return this.review.contents.replace(regex, '<span class="highlight">$1</span>');
      }
      return this.review.contents;
    },
  },
  methods: {
    async toggleFollow() {
      try {
        await this.follow(this.review.userNickname, this.userEmail);
        this.isUserFollowed = !this.isUserFollowed;
      } catch (error) {
        console.error('팔로우 상태 변경 중 오류가 발생했습니다:', error);
      }
    },
    getFeedbackImage(feedbackText) {
      return this.feedbackImageMap[feedbackText] || require('@/img/imoji/별눈얼굴.png');
    },
    formatRelativeDate(date) {
      moment.locale('ko');
      return moment(date).fromNow();
    },
    setDefaultImage(event) {
      event.target.src =
        'https://kr.object.ncloudstorage.com/ssg-starroad/ssg/user/profile/3d39940d-eca8-4b43-8720-014ca10af220_aW1hZ2U%3D.png';
    },
    onSwiper(swiper) {
      this.swiper = swiper;
      this.updateNavigationButtons(swiper);
    },
    onSlideChange(swiper) {
      this.updateNavigationButtons(swiper);
    },
    updateNavigationButtons(swiper) {
      this.review.showPrevButton = !swiper.isBeginning;
      this.review.showNextButton = !swiper.isEnd;
    },
    slidePrev() {
      if (this.swiper) {
        this.swiper.slidePrev();
      }
    },
    slideNext() {
      if (this.swiper) {
        this.swiper.slideNext();
      }
    },
    toggleLike() {
      const reviewId = this.review.id;
      const userEmail = this.userEmail;

      this.likeReview(reviewId, userEmail)
        .then(response => {
          const { liked, likeCount } = response.data;
          this.review.liked = liked;
          this.review.likeCount = likeCount;
          this.$emit('like-review', this.review);
        })
        .catch(error => {
          console.error('좋아요/취소 실패:', error);
        });
    },
  },
  components: {
    Swiper,
    SwiperSlide,
  },
};
</script>


<style>
@import '@/css/review/review.css';
@import '@/css/common.css';
.timeline-post-footer .__post-meta > span::before {
  content: none;
}
.timeline-post-footer .__post-meta > span {
  margin: 0;
  padding: 0;
}
.feedback-icons {
  display: flex;
  flex-wrap: wrap;
  gap: 8px; /* 아이콘과 텍스트 간격 조정 */
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

.image-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 200px;
  cursor: pointer;
}

.image-container img {
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
  border-radius: 8px;
}

.swiper-button-prev,
.swiper-button-next {
  color: #000;
  width: 20px;
  height: 20px;
  z-index: 10;
  cursor: pointer;
}

.swiper-button-prev {
  left: 10px;
}

.swiper-button-next {
  right: 10px;
}

/* New CSS for heart icon */
.__like.liked:before {
  background-image: url('@/img/review/heart-new.svg');
  background-size: cover;
}
.highlight {
  color: var(--mint-color) !important; /* 강조 표시 색상을 빨간색으로 설정 */
}
.btn{
  border-radius: 8px;
  
  
}
</style>
