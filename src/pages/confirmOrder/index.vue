<template>
    <view class="body">
        <cu-custom :isBack="true" class="text-bold" bgColor="bg-green">
            <block slot="backText"></block>
            <block slot="content">确认订单</block>
        </cu-custom>
        <view class="flex bg-white justify-between padding align-center">
            <text class="text-lg text-bold text-black">排号说明</text>
            <text class="text-df text-gray">
                前面现在有
                <text class="text-lg padding-xs text-green">{{option.wait}}</text>
                名顾客在排队
            </text>
        </view>
        <view class="padding-lr-sm  margin-lr-sm margin-top-sm bg-white ">
            <viwe class="solid-bottom flex padding-tb-sm"><text class="text-lg text-bold text-black">点单说明</text></viwe>
        </view>
        <!-- 商品 -->
        <view class="padding-lr-sm padding-tb-xs margin-lr-sm bg-white">
            <viwe v-for="(item, index) in orderList.list" :key="index" class="flex padding-tb-xs text-sm">
                <text class="basis-lg text-black">{{item.name}}</text>
                <text class="basis-xs  text-right text-gray">X{{item.num}}</text>
                <text class="basis-xs text-right text-black">￥{{item.price}}</text>
            </viwe>
        </view>
        <!-- 小计 -->
        <view class="padding-lr-sm  margin-lr-sm bg-white flex justify-end">
            <viwe class="solid-top flex-sub text-right  text-black padding-tb-sm">
                <text class="text-sm text-bold">
                    共计
                    <text class="">{{orderList.num}}</text>
                    个商品，小记￥
                    <text class=" text-xxl">{{orderList.money}}</text>
                </text>
            </viwe>
        </view>
        <view class="margin-top margin-lr-sm padding-lr-sm bg-white">
            <view class="cu-form-group solid-bottom">
                <view class="title text-bold text-df">您的桌号</view>
                <picker :value="deskIndex" :range="deskList" @change="PickerChange">
                    <view :class="deskIndex !== '' ? '' : 'text-gray'" class="picker">{{deskIndex !== '' ? deskList[deskIndex] : '必选'}}</view>
                </picker>
            </view>
        </view>
        <view class="padding-lr-sm  margin-lr-sm  bg-white ">
            <viwe class="text-df padding-tb-sm flex justify-between">
                <text class="text-black text-bold">支付方式</text>
                <text class="text-green">在线支付</text>
            </viwe>
            <view class="cu-form-group "><textarea @input="textareaAInput" class="bg-gray textarea" maxlength="-1" placeholder="更多备注信息"></textarea></view>
        </view>
        <view class="cu-tabbar-height margin-top-sm"></view>
        <view class="fixedItem flex justify-between text-lg bg-white align-center">
            <view class="text-black text-bold padding">￥{{orderList.money}}</view>
            <view @click="gotoCallNumber" class=" text-white bg-green basis-30 padding text-center">支付</view>
        </view>
    </view>
</template>

