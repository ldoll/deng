<template>
    <view>
        <view class="bg-white">
            <cu-custom :isBack="false" class="text-bold" bgColor="bg-white">
                <block slot="backText"></block>
                <block slot="content">ALLELE等位叫号</block>
            </cu-custom>
            <view class="">
                <!-- 绿色nav -->
                <view class="bg-green padding radius-xl margin-lr margin-top-sm">
                    <view class="flex justify-between">
                        <view class="text-cut flex-sub text-white"><text class="cuIcon-locationfill"></text>{{address}}</view>
                        <!-- <view class="basis-10 text-right"><text @click="openscan" class="cuIcon-scan"></text></view> -->
                    </view>
                    <view class="grid col-3 text-center padding-top-xl padding-bottom-xs">
                        <view v-for="(item,i) in nav1" :key="i" :data-type="item.img" @click="gotoOther" class="">
                            <view class="cu-avatar lg radius bg-transparent">
                                <image :src="'/static/icon/' + item.img + '.png'" style="height: 100%;"></image>
                                <view v-if="item.tag > -1" class="cu-tag lg badge">{{item.tag}}</view>
                            </view>
                            <view class="text-sm text-bold padding-top-sm">{{item.name}}</view>
                            <view class="text-xs">{{item.detail}}</view>
                        </view>
                    </view>
                </view>
                <!-- 搜索 -->
                <view class="cu-bar search bg-white margin-lr">
                    <view @click="gotoShop" data-type="search" class="search-form round" style="margin: 0;">
                        <text class="cuIcon-search"></text>
                        <input disabled type="text" placeholder="搜索周边商家等位" />
                    </view>
                </view>
                <!-- 商家分类 -->
                <view class="grid col-4 text-center padding-bottom">
                    <view v-for="(item,i) in nav2" :key="i" :data-type="item.img" @click="gotoShop" class="">
                        <view class="cu-avatar xl radius bg-transparent"><image :src="'/static/icon/' + item.img + '.png'" style="height: 100%;"></image></view>
                        <view class="text-sm text-gray">{{item.name}}</view>
                    </view>
                </view>

                <!-- banner -->
                <view style="overflow: hidden; z-index: 1;" class="margin-lr relative radius-xl">
                    <swiper
                        :indicator-dots="true"
                        :circular="true"
                        :autoplay="true"
                        class="swiper"
                        style="overflow: hidden; min-height: 200upx; height: 200upx;"
                        interval="50000"
                        duration="500"
                    >
                        <swiper-item @click="gotoImg" :data-type="index" v-for="(item, index) in swiperList" :key="index" class="radius-xl" style="overflow: hidden; width: 100%;"><image :src="item.url" mode="" class="radius-xl" style="overflow: hidden; width: 100%; height: 200upx;"></image></swiper-item>
                    </swiper>
                </view>
                <!-- 附近商家 -->
                <view class="flex padding-tb-sm align-center justify-between margin-lr">
                    <view class="text-bold text-lg text-black">附近的等位商家</view>
                    <view @click="gotoShop" class="text-sm text-gray">
                        更多
                        <text class="sm text-gray cuIcon-right"></text>
                    </view>
                </view>
                <view v-if="shopList.length > 0">
                    <view v-for="(item, i) in shopList" :key="i" class="margin-lr"><ShopItem :lat="lat" :lng="lng" :item="item" @gotoGoods="gotoGoods" /></view>
                </view>
                <view v-if="shopList.length === 0" class="flex justify-center margin-top padding bg-white"><text class="text-gray text-sm">没有更多</text></view>
            </view>
        </view>
        <view class="cu-tabbar-height bg-transparent"></view>
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
        <view :class="showModal ? 'show' : ''" class="cu-modal bottom-modal">
            <view class="cu-dialog">
                <view class="cu-bar bg-white">
                    <view @tap="modalOk" class="action text-green">{{modalOkTxt}}</view>
                    <view @tap="showModal = !showModal" class="action text-blue">取消</view>
                </view>
                <view class="padding-xl">
                    {{modalTxt}}
                </view>
            </view>
        </view>
    </view>
</template>

