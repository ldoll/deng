<template>
    <view class="body">
        <view class="cu-list menu-avatar">
            <view class="cu-item">
                <view :style="'background-image:url(' + item.logo + ');'" class="cu-avatar lg radius"></view>
                <view class="content">
                    <view class="text-black text-bold">
                        <view class="text-cut">{{item.name}}</view>
                    </view>
                    <view class="text-gray text-sm flex">
                        <view class="text-cut padding-right-sm">{{itemDate}}</view>
                        <view class="text-cut">{{itemTime}}</view>
                    </view>
                    <view class="text-gray text-sm flex">
                        <view class="text-cut text-sm">{{itemDetail}}</view>
                    </view>
                </view>
                <view class="action">
                    <view class="text-bold text-black">共计￥{{item.money}}</view>
                    <view class="" style="opacity: 0;">.</view>
                    <view class="" style="opacity: 0;">.</view>
                </view>
            </view>
        </view>
        <view class="bg-white">
            <view class="flex  justify-end text-right padding-lr-sm padding-bottom-sm solid-bottom margin-left">
                <view v-if="item.status !== 1" class="bg-green radius padding-lr-sm padding-tb-xs">排号中</view>
                <view v-else class="bg-gray radius padding-lr-sm padding-tb-xs">已完成</view>
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
    computed: {
        itemDate() {
            return this.item.created_at.substr(0, 10);
        },
        itemTime() {
            return this.item.created_at.substr(11, 8);
        },
        itemDetail() {
            const list = this.item.item;
            let result = '直接排队取号';
            if (list && list.length > 0) {
                result = '';
                list.forEach(item => {
                    result += item.name + 'x' + item.count + ' ';
                });
            }
            return result;
        }
    },
    methods: {


    }
};
</script>

<style scoped>
  /* .cu-list.menu-avatar>.cu-item>.cu-avatar{
		left: 0;
	}
	.cu-avatar.xl{
		width: 140upx;
		height: 140upx;
	} */
  .cu-list.menu-avatar > .cu-item {
    height: 160upx;
    padding-right: 30upx;
  }

  /* .cu-list.menu-avatar>.cu-item:after, .cu-list.menu>.cu-item:after{
		left:calc( 146upx + 30upx );
	} */
  .cu-list.menu-avatar > .cu-item .action {
    width: 160upx;
    text-align: right;
    line-height: 1.6em;
  }

  .cu-list.menu-avatar > .cu-item .content {
    width: calc(100% - 96upx - 60upx - 120upx - 20upx - 20upx);
  }

  .cu-list.menu-avatar > .cu-item .action view + view {
    margin-top: 0;
  }

  .cu-list.menu-avatar > .cu-item::after,
  .cu-list.menu > .cu-item::after {
    opacity: 0;
  }
</style>
