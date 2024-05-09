<template>
  <div class="contents">
    <div class="tab-menu sticky" style="z-index: 11">
      <ul>
        <a role="button" class="back-button">
          <img src="@/img/back_arrow.png" />
        </a>
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

    <TimelinePost />

    <ReviewButton />
  </div>
</template>

<script>
import ReviewButton from "@/components/review/ReviewButton.vue";
import TimelinePost from "@/components/review/TimelinePost.vue";

export default {
  components: {
    ReviewButton,
    TimelinePost,
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
