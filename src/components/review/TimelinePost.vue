<template>
  <div>
    <article
      class="timeline-post-item timeline-post-item-feed"
      v-for="review in reviews"
      :key="review.id"
    >
      <div class="card">
        <!-- 각 리뷰 아이템의 내용을 표시 -->
        <div class="timeline-header">
          <div class="profile">
            <div class="profile-pic">
              <img
                :src="review.profilePic"
                height="42"
                width="42"
                alt=""
                class="img"
              />
            </div>
            <div class="__info">
              <span class="name username">{{ review.username }}</span>
              <span class="userinfo">{{ review.userInfo }}</span>
            </div>
          </div>
        </div>
        <!-- 생략 -->
      </div>
    </article>
  </div>
</template>

<script>
import data from './data.js';
import { getAllReview } from '@/api/index';

export default {
  name: 'reviewcard',
  data() {
    return {
      reviews: [],
    };
  },
  created() {
    this.getAllReview(); // 컴포넌트가 생성되었을 때 리뷰 데이터를 가져옵니다.
  },
  computed: {
    sortedReviews() {
      // Sort reviews by createdAt in descending order (recent dates first)
      return this.reviews.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
      );
    },
  },
  methods: {
    async getAllReview() {
      try {
        this.reviews = await getAllReview();
        console.log('리뷰 로드 성공:', this.reviews);
      } catch (error) {
        // try 블록 내에서 발생하는 예외를 캐치합니다.
        console.error('리뷰 로드 실패:', error);
      }
    },
    filterReviews(user) {
      this.reviews = this.reviews.filter(review => review.user === user);
    },
  },
};
</script>

<style></style>
