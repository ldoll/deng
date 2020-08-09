<template>
    <view class="body">
        <view class="cu-list menu-avatar">
            <view class="cu-item">
                <view :style="'background-image:url(https:' + item.logo + ');'" class="cu-avatar radius"></view>
                <view class="content">
                    <view class="text-black text-bold">
                        <view class="text-cut">{{item.name}}</view>
                    </view>
                    <view class="text-gray text-xs flex">
                        <view class="text-cut padding-right-sm">距离你</view>
                        <view class="text-green">{{item.distance || 0}}m</view>
                    </view>
                </view>
                <view class="action">
                    <view class="text-red text-sm">￥<text class="text-xxl text-bold" style="display: inline-block; transform: translateY(15upx);">{{item.price}}</text></view>
                    <view class="text-red"><text style="opacity: 0;">{{item.price}}</text></view>
                </view>
            </view>
        </view>
        <view class="bg-white radius-df" style="border-top: 1px dashed #eee;">
            <view class="padding-sm">
                <view class="text-gray text-xs">{{item.detail || '仅限本店使用，同店一次只能使用一张'}}</view>
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
    methods: {}
};
</script>

<style scoped>
.cu-list.menu-avatar > .cu-item {
  padding-right: 30upx;
  border-radius: 20upx;
}

.cu-list.menu-avatar > .cu-item .action {
  width: 160upx;
  text-align: right;
  line-height: 1.6em;
}

.cu-list.menu-avatar > .cu-item .content {
  /* width: calc(100% - 96upx - 60upx - 120upx - 20upx - 20upx); */
  left: 120upx;
}

.cu-list.menu-avatar > .cu-item .action view + view {
  margin-top: 0;
}

.cu-list.menu-avatar > .cu-item::after,
.cu-list.menu > .cu-item::after {
  opacity: 0;
}

.cu-list.menu-avatar > .cu-item .content > view:first-child {
  font-size: 28upx;
}
</style>
