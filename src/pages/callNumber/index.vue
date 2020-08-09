<template>
    <view :style="'min-height:calc(100vh - env(safe-area-inset-bottom) / 2 - ' + topx + 'px)'" class="body bg-white">
        <cu-custom :isBack="false" class="text-bold" bgColor="bg-white">
            <block slot="backText"></block>
            <block slot="content">ALLELE等位叫号</block>
        </cu-custom>
        <view class="flex justify-center padding-xl margin-top-xl"><view @click="gotoShopList" class="cu-avatar xl bg-green round">{{option.mark || '请取号'}}</view></view>
        <view class="padding-top text-bold text-xl text-center">请听到呼叫凭号码取</view>
        <view class="padding text-grey text-df text-center">
            您前面还有
            <text class="text-green text-xl padding-lr-xs">{{option.wait || 0}}</text>
            名顾客排队
        </view>
        <view class="text-white text-center padding-sm">
            <button v-if="option.desk" class="cu-btn bg-green lg">{{option.desk}}</button>
        </view>
        <!-- fixed -->
        <view class="fixed">
            <view class="flex justify-end padding margin text-center">
                <view @click="onSubmit">
                    <view class="cu-avatar lg bg-gray round">
                        <text :class="[finished ? &quot;text-white&quot; : &quot;text-green&quot;]" class="lg cuIcon-check"></text>
                        <view v-if="!finished" class="cu-tag sm badge"></view>
                    </view>
                    <view>{{submit}}</view>
                </view>
            </view>
            <view class="cu-tabbar-height"></view>
        </view>
        <!-- 底部 -->
        <view class="cu-bar tabbar bg-white shadow foot">
            <view @click="NavChange" class="action" data-cur="home">
                <view class="cuIcon-cu-image"><image :src="'/static/icon/home' + [PageCur === 'home' ? 'Active' : ''] + '.png'"></image></view>
                <view :class="PageCur === 'home' ? 'text-green' : 'text-gray'">首页</view>
            </view>
            <view @click="NavChange" class="action" data-cur="call">
                <view class="cuIcon-cu-image"><image :src="'/static/icon/call' + [PageCur === 'call' ? '' : ''] + '.png'"></image></view>
                <view :class="PageCur === 'call' ? 'text-green' : 'text-gray'">叫号</view>
            </view>
            <view @click="NavChange" class="action" data-cur="my">
                <view class="cuIcon-cu-image"><image :src="'/static/icon/my' + [PageCur === 'my' ? 'Active' : ''] + '.png'"></image></view>
                <view :class="PageCur === 'my' ? 'text-green' : 'text-gray'">我的</view>
            </view>
        </view>
        <!-- modal -->
        <view :class="showModal ? 'show' : ''" class="cu-modal">
            <view class="cu-dialog">
                <view class="bg-img" style="background-image: url('https://wait.youngotemai.com/img/mini/mm.png'); height: 100%;">
                    <view class="xxPositon">
                        <view class="cu-bar justify-end text-white">
                            <view @click="closeModal" class="action">
                                <text class="cuIcon-close "></text>
                            </view>
                        </view>
                    </view>
                    <view class="price">
                        {{ticket.price}}
                    </view>
                    <view class="name">
                        {{ticket.name}}
                    </view>
                    <view @click="gotoCoupon" class="gotoCoupon">
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
import api from '@/common/api.js';
export default {
    data() {
        return {
            PageCur: 'call',
            option: {},
            submit: '',
            finished: null,
            showModal: false,
            userInfo: {},
            ticket: {},
        };
    },
    onLoad(option) {
        uni.showLoading({
            title: '加载中'
        });
        const self = this;
        self.option = option;
        self.userInfo = uni.getStorageSync('userInfo');
        if (option.shopId) { //
            // 获得订单号 获得消费券
            // if (option.orderId) { // 有订单是等位排号的情况，要获取优惠券
            // 	self.getTicket();
            // } else if (option.mark) { // 是直接取号的情况，不用调接口
            // }
            self.showMark();
        } else {
            self.init();
        }
    },
    onReady() {
    },
    computed: {
        topx() {
            return Number(uni.upx2px(100));
        }
    },
    methods: {
        showMark() {
            this.ticket = uni.getStorageSync('ticket');
            this.isWaiting();
            this.openModal();
            uni.hideLoading();
        },
        openModal() {
            this.showModal = true;
        },
        closeModal() {
            this.showModal = false;
            uni.removeStorageSync('ticket');
            console.log('guan');
        },
        init() {
            const self = this;
            uni.request({
                url: api.myMark,
                method: 'get',
                data: {
                    users_id: self.userInfo.id,
                },
                success: res => {
                    console.log(api.myMark, res);
                    uni.hideLoading();
                    if (res.statusCode === 200 && res.data.code === '1000') {
                        const wait = res.data.data.count;
                        const resMark = res.data.data.mark;
                        let desk = resMark.table_num;
                        if (desk === 'undefined' || desk === 'null') {
                            desk = null;
                        }
                        let letterMark = '';
                        if (resMark.num < 100) {
                            letterMark = resMark.letter + '0' + resMark.num;
                        } else {
                            letterMark = resMark.letter + resMark.num;
                        }
                        self.option = {
                            desk,
                            wait,
                            mark: letterMark,
                        };
                        console.log('self.option', self.option);
                        self.isWaiting();
                    } else {
                        uni.showToast({
                            icon: 'none',
                            title: '加载失败'
                        });
                        self.isFinished();
                    }
                },
                error: res => {
                    console.log('失败', res);
                    uni.showToast({
                        icon: 'none',
                        title: '加载失败'
                    });
                    self.isFinished();
                }
            });
        },
        NavChange: function(e) {
            const cur = e.currentTarget.dataset.cur;
            this.PageCur = e.currentTarget.dataset.cur;
            let url;
            if (cur === 'home') {
                url = `/pages/index/index`;
            } else if (cur === 'call') {
                return;
            } else if (cur === 'my') {
                url = `/pages/my/index`;
            }
            console.log(url, '.../gotourl');
            uni.redirectTo({ url });
        },
        isWaiting() {
            const self = this;
            self.submit = '确认完成';
            self.finished = false;
        },
        isFinished() {
            const self = this;
            self.submit = '已完成';
            self.finished = true;
        },
        gotoShopList() {
            if (this.finished) {
                const url = `/pages/index/index`;
                uni.redirectTo({ url });
            }
            console.log(this.finished);
        },
        onSubmit() {
            if (!this.finished) {
                this.isFinished();
            }
        },
        gotoCoupon() {
            const url = `/pages/couponList/index`;
            uni.navigateTo({ url });
            this.closeModal();
        }
    }
};
</script>

<style scoped>
.cu-avatar.xl {
  width: 250upx;
  height: 250upx;
  font-size: 2em;
}

.fixed {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
}

.cu-dialog {
  width: 100%;
  background: transparent;
  height: 100%;
}

.bg-img {
  background-size: contain;
}

.xxPositon {
  position: absolute;
  width: 100%;
  top: 20%;
}

.price {
  position: absolute;
  color: red;
  top: 55%;
  left: 41%;
  font-size: 35upx;
}

.name {
  position: absolute;
  color: red;
  top: 55%;
  right: 16%;
  font-size: 30upx;
}

.gotoCoupon {
  position: absolute;
  color: red;
  top: 69%;
  right: 26%;
  width: 31%;
  height: 70upx;
  background: red;
}

</style>
