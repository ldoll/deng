<template>
    <view class="body bg-gray">
        <cu-custom :isBack="true" class="text-bold" bgColor="bg-green"><block slot="backText"></block><block slot="content">订单</block></cu-custom>
        <!-- <OrderItem  status='wait'/>
		<OrderItem status='ok'/> -->
        <view v-for="(item,i) in list" :key="i"><OrderItem :item="item" @gotoNum="gotoNum" /></view>

        <view class="flex justify-center margin-top padding bg-white"><text class="text-gray text-sm">没有更多</text></view>
    </view>
</template>

<script>
import OrderItem from '@/components/OrderItem';
import api from '@/common/api.js';
export default {
    components: {
        OrderItem
    },
    data() {
        return {
            list: [],
        };
    },
    onLoad(option) {
        const self = this;
        uni.showLoading({
            title: '加载中'
        });
        self.init();
    },
    methods: {
        init() {
            const self = this;
            const userInfo = uni.getStorageSync('userInfo');
            uni.request({
                url: api.myOrder,
                method: 'get',
                data: {
                    users_id: userInfo.id,
                },
                success: res => {
                    console.log(api.myOrder, res);
                    uni.hideLoading();
                    if (res.statusCode === 200 && res.data.code === '1000') {
                        const list = res.data.data;
                        self.list = [...list];
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
        gotoNum(item) {
            console.log('点击了', item);
            uni.showLoading({
                title: '加载中'
            });
            uni.request({
                url: api.markInfo,
                method: 'get',
                data: {
                    shop_id: item.shop_id,
                    mark_id: item.mark_id,
                },
                success: res => {
                    console.log(api.markInfo, res);
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
                        const url = `/pages/index/index?curr=call&shopId=${item.shop_id}&mark=${letterMark}&markId=${item.mark_id}&desk=${desk}&wait=${wait}`;
                        uni.navigateTo({ url });
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

    }
};
</script>