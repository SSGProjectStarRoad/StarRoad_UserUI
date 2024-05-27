<template>
  <div class="contents">
    <div class="tab-menu sticky" style="z-index: 11">
      <ul>
        <li class="active">
          <a><span>팔로잉</span></a>
        </li>
        <li class="tab-menu">
          <router-link to="/review/recommended"><span>추천</span></router-link>
        </li>
      </ul>
    </div>

    <div>
      <div class="timeline-post-item timeline-recom-follow" id="influencerList_0">
        <div class="__follow-list">
          <div class="swiper">
            <div class="swiper-wrapper">
              <div class="v-scroll">
                <div class="v-scroll-inner">
                  <div class="" style="display: flex; flex-wrap: nowrap">
                    <div class="swiper-slide" id="influencser_0_0" style="margin-right: 12px">
                      <div class="__follow-list-item">
                        <div class="__user-info">
                          <div class="profile">
                            <div class="profile-pic">
                              <img height="42" width="42" src="../../img/review/profile_default_v2.png" alt=""
                                class="img" />
                            </div>
                            <h4 class="name username">
                              <span class="txt">펭귄은정어리를사랑해</span>
                            </h4>
                          </div>
                        </div>
                        <button type="button" class="btn btn-orange btn-rounded">
                          <span class="label">팔로우</span>
                        </button>
                      </div>
                    </div>
                    <div class="swiper-slide" id="influencser_1_0" style="margin-right: 12px">
                      <div class="__follow-list-item">
                        <div class="__user-info">
                          <div class="profile">
                            <div class="profile-pic">
                              <img height="42" width="42" src="../../img/review/profile_default_v2.png" alt=""
                                class="img" />
                            </div>
                            <h4 class="name username">
                              <span class="txt">미식가빵야빵야</span>
                            </h4>
                          </div>
                        </div>
                        <button type="button" class="btn btn-orange btn-rounded">
                          <span class="label">팔로우</span>
                        </button>
                      </div>
                    </div>
                    <div class="swiper-slide" id="influencser_2_0" style="margin-right: 12px">
                      <div class="__follow-list-item">
                        <div class="__user-info">
                          <div class="profile">
                            <div class="profile-pic">
                              <img height="42" width="42" src="../../img/review/profile_default_v2.png" alt=""
                                class="img" />
                            </div>
                            <h4 class="name username">
                              <span class="txt">ghostcrp</span>
                            </h4>
                          </div>
                        </div>
                        <button type="button" class="btn btn-orange btn-rounded">
                          <span class="label">팔로우</span>
                        </button>
                      </div>
                    </div>
                    <div class="swiper-slide" id="influencser_3_0">
                      <div class="__follow-list-item">
                        <div class="__user-info">
                          <div class="profile">
                            <div class="profile-pic">
                              <img height="42" width="42" src="../../img/review/profile_default_v2.png" alt=""
                                class="img" />
                            </div>
                            <h4 class="name username">
                              <span class="txt">kimdahn ee</span>
                            </h4>
                          </div>
                        </div>
                        <button type="button" class="btn btn-orange btn-rounded">
                          <span class="label">팔로우</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="reviews === null">로딩 중...</div>
    <div v-else-if="reviews.length === 0">데이터가 없습니다.</div>
    <reviewcard :reviews="reviews"
    :userEmail="userEmail"
    />

    <ReviewButton />
  </div>
</template>

<script>
import { getFollowingReview, fetchUserData } from '@/api/index';
import ReviewButton from "@/components/review/ReviewButton.vue";
import reviewcard from '@/components/review/ReviewCard.vue';
import { mapState, mapGetters } from 'vuex';

export default {
  data() {
    return {
      id: 1,
      reviews: [],
      currentPage: 0,
      pageSize: 10,
      hasNextPage: true,
      loading: false,
      userEmail: 'ekmbjh@naver.com',
    }
  },
  computed: {
    ...mapState(['email']),
    ...mapGetters(['isLogin']),
    userEmailComputed() {
      return this.email; // Vuex 스토어의 email을 userEmailComputed로 매핑합니다.
    }
  },
  components: {
    ReviewButton,
    reviewcard,
  },
  async created() {
    try {
      const initialData = await getFollowingReview(this.userEmail, this.currentPage, this.pageSize);
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
        const response = await getFollowingReview(this.id, nextPage, this.pageSize);
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
    }
  },

};
</script>

<style scoped>
@import '@/css/review/review.css';

.contents {
  width: 400px;
  margin: auto;
}
</style>
