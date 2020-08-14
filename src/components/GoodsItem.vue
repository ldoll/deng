<template>
    <view class="body">
        <view class="cu-list menu-avatar">
            <view class="cu-item">
                <view :style="'background-image:url(https://' + item.logo + ');'" class="cu-avatar xl radius"></view>
                <view class="content flex-sub margin-left">
                    <view class="text-black text-bold "><view class="text-cut">{{item.name}}</view></view>
                    <view class="text-gray text-xs">
                        <view class="text-cut-two">{{item.describe}}</view>
                    </view>
                    <view class="justify-between flex padding-top-sm text-center">
                        <view class="text-red">
                            ￥{{item.price}}
                        </view>
                        <view class="margin-lr-sm">
                            <view v-if="item.num > 0" @click="minus" class="cu-avatar sm radius bg-transparent">
                                <image style="height: 100%;" src="/static/icon/minus.png"></image>
                            </view>
                            <text v-if="item.num > 0" class="padding-lr-xs">{{item.num}}</text>
                            <view @click="add" class="cu-avatar sm radius bg-transparent">
                                <image style="height: 100%;" src="/static/icon/add.png"></image>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    props: ['item'],
    data() {
        return {

        };
    },
    mounted() {
        console.log('商品item', this.item);
    },
    methods: {
        add() {
            console.log('+');
            this.$emit('add');
        },
        minus() {
            console.log('-');
            this.$emit('minus');
        },


    }
};
</script>

<style scoped>
.cu-list.menu-avatar > .cu-item::after,
.cu-list.menu > .cu-item::after {
  opacity: 0;
}

.cu-list.menu-avatar > .cu-item {
  height: 230upx;
}
</style>
