<template>
    <view class="body">
        <view :data-id="item.id" @click="gotoGoods" class="cu-list menu-avatar">
            <view class="cu-item">
                <view :style="'background-image:url(' + item.logo + ');'" class="cu-avatar xl radius"></view>
                <view class="content margin-left">
                    <view class="text-black text-bold">
                        <view class="text-cut">{{item.name}}</view>
                    </view>
                    <view class="text-gray text-xs flex">
                        <text>
                            {{type}}
                            <text class="text-cut padding-left-sm">附近{{item.distance}}m</text>
                        </text>
                    </view>
                    <view class="text-gray text-xs flex">
                        <text>
                            <text style="padding-top: 6upx; padding-bottom: 6upx;" class="text-xs bg-olive radius-xs padding-lr-xs margin-right-xs">排队</text>
                            前方正在等位
                            <text class="text-red text-lg padding-lr-xs">{{item.count}}</text>
                            位
                        </text>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>
<script>
import ENUM from '@/common/enum.js';
export default {
    props: ['item', 'lat', 'lng'],
    data() {
        return {
        };
    },
    computed: {
        distance() {
            const R = 6371004;
            const A2 = this.lat;
            const B2 = this.lng;
            const C2 = this.item.lat;
            const D2 = this.item.lng;
            const r =
                R *
                Math.acos(1 -
                    (Math.pow(
                        Math.sin(((90 - B2) * Math.PI) / 180) * Math.cos((A2 * Math.PI) / 180) - Math.sin(((90 - D2) * Math.PI) / 180) * Math.cos((C2 * Math.PI) / 180),
                        2
                    ) +
                    Math.pow(
                        Math.sin(((90 - B2) * Math.PI) / 180) * Math.sin((A2 * Math.PI) / 180) - Math.sin(((90 - D2) * Math.PI) / 180) * Math.sin((C2 * Math.PI) / 180),
                        2
                    ) +
                    Math.pow(Math.cos(((90 - B2) * Math.PI) / 180) - Math.cos(((90 - D2) * Math.PI) / 180), 2)) /
                    2);
            return r;
        },
        type() {
            return ENUM.classify(this.item.classify);
        },
    },
    methods: {
        gotoGoods(e) {
            // 把商店信息存起来
            uni.setStorageSync('shopInfo', this.item);
            this.$emit('gotoGoods', e.currentTarget.dataset.id);
        },
        Rad(d) {
            return (d * Math.PI) / 180.0;
        }
    }
};
</script>

<style scoped>
.cu-list.menu-avatar > .cu-item > .cu-avatar {
  left: 0;
}

.cu-avatar.xl {
  width: 140upx;
  height: 140upx;
}

.cu-list.menu-avatar > .cu-item {
  height: 190upx;
}

.cu-list.menu-avatar > .cu-item::after,
.cu-list.menu > .cu-item::after {
  left: calc(146upx + 30upx);
}
</style>