<script>
import ShopItem from '@/components/ShopItem';
import bmap from '@/common/libs/bmap-wx.min.js';
import api from '@/common/api.js';
import imgBase64 from '@/common/img.js';
export default {
    components: {
        ShopItem
    },
    data() {
        return {
            nav1: [
                {
                    img: 'coupon',
                    tag: -1,
                    name: '消费券',
                    detail: '我的周边店券'
                },
                {
                    img: 'freeSettleIn',
                    tag: -1,
                    name: '免费入驻',
                    detail: '店铺更高效经营'
                },
                {
                    img: 'store',
                    tag: -1,
                    name: '等位商城',
                    detail: '智能商用寻呼设备'
                }
            ],
            nav2: [
                {
                    img: 'diningRoom',
                    name: '餐饮等位'
                },
                {
                    img: 'ExperienceStore',
                    name: '体验店'
                },
                {
                    img: 'ServiceHall',
                    name: '办事大厅'
                },
                {
                    img: 'bank',
                    name: '医院银行'
                }
            ],
            modalTxt: '',
            shopList: [],
            PageCur: 'home',
            InputBottom: 0,
            swiperList: [
                {
                    id: 0,
                    type: 'image',
                    url: imgBase64.banner1
                },
                {
                    id: 1,
                    type: 'image',
                    url: imgBase64.banner2
                }
            ],
            markers: [],
            lat: '',
            lng: '',
            address: '获取定位中...',
            rgcData: {},
            showModal: false,
            userInfo: {},
            modalOkTxt: '',
        };
    },
    computed: {
        currShopList() {
            return this.shopList.filter(item => item.distance <= 1000);
        }
    },
    beforeCreate() {
    },
    onLoad() {
        uni.showLoading({
            title: '加载中'
        });
        const self = this;
        self.userInfo = uni.getStorageSync('userInfo');
        self.getLocation();

    },
    methods: {
        getLocation() {
            const self = this;
            let BMap = new bmap.BMapWX({
                ak: 'u2liO8nAgvMjZSELlbYznn7KamEXuURG'
            });
            let fail = function(data) {
                console.log(data);
                uni.showToast({
                    icon: 'none',
                    title: '获取定位失败'
                });
                self.address = '获取定位失败';
            };
            let success = function(data) {
                console.log('百度地图返回', data);
                self.address = data.wxMarkerData[0].address;
                uni.hideLoading();
            };
            uni.getLocation({
                type: 'gcj02',
                success: res => {
                    self.lat = res.latitude;
                    self.lng = res.longitude;
                    console.log('获取坐标', res);
                    self.init();
                    BMap.regeocoding({
                        fail: fail,
                        success: success,
                        location: res.latitude	 + ',' + res.longitude
                    });
                },
                fail: res => {
                    console.log('获取坐标shibai', res);
                    self.address = '获取定位失败';
                    uni.showToast({
                        icon: 'none',
                        title: '获取定位失败'
                    });
                },
                complete: res => {
                    console.log('获取坐标end', res);
                }
            });
        },
        getSetting() {
            const self = this;
            wx.openSetting({
                success(res) {
                    self.showModal = false;
                    if (res.authSetting['scope.userLocation']) {
                        self.getLocation();
                    }
                }
            });
        },
        openscan() {
            uni.scanCode({
                onlyFromCamera: true,
                scanType: ['qrCode'],
                success: res => {
                    console.log('条：' + res);
                },
                fail: err => {
                    console.log('条error：' + err);
                }
            });
        },
        init() {
            uni.showLoading({
                title: '加载中'
            });
            const self = this;
            uni.request({
                url: api.index,
                method: 'get',
                data: {
                    users_id: self.userInfo.id,
                    lat: self.lat,
                    lng: self.lng,
                },
                success: res => {
                    console.log(api.index, res);
                    uni.hideLoading();
                    if (res.statusCode === 200 && res.data.code === '1000') {
                        self.nav1[0].tag = res.data.data.ticket;
                        self.shopList = res.data.data.shops.data;
                    } else {
                        uni.showToast({
                            icon: 'none',
                            title: res.data.msg
                        });
                    }
                },
                error: res => {
                    console.log('shibai', res);
                    uni.showToast({
                        icon: 'none',
                        title: '获取数据异常'
                    });
                }
            });
        },
        NavChange: function(e) {
            const cur = e.currentTarget.dataset.cur;
            this.PageCur = e.currentTarget.dataset.cur;
            let url;
            if (cur === 'home') {
                return;
            } else if (cur === 'call') {
                url = `/pages/callNumber/index`;
            } else if (cur === 'my') {
                url = `/pages/my/index`;
            }
            console.log(url, '.../gotourl');
            uni.redirectTo({ url });
        },
        InputFocus(e) {
            this.InputBottom = e.detail.height;
        },
        InputBlur(e) {
            this.InputBottom = 0;
        },
        modalOk() {
            if (this.modalOkTxt === '设置') {
                this.getSetting();
            } else {
                uni.navigateTo({
                    url: '/pages/login/index'
                });
            }
        },
        gotoShop(e) {
            const self = this;
            if (!this.lat) {
                this.modalTxt = '无法获得附近商户信息，请打开定位权限';
                this.modalOkTxt = '设置';
                this.showModal = true;
                return;
            } else if (!this.userInfo) {
                this.modalTxt = '当前没有登录，无法获取数据，是否立即登录？';
                this.modalOkTxt = '登录';
                this.showModal = true;
                return;
            }
            const address = `?lat=${self.lat}&lng=${self.lng}`;
            let type = ``;
            if (e.currentTarget.dataset.type) {
                type = `&type=${e.currentTarget.dataset.type}`;
            }
            const url = `/pages/shopList/index${address}${type}`;
            uni.navigateTo({ url });
        },
        gotoGoods(id) {
            // if (!this.userInfo) {
            // 	this.modalTxt = '当前没有登录，无法获取数据，是否立即登录？'
            // 	this.showModal = true;
            //     return;
            // }
            uni.navigateTo({
                url: `/pages/goodsList/index?shopId=${id}`
            });
        },
        gotoOther(e) {
            let url;
            const type = e.currentTarget.dataset.type;
            if (type === 'coupon') {
                url = `/pages/couponList/index`;
                uni.navigateTo({ url });
            } else if (type === 'freeSettleIn' || type === 'store') {
                uni.navigateToMiniProgram({
                    appId: 'wx1add8343e9096835',
                    // path: 'pages/index/index',
                    // extraData: {
                    //   'data1': 'test'
                    // },
                    success: res => {
                        console.log('成功', res);
                        // 打开成功
                    }
                });
            }
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
.cu-avatar.xl {
  width: 146upx;
  height: 146upx;
}

.cu-tag.badge {
  border-radius: 200upx;
  position: absolute;
  top: -10upx;
  right: -10upx;
  font-size: 28upx;
  padding: 0upx;
  width: 40upx;
  height: 40upx;
  color: #fff;
}

.modal {
  position: absolute;
  width: calc(100% + 60upx);
  height: calc(100% + 60upx);
  left: -30upx;
  top: -30upx;
  z-index: 1000;
  border: 30upx solid white;
  border-radius: 25px;
}
</style>
