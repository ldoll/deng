<template name="my">
    <view class="body">
        <cu-custom :isBack="false" class="text-bold" bgColor="bg-green">
            <block slot="backText"></block>
            <block slot="content">我的</block>
        </cu-custom>
        <view class="cu-list menu-avatar bg-green" style="padding-bottom: 40upx;">
            <view class="cu-item">
                <view class="cu-avatar round lg">
                    <image v-if="isLogin" :src="userInfo.userInfo.avatarUrl" style="height: 100%; border-radius: 5000upx;"></image>
                    <image v-else src="/static/icon/touxiang.png" style="height: 100%; border-radius: 5000upx;"></image>
                </view>
                <view @click="nologin" data-type="1" class="content">
                    <view class="text-white title">{{nickName}}</view>
                    <view class="text-white text-sm">点餐排队更高效</view>
                </view>
                <view class="rightRadius">
                    <view @click="gotoOther" class="rightBox" data-type="consumerCoupon">
                        <view class="cu-avatar sm radius bg-transparent">
                            <image style="height: 100%;" src="/static/icon/BarCode.png"></image>
                        </view>
                        <view class="text-black text-xs">消费券</view>
                    </view>
                </view>
            </view>
        </view>
        <!-- banner -->
        <view style="overflow: hidden; z-index: 1;" class="margin-lr relative radius-xl">
            <swiper
                :indicator-dots="false"
                :circular="true"
                :autoplay="true"
                class="swiper"
                style="overflow: hidden; min-height: 200upx; height: 200upx;"
                interval="5000"
                duration="500"
            >
                <swiper-item @click="gotoImg" :data-type="index" v-for="(item, index) in swiperList" :key="index" class="radius-xl" style="overflow: hidden; width: 100%;"><image :src="item.url" mode="" class="radius-xl" style="overflow: hidden; width: 100%; height: 200upx;"></image></swiper-item>
            </swiper>
        </view>
        <view v-for="(item,index) in nav" :key="index" :data-type="item.img" :class="index === 2 ? 'margin-top' : ''" @click="gotoOther" class="padding-left bg-white relative">
            <view v-if="index !== 2" :class="index !== 1 && index !== 4 ? 'solid-bottom' : ''" style="height: 102upx;" class="padding-right text-df flex align-center">
                <view class="cu-avatar sm margin-right-sm radius bg-transparent">
                    <image :src="'/static/icon/' + item.img + '.png'" style="height: 100%;"></image>
                </view>
                <text class="text-black basis-lg ">{{item.name}}</text>
                <text class="text-gray cuIcon-right flex-sub text-right"></text>
            </view>
            <view v-else :class="index !== 1 && index !== 4 ? 'solid-bottom' : ''" style="height: 102upx;" class="padding-right text-df flex align-center">
                <view class="cu-avatar sm margin-right-sm radius bg-transparent">
                    <image :src="'/static/icon/' + item.img + '.png'" style="height: 100%;"></image>
                </view>
                <text class="text-black basis-lg ">{{item.name}}</text>
                <text class="text-gray cuIcon-right flex-sub text-right"></text>
                <button class="kefu" open-type="contact" session-from="weapp">
                </button>
            </view>
        </view>
        <!-- 退出登录 -->

        <view class="padding-lr-xl  margin-xl ">
            <view @click="nologin" class="bg-white text-df padding-tb-sm flex align-center text-center radius-sm"><text class="text-black flex-sub">{{isLogin ? "退出登录" : "立即登录"}}</text></view>
        </view>
        <view class="cu-tabbar-height"></view>
        <!-- 底部 -->
        <!--   <view class="cu-bar tabbar bg-white shadow foot">
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
        </view> -->
    </view>
</template>

