<template>
    <view class="body bg-gray">
        <cu-custom :isBack="true" class="text-bold" bgColor="bg-green">
            <block slot="backText"></block>
            <block slot="content">消费券</block>
        </cu-custom>
        <!-- nav -->
        <scroll-view scroll-x class="bg-white nav">
            <view class="flex text-center">
                <view
                    v-for="(item, index) in TabType"
                    :key="index"
                    :class="index === TabCur ? 'text-green' : ''"
                    :data-id="index"
                    @tap="tabSelect"
                    class="cu-item flex-sub text-bold"
                >
                    {{item.name}}
                </view>
            </view>
        </scroll-view>
        <scroll-view :style="'height:calc(100vh - env(safe-area-inset-bottom) - ' + topx + 'px)'" class="" scroll-y scroll-with-animation>
            <view
                v-for="(item, index) in list"
                :key="index"
                :data-id="index"
                @click="CheckboxChange"
            >
                <view v-show="TabCur === 0 || item.type === TabType[TabCur].type" class="flex align-center margin-sm justify-between">
                    <view class="basis-5 margin-right-sm">
                        <view class="cu-avatar sm round bg-transparent">
                            <image v-if="item.checked === true" style="height: 100%;" src="/static/icon/chooseActive.png"></image>
                            <image v-else style="height: 100%;" src="/static/icon/choose.png"></image>
                        </view>
                    </view>
                    <view class="flex-sub margin-right"><CouponItem :item="item" /></view>
                </view>
            </view>
            <view v-if="list.length === 0 || couponAmount === 0" class="flex justify-center margin-top padding bg-white"><text class="text-gray text-sm">没有更多</text></view>
        </scroll-view>

        <!-- fixed -->
        <view class="fixed">
            <view class="align-center justify-center flex flex-sub padding-lr-sm bg-gray cu-tabbar-height">
                <text class="text-sm">{{copyright}}</text>
            </view>
            <view class="align-center flex flex-sub padding-lr-sm bg-green" style="height: 160upx;">
                <view class="bg-white flex-sub radius-xs padding-lr-sm padding-tb-xs">
                    <view class="flex flex-sub text-gray text-sm">消费金额</view>
                    <view class="flex flex-sub padding-tb-xs align-end text-black">
                        <view class="basis-5 text-sm">￥</view>
                        <view class="flex-sub"><input @input="changeMoney" :value="inputMoney" maxlength="7" type="digit" class="text-bold text-lg" placeholder="清输入消费金额" /></view>
                    </view>
                </view>
            </view>
            <view class="align-center flex flex-sub padding-lr-sm cu-tabbar-height bg-green">
                <view class="basis-10 relative margin-right-sm">
                    <view class="cu-avatar radius bg-transparent"><image style="height: 100%;" src="/static/icon/ticket.png"></image></view>
                    <view class="cu-tag badge">{{couponAmount}}</view>
                </view>
                <view class="flex-sub text-lg">
                    抵扣后共计
                    <text class="padding-left-xs">{{money}}</text>
                </view>
                <view class="basis-25" style="line-height: 1;"><view @click="gotopay" class="bg-white text-green text-bold  padding-tb-sm radius-sl text-center">去支付</view></view>
            </view>
        </view>
    </view>
</template>

