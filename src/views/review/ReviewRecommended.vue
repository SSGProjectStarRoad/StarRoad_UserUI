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
    <div v-if="reviews === null">로딩 중...</div>
    <div v-else-if="reviews.length === 0">데이터가 없습니다.</div>
    <reviewcard :reviews="reviews" />
  </div>
  <ReviewButton />
</template>

<script>
import ReviewButton from "@/components/review/ReviewButton.vue";
import { getAllReview } from '@/api/index';
import reviewcard from '@/components/review/ReviewCard.vue';


export default {
  data() {
    return {
      reviews: [],
      currentPage: 0,
      pageSize: 10,
      hasNextPage: true,
      loading: false,
    }
  },
  async created() {
    try {
      const initialData = await getAllReview(this.currentPage, this.pageSize);
      if (initialData) {
        console.log('Initial data:', initialData); // 데이터를 콘솔에 출력하여 확인합니다.
        this.reviews = initialData;
        console.log("this.reviews : " + this.reviews);
        this.hasNextPage = initialData.hasNext;
        this.totalReviewCount = initialData.totalReviewCount || 0;
      }
    } catch (error) {
      console.error('Error fetching store review:', error);
    }
  },
  components: {
    ReviewButton,
    reviewcard,
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll() {
  const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;

  // 페이지 하단에서 300px 이내에 도달하면 추가 데이터 요청
  if (scrollPosition + windowHeight >= documentHeight - 300) {
    this.loadMoreReviews();
  }

  this.showScrollToTopButton = scrollPosition > 100;
},
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    },
    async loadMoreReviews() {
  if (this.loading || !this.hasNextPage) return;
  this.loading = true;
  const nextPage = this.currentPage + 1;

  try {
    const response = await getAllReview(nextPage, this.pageSize);
    if (response && response.reviews && Array.isArray(response.reviews)) {
      this.reviews = [...this.reviews, ...response.reviews];
      this.currentPage = nextPage;
      this.hasNextPage = response.hasNext;
    } else {
      console.error('Invalid response data:', response);
    }
  } catch (error) {
    console.error('Error loading more reviews:', error);
  } finally {
    this.loading = false;
  }
}
  },
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
