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

    <div v-if="reviews === null" class="container">
      <div class="message">로딩 중...</div>
    </div>
    <div v-else-if="reviews.length === 0" class="container">
      <div class="message">데이터가 없습니다.</div>
    </div>
    <reviewcard
      :reviews="reviews"
      :userEmail="userEmail"
      :users="users"
      :follow="follow"
    />
  </div>
  <ReviewButton />
</template>

<script>
import { getAllReview, addFollowUser, fetchAllUser } from '@/api/index';
import ReviewButton from "@/components/review/ReviewButton.vue";
import reviewcard from '@/components/review/ReviewCard.vue';
import { mapState, mapGetters } from 'vuex';


export default {
  data() {
    return {
      reviews: [],
      currentPage: 0,
      pageSize: 10,
      hasNextPage: true,
      loading: false,
      users: [],
    }
  },
  async created() {
    try {
      this.loadAllUser();
      const initialData = await getAllReview(this.userEmail, this.currentPage, this.pageSize);
      if (initialData) {
        console.log('Initial data:', initialData); // 데이터를 콘솔에 출력하여 확인합니다.
        this.reviews = initialData.reviews;
        console.log("this.reviews : " + this.reviews);
        this.hasNextPage = initialData.hasNext;
        console.log("created - this.hasNextPage : " + this.hasNextPage);
        this.totalReviewCount = initialData.totalReviewCount || 0;
      }
    } catch (error) {
      console.error('Error fetching store review:', error);
    }
  },
  computed: {
    ...mapState(['email']),
    ...mapGetters(['isLogin']),
    userEmail() {
      return this.email; // Vuex 스토어의 email을 userEmailComputed로 매핑합니다.
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

      // 페이지 하단에서 100px 이내에 도달하면 추가 데이터 요청
      if (scrollPosition + windowHeight >= documentHeight - 100) {
        this.loadMoreReviews();
        console.log("locadMoreReviews 호출");
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
      console.log("this.loading : " + this.loading);
      console.log("!this.hasNextPage : " + !this.hasNextPage);
      if (this.loading || !this.hasNextPage) {
        console.log("loadMoreReviews 리턴");
        return;
      }
      console.log("loadMoreReviews 통과");
      this.loading = true;
      const nextPage = this.currentPage + 1;

      try {
        const response = await getAllReview(nextPage, this.pageSize);
        if (response && response.reviews) {
          console.log("this revies : " + this.reviews);
          console.log("loadMoreRevies response: " + response);
          console.log("loadMoreRevies response.reviews: " + response.reviews);
          this.reviews = [...this.reviews, ...response.reviews];
          console.log("more Reviews : " + this.reviews);
          this.currentPage = nextPage;
          console.log("currentPage : " + this.currentPage);
          this.hasNextPage = response.hasNext;
          console.log("hasNextPage : " + this.hasNextPage);
        } else {
          console.error('Invalid response data:', response);
        }
      } catch (error) {
        console.error('Error loading more reviews:', error);
      } finally {
        this.loading = false;
      }
    },
    async follow(username) {
      const user = this.users.find(user => user.nickname === username);
      if (user) {
        const data = await addFollowUser(username, this.userEmail);
        if (data.status === 200) {
          user.followed = !user.followed;
          console.log(username + '님을 팔로우했습니다: ' + (user.followed ? 'true' : 'false'));
        }
      }
    },
    async loadAllUser() {
      try {
        const data = await fetchAllUser(this.userEmail);
        this.users = data.map(user => ({
          ...user,
        }));
      } catch (error) {
        console.error("사용자 목록을 불러오는 중 오류가 발생했습니다:", error);
        this.users = [];
      }
    },
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

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
  /* 화면 전체 높이 */
  text-align: center;
  /* 텍스트 중앙 정렬 */
}

.message {
  font-size: 1.5em;
  /* 글자 크기 조정 */
}
</style>