<script>
import CouponItem from '@/components/CouponItem.vue';
import api from '@/common/api.js';
export default {
    components: {
        CouponItem
    },
    data() {
        return {
            copyright: '*本券由商家联合ALLELE等位发放，使用请和店家确认',
            TabCur: 0,
            list: [],
            checkIndex: '',
            money: 0,
            inputMoney: '',
            TabType: [
                {
                    name: '全部',
                    type: ''
                },
                {
                    name: '美食券',
                    type: 1
                },
                {
                    name: '生活券',
                    type: 2
                },
                {
                    name: '教育券',
                    type: 3
                },
                {
                    name: '其他',
                    type: 4
                }
            ],
            userInfo: {},
        };
    },
    onLoad(option) {
        const self = this;
        uni.showLoading({
            title: '加载中'
        });
        self.userInfo = uni.getStorageSync('userInfo');
        self.init();
    },
    onReady() {
        uni.hideLoading();
    },
    computed: {
        topx() {
            return Number(uni.upx2px(460)) + Number(this.CustomBar);
        },
        couponAmount() {
            if (this.TabCur === 0) {
                return this.list.length;
            } else {
                return this.list.filter(item => item.type === this.TabType[this.TabCur].type).length;
            }
        },
    },
    methods: {
        init() {
            const self = this;
            uni.request({
                url: api.myTicket,
                method: 'get',
                data: {
                    users_id: self.userInfo.id,
                },
                success: res => {
                    console.log(api.myTicket, res);
                    uni.hideLoading();
                    if (res.statusCode === 200 && res.data.code === '1000') {
                        self.list = res.data.data;
                        self.money = 0;
                        self.inputMoney = '';
                        // list.forEach((item, i) => {
                        //     list[i].checked = false;
                        // });
                        // self.list = list;
                    } else {
                        uni.showToast({
                            icon: 'none',
                            title: res.data.msg || '获取消费券信息失败'
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
        tabSelect(e) {
            this.TabCur = e.currentTarget.dataset.id;
        },
        CheckboxChange(e) {
            const index = e.currentTarget.dataset.id;
            const curr = this.list[index];
            // 清除之前选择的
            if (this.checkIndex !== index && this.checkIndex !== '') {
                this.list[this.checkIndex].checked = false;
            }
            // 选择当前的
            if (curr.checked) {
                this.list[index].checked = false;
                this.checkIndex = '';
            } else {
                this.list[index].checked = true;
                this.checkIndex = index;
            }
            this.computedMoney();
        },
        changeMoney(e) {
            const val = e.target.value;
            console.log(e.target.value);
            this.inputMoney = val;
            this.computedMoney();
        },
        computedMoney() {
            let inputMoney = 0;
            let couponMoney = 0;
            let money = 0;
            if (this.inputMoney !== '') {
                inputMoney = this.inputMoney;
            }
            if (this.checkIndex !== '') {
                couponMoney = Number(this.list[this.checkIndex].price).toFixed(2);
            }
            money = Number(inputMoney - couponMoney).toFixed(2);
            this.money = money > 0 ? money : 0;
            console.log(inputMoney, couponMoney, this.money, '---money');
        },
        gotopay() {
            // 预下单 支付
            if (!this.money) {
                uni.showToast({
                    icon: 'none',
                    title: '请输入金额'
                });
            } else if (this.inputMoney === '') {
                uni.showToast({
                    icon: 'none',
                    title: '请选择优惠券'
                });
            } else {
                this.inputMoney = Number(this.inputMoney).toFixed(2);
                this.postOrder();
            }
        },
        postOrder() {
            const currTicket = this.list[this.checkIndex];
            console.log('currTicket', currTicket);
            const self = this;
            uni.showLoading({
                title: '提交中'
            });
            const orderInfo =  {
                users_id: self.userInfo.id,
                money: self.inputMoney,
                id: currTicket.id,
            };
            uni.request({
                url: api.payTicket,
                method: 'post',
                data: orderInfo,
                success: res => {
                    console.log(api.payTicket, res);
                    uni.hideLoading();
                    if (res.statusCode === 200 && res.data.code === '1000') {
                        const info = JSON.parse(res.data.data.data);
                        console.log('payinfo', info);
                        uni.getProvider({
                            service: 'oauth',
                            success: function(res) {
                                self.pay(info, orderInfo, res.provider[0]);
                            }
                        });
                    } else {
                        uni.showToast({
                            icon: 'none',
                            title: res.data.msg || '下单失败'
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
        pay(info, orderInfo, provider) {
            const self = this;
            const { nonceStr, paySign, signType, timeStamp } = info.biz_response.data.wap_pay_request;
            const package1 = info.biz_response.data.wap_pay_request.package;
            uni.requestPayment({
                provider,
                orderInfo,
                timeStamp,
                nonceStr,
                package: package1,
                signType,
                paySign,
                success: res => {
                    console.log('成功', res);
                    // self.getTicket(orderId, mark);
                    uni.showToast({
                        icon: 'none',
                        title: '下单成功'
                    });
                    self.init();
                },
                fail: res => {
                    console.log('失败', res);
                    uni.showToast({
                        icon: 'none',
                        title: '提交失败'
                    });
                },
                complete: res => {
                    console.log('结束', res);
                }
            });
        },
    }
};
</script>

<style scoped>
.fixed {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