<script>
import imgBase64 from '@/common/img.js';
export default {
    data() {
        return {
            userInfo: {
                userInfo: {
                    nickName: '',
                    avatarUrl: '',
                }
            },
            href: 'https://uniapp.dcloud.io/component/README?id=uniui',
            nav: [
                {
                    img: 'consumerCoupon',
                    name: '我的消费券',
                },
                {
                    img: 'order',
                    name: '我的订单',
                },
                {
                    img: 'customerService',
                    name: '在线客服',
                },
                {
                    img: 'SettleIn',
                    name: '商户入驻',
                },
                {
                    img: 'aboutMe',
                    name: '关于我们',
                }
            ],
            PageCur: 'my',
            swiperList: [
                {
                    id: 1,
                    type: 'image',
                    url: imgBase64.banner2
                }
            ],
            isLogin: false,
        };
    },
    computed: {
        nickName() {
            if (this.isLogin) {
                return 'hello,' + this.userInfo.userInfo.nickName;
            } else {
                return '请登录';
            }
        },
    },
    beforeMount() {
        const self = this;
        const wxInfo = uni.getStorageSync('wxInfo');
        if (wxInfo) {
            self.isLogin = true;
            self.userInfo = wxInfo;
        }
    },
    methods: {
        nologin(e) {
            const type = e.currentTarget.dataset.type;
            if (type === '1' && this.isLogin) {
                return;
            }
            uni.removeStorageSync('userInfo');
            uni.removeStorageSync('wxInfo');
            uni.redirectTo({ url: '/pages/login/index' });
        },
        NavChange: function(e) {
            const cur = e.currentTarget.dataset.cur;
            this.PageCur = e.currentTarget.dataset.cur;
            let url;
            if (cur === 'home') {
                url = `/pages/index/index`;
            } else if (cur === 'call') {
                url = `/pages/call/index`;
            } else if (cur === 'my') {
                return;
            }
            console.log(url, '.../gotourl');
            uni.redirectTo({ url });
        },
        gotoOther(e) {
            const type = e.currentTarget.dataset.type;
            if (type === 'SettleIn') {
                uni.navigateToMiniProgram({
                    appId: 'wx1add8343e9096835',
                });
                return;
            }
            let url;
            switch (type) {
                case 'consumerCoupon':
                    url = '/pages/couponList/index';
                    break;
                case 'order':
                    url = '/pages/myOrderList/index';
                    break;
                case 'customerService':
                    url = '';
                    break;
                case 'SettleIn':
                    url = '';
                    break;
                case 'aboutMe':
                    url = '';
                    break;
            }
            console.log(type, url, 'tt');
            uni.navigateTo({ url });
        },
        gotoImg(e) {
            const type = e.currentTarget.dataset.type;
            console.log('跳转banner', type);
            if (type === 0) {
                uni.navigateToMiniProgram({
                    appId: 'wx1add8343e9096835',
                    success: res => {
                        console.log('成功', res);
                        // 打开成功
                    }
                });
            } else if (type === 1) {
                uni.navigateToMiniProgram({
                    appId: 'wx1add8343e9096835',
                    success: res => {
                        console.log('成功', res);
                        // 打开成功
                    }
                });
            }
        }
    }
};
</script>

<style scoped>
.cu-list.menu-avatar > .cu-item {
  background-color: #36ab60;
}

.cu-list.menu-avatar > .cu-item .content > uni-view:first-child {
  font-size: 32upx;
}

.cu-list.menu-avatar > .cu-item::after,
.cu-list.menu > .cu-item::after {
  opacity: 0;
}

.rightRadius {
  position: absolute;
  right: 0;
  width: 120upx;
  height: 120upx;
  top: 0;
  background: white;
  border-bottom-left-radius: 5000upx;
  text-align: center;
}

.rightBox {
  position: absolute;
  right: 10upx;
  top: 10upx;
}

.screen-swiper {
  min-height: 200upx;
}

.solid-bottom::after {
  left: calc(1.6em + 16upx);
}

.padding-left.bg-white {
  overflow: hidden;
}

.cu-avatar.sm {
  width: 40upx;
  height: 40upx;
  font-size: 1em;
}

.kefu {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
}
</style>
