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
                    <div class="swiper-container" style="display: flex; flex-wrap: nowrap">
                      <div v-for="(user, index) in users" :key="index" class="swiper-slide" :id="'influencer_' + index + '_0'" style="margin-right: 12px">
                        <div class="__follow-list-item">
                          <div class="__user-info">
                            <div class="profile">
                              <div class="profile-pic">
                                <img :src="user.imagePath || 'https://kr.object.ncloudstorage.com/ssg-starroad/ssg/user/profile/3d39940d-eca8-4b43-8720-014ca10af220_aW1hZ2U%3D.png'" height="42" width="42" alt="profile" class="img" />
                              </div>
                              <h4 class="name username">
                                <span class="txt">{{ user.nickname }}</span>
                              </h4>
                            </div>
                          </div>
                          <button type="button" :class="[
                            'btn',
                            user.followed ? 'btn-grey' : 'btn-orange',
                            'btn-rounded',
                          ]" @click="follow(user.nickname)">
                            <span class="label">{{ user.followed ? '팔로잉' : '팔로우' }}</span>
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
    </div>
    <div v-if="reviews === null" class="container">
      <div class="message">로딩 중...</div>
    </div>
    <div v-else-if="reviews.length === 0" class="container">
      <!-- <div class="message">데이터가 없습니다.</div> -->
    </div>
    <reviewcard v-for="(review, index) in reviews" :key="review.id" :review="review" :userEmail="userEmail" :users="users" :follow="follow" />
    <ReviewButton />
  </div>
</template>
<script>
import { getFollowingReview, fetchRankUser, addFollowUser } from '@/api/index';
import ReviewButton from '@/components/review/ReviewButton.vue';
import reviewcard from '@/components/review/ReviewCard.vue';
import { mapState, mapGetters } from 'vuex';
import { EventBus } from '@/eventBus';
export default {
  data() {
    return {
      reviews: [],
      currentPage: 0,
      pageSize: 10,
      hasNextPage: true,
      loading: false,
      users: [],
    };
  },
  computed: {
    ...mapState(['email']),
    ...mapGetters(['isLogin']),
    userEmail() {
      return this.email;
    },
  },
  components: {
    ReviewButton,
    reviewcard,
  },
  async created() {
    EventBus.emit('loading', true);
    try {
      await this.loadFollowingUser();
      await this.loadReviews();
    } catch (error) {
      console.error('Error fetching store review:', error);
    } finally {
      EventBus.emit('loading', false);
    }
  },
  async mounted() {
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
      if (scrollPosition + windowHeight >= documentHeight - 50) {
        this.loadMoreReviews();
      }
      this.showScrollToTopButton = scrollPosition > 300;
    },
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    async loadMoreReviews() {
      if (this.loading || !this.hasNextPage) return;
      this.loading = true;
      try {
        this.currentPage += 1;
        await this.loadReviews();
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
        }
      }
    },
    async loadFollowingUser() {
      try {
        const data = await fetchRankUser(this.userEmail);
        this.users = data.map(user => ({ ...user }));
      } catch (error) {
        console.error('사용자 목록을 불러오는 중 오류가 발생했습니다:', error);
        this.users = [];
      }
    },
    async loadReviews() {
      this.loading = true;
      try {
        const response = await getFollowingReview(this.userEmail, this.currentPage, this.pageSize);
        if (this.currentPage === 0) {
          this.reviews = response.reviews.map(review => ({
            ...review,
            showPrevButton: false,
            showNextButton: false,
          }));
        } else {
          this.reviews = [
            ...this.reviews,
            ...response.reviews.map(review => ({
              ...review,
              showPrevButton: false,
              showNextButton: false,
            }))
          ];
        }
        this.hasNextPage = response.hasNext;
        this.totalReviewCount = response.totalReviewCount || 0;
      } catch (error) {
        console.error('Error loading more reviews:', error);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
<style scoped>
@import '@/css/review/review.css';
.contents {
  width: 400px;
  margin: auto;
}
.btn-grey {
  background-color: grey;
  border-radius: 10px;
}
.btn-rounded {
  border-radius: 10px;
}
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
  text-align: center;
}
.message {
  font-size: 1.5em;
}
</style>