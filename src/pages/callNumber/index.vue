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
            <button v-if="desk" class="cu-btn bg-green lg">{{desk}}</button>
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
            desk: '',
            finished: null,
            gitcoupon: false,
            showModal: false,
        };
    },
    onLoad(option) {
        const self = this;
        // uni.showLoading({
        // 	title: '加载中',
        // });
        self.option = option;
        if (option.shopId) {
            self.desk = uni.getStorageSync('desk');
            self.gitcoupon = uni.getStorageSync('gitcoupon');
            self.isWaiting();
        } else {
            self.init();
        }
    },
    onReady() {
        const self = this;
        if (self.gitcoupon) {
            this.showModal = true;
            console.log('gitcoupon');
        }
    },
    computed: {
        topx() {
            return Number(uni.upx2px(100));
        }
    },
    methods: {
        closeModal() {
            this.showModal = false;
            console.log('guan');
        },
        init() {
            const self = this;
            uni.showLoading({
                title: '加载中'
            });
            const userInfo = uni.getStorageSync('userInfo');
            // const shop = uni.getStorageSync('shopInfo');
            uni.request({
                url: api.myMark,
                method: 'get',
                data: {
                    users_id: userInfo.id,
                    // shop_id: shop.id,
                },
                success: res => {
                    console.log(api.myMark, res);
                    uni.hideLoading();
                    if (res.statusCode === 200 && res.data.code === '1000') {
                        // if (res.data.data.)
                        // TODO 判断什么时候订单完成了
                        const mark = uni.getStorageSync('mark');
                        self.option = {
                            mark,
                            wait: res.data.data.mark.num,
                        };
                        self.desk = res.data.data.mark.table_num;
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
</style>
