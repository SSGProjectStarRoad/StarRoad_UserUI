<template>
    <div class="contents">
        <div id="__next">
            <div class="date-info-wrapper">
                <div class="visit-info-container">
                    <div class="visit-date-message">
                        <em>{{ selectedDate }} 금요일</em>에<br><em>{{ shopName }}</em>에 다녀오셨네요!
                    </div>
                    <div class="date-time-picker-container">
                        <div class="date-time-container">

                            <!-- DateModal 컴포넌트 적용 -->
                            <DateModal :isVisible="showDateModal" @update:isVisible="showDateModal = $event"
                                @dateSelected="handleDateSelected"></DateModal>
                            <label for="datepicker" class="input-label input-label-inner">
                                <span class="date-time-display">
                                    <span class="place_blind">방문일</span>
                                    {{ selectedDate }} <!-- 수정된 부분 -->
                                    <span class="place_blind">요일</span>
                                </span>
                            </label>
                            <!-- 날짜 선택 버튼 추가 -->
                            <button class="button-base" @click="showDateModal = true">날짜 수정</button>
                        </div>

                        <div class="date-time-container">
                            <!-- TimeModal 컴포넌트 적용 -->
                            <TimeModal :isVisible="showTimeModal" @update:isVisible="showTimeModal = $event"
                                @timeSelected="handleTimeSelected"></TimeModal>
                            <label for="timepicker" class="input-label input-label-inner">
                                <!-- 시간 표시 -->
                                <span class="date-time-display">
                                    <span class="place_blind">방문시간</span>
                                    <time aria-hidden="true">{{ selectedTime }}</time> <!-- 수정된 부분 -->
                                    <span class="place_blind">Invalid Date</span>
                                </span>
                            </label>
                            <!-- 시간 선택 버튼 추가 -->
                            <button class="button-base" @click="showTimeModal = true">시간 수정</button>
                        </div>
                    </div>
                    <div class="confirmation-message">방문하신 날짜와 시간을 확인해 주세요.</div>
                    <div class="location-info-section">
                        <div class="map-image-container">
                            <img src="https://simg.pstatic.net/static.map/v2/map/staticmap.bin?caller=myPlace&amp;scale=2&amp;w=384&amp;h=149&amp;markers=type:d|size:mid|pos:126.9570268 37.4798919|viewSizeRatio:0.5|color:0x029DFF&amp;logo=false&amp;center=126.9570268 37.4798919&amp;level=13"
                                class="image-container map-image" width="100%" height="149" alt=""
                                style="opacity: 1; transition: opacity 0.3s ease-in 0s;">
                        </div>
                        <div class="check-info-container">
                            <div class="check-name-category">
                                <span class="place-name">{{ shopName }}</span>
                            </div>
                            <div class="address-line">서울특별시 관악구 남부순환로 1861 1층 103호</div>
                            <div class="address-line detailed-address">
                                <span class="address-label">지번</span>
                                봉천동 1673-21
                            </div>
                            <div class="image-gallery">
                                <div class="gallery-item-container">
                                    <img src="https://search.pstatic.net/common/?autoRotate=true&amp;type=w560_sharpen&amp;src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20190411_237%2F1554993989106xMSXW_JPEG%2FFCaZ_wk3jEWniI_RKHLae5gJ.JPG.jpg"
                                        class="image-container gallery-image" width="100%" height="100%"
                                        alt="24시 굿케어동물의료센터" style="opacity: 1; transition: opacity 0.3s ease-in 0s;">
                                </div>
                                <div class="gallery-item-container">
                                    <img src="https://search.pstatic.net/common/?autoRotate=true&amp;type=w560_sharpen&amp;src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20190411_203%2F155499398881979gxI_JPEG%2Fg9j2cbN1NQOl3BdkjQnKT40M.JPG.jpg"
                                        class="image-container gallery-image" width="100%" height="100%"
                                        alt="24시 굿케어동물의료센터" style="opacity: 1; transition: opacity 0.3s ease-in 0s;">
                                </div>
                                <div class="gallery-item-container">
                                    <img src="https://search.pstatic.net/common/?autoRotate=true&amp;type=w560_sharpen&amp;src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20190411_96%2F1554993992822pHrYS_JPEG%2Fkq_v7rNhCLF6i1xyJxJLsS9o.JPG.jpg"
                                        class="image-container gallery-image" width="100%" height="100%"
                                        alt="24시 굿케어동물의료센터" style="opacity: 1; transition: opacity 0.3s ease-in 0s;">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="decision-buttons-container">
                    <button class="button-base button-secondary" type="button">
                        이 장소가 아니에요
                    </button>
                    <button class="button-base button-secondary button-confirm" type="button" @click="confirmReceipt">
                        이 장소가 맞아요
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import DateModal from './DateModal.vue';
import TimeModal from './TimeModal.vue';

export default {
    components: {
        DateModal,
        TimeModal
    },
    data() {
        return {
            showDateModal: false,
            showTimeModal: false,
            shopName: '',
            paymentType: '',
            dateTimeStr: '',
            selectedDate: '', // 날짜를 저장할 데이터
            selectedTime: '',  // 시간을 저장할 데이터
            queryData: '',
        };
    },
    created() {
        this.loadQueryData();
    },
    methods: {
        loadQueryData() {
            const query = this.$route.query;
            console.log("query.shopName : " + query.shopName);
            console.log("query.purchaseDate : " + query.purchaseDate);
            console.log("query.approvalNumber : " + query.approvalNumber);
            this.shopName = query.shopName;
            this.dateTimeStr = query.purchaseDate;
            this.queryData = query;
            this.parseDateTime();
        },
        parseDateTime() {
            const dateTime = new Date(this.dateTimeStr);
            this.selectedDate = `${dateTime.getFullYear()}-${String(dateTime.getMonth() + 1).padStart(2, '0')}-${String(dateTime.getDate()).padStart(2, '0')}`;
            this.selectedTime = `${String(dateTime.getHours()).padStart(2, '0')}:${String(dateTime.getMinutes()).padStart(2, '0')}:${String(dateTime.getSeconds()).padStart(2, '0')}`;
            console.log("selectedDate : " + this.selectedDate);
            console.log("selectedTime : " + this.selectedTime);
        },
        handleDateSelected(date) {
            this.selectedDate = date;
            this.showDateModal = false; // 모달 창 닫기
            console.log("선택된 날짜:", this.selectedDate);
            // 필요한 추가 동작을 여기에 구현
        },
        handleTimeSelected(time) {
            this.selectedTime = time;
            this.showTimeModal = false; // 모달 창 닫기
            console.log("선택된 시간:", this.selectedTime);
            // 필요한 추가 동작을 여기에 구현
        },
        confirmReceipt() {
            this.$router.push({
                path: '/review/write',
                query: {
                    shopName: this.shopName,
                    paymentType: this.paymentType,
                    selectedDate: this.selectedDate,
                    selectedTime: this.selectedTime
                }
            });
        },
    }
}
</script>

<style>
@import '@/css/review/review.css';

.contents {
    width: 400px;
    margin: auto;
    /* padding-bottom: 120px; */
}
</style>