<template>
  <div class="contents">
    <div class="review-main">My Review</div>
    <div class="review-sub">나의 리뷰 게시물을 확인하세요!</div>

    <div class="myreviews">
      <reviewCard
        :reviews="storeReview.reviews"
        :userEmail="email"
        :showFollowButton="false"
        @likeReview="handleLikeReview"
      />
    </div>
  </div>
</template>

<script>
import { getMyReview, likeReview } from '@/api/index';
import { mapState, mapGetters } from 'vuex';
import reviewCard from '@/components/review/ReviewCard.vue';

export default {
  name: 'MyReviewPage',
  components: {
    reviewCard,
  },
  data() {
    return {
      storeReview: {
        reviews: [],
        pageNumber: 0,
        pageSize: 10,
        hasNext: false,
      },
      loading: false,
    };
  },
  async created() {
    await this.fetchReviews();
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  computed: {
    ...mapState(['email']),
    ...mapGetters(['isLogin']),
  },
  methods: {
    async fetchReviews() {
      try {
        this.loading = true;
        const ReviewData = await getMyReview(
          this.email,
          this.storeReview.pageNumber,
          this.storeReview.pageSize,
        );
        if (ReviewData) {
          this.storeReview.reviews = [
            ...this.storeReview.reviews,
            ...ReviewData.reviews,
          ];
          this.storeReview.hasNext = ReviewData.hasNext;
        }
      } catch (error) {
        console.error('리뷰를 가져오는데 실패했습니다:', error);
      } finally {
        this.loading = false;
      }
    },
    async loadMoreReviews() {
      if (this.loading || !this.storeReview.hasNext) return;
      this.storeReview.pageNumber += 1;
      await this.fetchReviews();
    },
    handleScroll() {
      const scrollPosition =
        window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      if (scrollPosition + windowHeight >= documentHeight - 100) {
        this.loadMoreReviews();
      }
    },
    async handleLikeReview(reviewId) {
      try {
        await likeReview(reviewId, this.email);
        const reviewIndex = this.storeReview.reviews.findIndex(
          r => r.id === reviewId,
        );
        if (reviewIndex !== -1) {
          this.storeReview.reviews[reviewIndex].liked =
            !this.storeReview.reviews[reviewIndex].liked;
        }
      } catch (error) {
        console.error('좋아요 실패:', error);
      }
    },
  },
};
</script>

<style scoped>
.review-main {
  text-align: center;
  font-size: 30px;
  font-weight: 700;
}
.review-sub {
  font-size: 12px;
  color: var(--dgray-color);
  text-align: center;
  margin-top: 5px;
}
</style>