<script>
import api from '@/common/api.js';
export default {
    data() {
        return {
            orderList: {},
            deskIndex: '',
            desk: '',
            option: {},
            userInfo: {},
            deskList: ['1号桌', '2号桌', '3号桌']
        };
    },
    onLoad(option) {
        const self = this;
        // uni.showLoading({
        // 	title: '加载中',
        // });
        self.option = option;
        self.orderList = uni.getStorageSync('goodsList');
        self.userInfo = uni.getStorageSync('userInfo');
    },
    onReady() {
    },
    methods: {
        PickerChange(e) {
            this.deskIndex = e.detail.value; // 第几项
            this.desk = this.deskList[e.detail.value];
        },
        textareaAInput(e) {
            this.orderList.detail = e.target.value;
        },
        gotoCallNumber() {
            const self = this;
            if (!self.deskIndex) {
                uni.showToast({
                    title: '请选择座号',
                    icon: 'none',
                });
                return;
            }
            uni.showLoading({
                title: '提交中'
            });
            uni.setStorageSync('desk', self.desk);
            // 下单 支付 叫号
            // self.getMark();
            self.postOrder();
            // self.postPay();
        },
        postPay() {
            const self = this;
            uni.showLoading({
                title: '提交中'
            });
            uni.request({
                url: api.pay,
                method: 'post',
                data: {
                    shop_id: self.option.shopId,
                    users_id: self.userInfo.id,
                    money: Number(self.orderList.money),
                },
                success: res => {
                    console.log(api.pay, res);
                    uni.hideLoading();
                    if (res.statusCode === 200 && res.data.code === '1000') {
                        self.getMark();
                        // const mark = res.data.data;
                        // uni.setStorageSync('mark',mark);
                        // uni.setStorageSync('gitcoupon',mark);
                        // const url = `/pages/callNumber/index?shopId=${self.option.shopId}&mark=${mark}&wait=${self.option.wait}`;
                        // uni.navigateTo({ url });
                    } else {
                        uni.showToast({
                            icon: 'none',
                            title: '提交失败'
                        });
                    }
                },
                error: res => {
                    console.log('失败', res);
                    uni.showToast({
                        icon: 'none',
                        title: '提交失败'
                    });
                },
            });

        },
        postOrder() {
            const self = this;
            uni.showLoading({
                title: '提交中'
            });
            const product = [];
            self.orderList.list.forEach(item => {
                product.push({
                    id: item.id,
                    price: Number(item.price),
                    count: item.num,
                });
            });
            console.log('product', product);
            uni.request({
                url: api.order,
                method: 'post',
                data: {
                    product, // 二维数组中须包括以下字段：id：产品id，price：产品价格，count：产品数量
                    shop_id: self.option.shopId,
                    users_id: self.userInfo.id,
                    money: Number(self.orderList.money),
                    detail: self.orderList.detail,
                    ticket_id: null,
                },
                success: res => {
                    console.log(api.order, res);
                    uni.hideLoading();
                    if (res.statusCode === 200 && res.data.code === '1000') {
                        self.postPay();
                        // const mark = res.data.data;
                        // uni.setStorageSync('mark',mark);
                        // uni.setStorageSync('gitcoupon',mark);
                        // const url = `/pages/callNumber/index?shopId=${self.option.shopId}&mark=${mark}&wait=${self.option.wait}`;
                        // uni.navigateTo({ url });
                    } else {
                        uni.showToast({
                            icon: 'none',
                            title: '提交失败'
                        });
                    }
                },
                error: res => {
                    console.log('失败', res);
                    uni.showToast({
                        icon: 'none',
                        title: '提交失败'
                    });
                },
            });
        },
        getMark() {
            const self = this;
            uni.request({
                url: api.mark,
                method: 'get',
                data: {
                    type: self.option.type, // 1-扫码预约取号 2-店家点单取号 3-手动取号
                    shop_id: self.option.shopId,
                    users_id: self.userInfo.id,
                    table: self.desk
                    // count: self.lng, // 人数
                },
                success: res => {
                    console.log(api.mark, res);
                    uni.hideLoading();
                    if (res.statusCode === 200 && res.data.code === '1000') {
                        const mark = res.data.data;
                        uni.setStorageSync('mark', mark);
                        uni.setStorageSync('gitcoupon', mark);
                        const url = `/pages/callNumber/index?shopId=${self.option.shopId}&mark=${mark}&wait=${self.option.wait}`;
                        uni.navigateTo({ url });
                    } else {
                        uni.showToast({
                            icon: 'none',
                            title: '提交失败'
                        });
                    }
                },
                error: res => {
                    console.log('失败', res);
                    uni.showToast({
                        icon: 'none',
                        title: '提交失败'
                    });
                }
            });

        },
    }
};
</script>

<style scoped>
.bt-gray {
  border-top: 20upx solid #f1f1f1;
}

.cu-form-group {
  padding: 0;
}

.textarea {
  margin-top: 0;
  padding: 20upx;
  border-radius: 10upx;
  min-height: 200upx;
}

.basis-30 {
  flex-basis: 30%;
}

.fixedItem {
  position: fixed;
  bottom: 0;
  width: 100%;
}
</style>
