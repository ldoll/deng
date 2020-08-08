<template>
    <view class="body bg-white">
        <cu-custom :isBack="true" class="text-bold" bgColor="bg-green">
            <block slot="backText"></block>
            <block slot="content">{{currShop.name}}</block>
        </cu-custom>
        <view class="solid-bottom padding bg-white flex justify-between cu-tabbar-height">
            <view class=" text-bold text-black text-lg text-cut">{{currShop.name}}</view>
            <view class="basis-df text-gray text-df text-right">
                前面有
                <text class="text-green text-xxl padding-xs text-bold">{{wait}}</text>
                位排队
            </view>
        </view>
        <view class="VerticalBox">
            <scroll-view
                :scroll-top="verticalNavTop"
                :style="'height:calc(100vh - env(safe-area-inset-bottom) - ' + topx + 'px)'"
                class="VerticalNav nav"
                scroll-y
                scroll-with-animation
            >
                <view v-for="(item, index) in list" :key="index" :class="item.id === tabCur ? 'text-green cur' : ''" :data-id="item.id" @tap="TabSelect" class="cu-item">
                    {{item.name}}
                </view>
            </scroll-view>
            <scroll-view
                :style="'height:calc(100vh - env(safe-area-inset-bottom) - ' + topx + 'px)'"
                :scroll-into-view="'main-' + mainCur"
                @scroll="VerticalMain"
                class="VerticalMain"
                scroll-y
                scroll-with-animation
            >
                <view v-for="(item, index) in list" :id="'main-' + item.id" :key="index" class="solid-bottom">
                    <view v-for="(one, i) in item.list" :key="i"><GoodsItem :item="one" :data-index="index" :data-i="i" @minus="minus(i, index)" @add="add(i, index)" /></view>
                </view>
            </scroll-view>
        </view>
        <!-- fixed -->
        <view class="fixed align-center flex flex-sub padding-lr-sm cu-tabbar-height bg-green">
            <view class="basis-10 relative margin-right-sm">
                <view class="cu-avatar sm radius bg-transparent"><image style="height: 100%;" src="/static/icon/shoppingCart.png"></image></view>
                <view v-if="orderList.num > 0" class="cu-tag badge">{{orderList.num}}</view>
            </view>
            <view class="flex-sub text-lg">
                ￥
                <text class="">{{orderList.money}}</text>
            </view>
            <view class="basis-sm" style="line-height: 1; flex-basis: 43%;">
                <view class="bg-white text-black text-bold  padding-tb-sm radius-sl text-right">
                    <text :data-type="1" @click="gotoConfirm" class="">直接取号</text>
                    <text :data-type="2" @click="gotoConfirm" class="text-white bg-green radius-sl padding-xs padding-lr-sm margin-xs">点单排号</text>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
import GoodsItem from '@/components/GoodsItem.vue';
import api from '@/common/api.js';
export default {
    components: {
        GoodsItem
    },
    data() {
        return {
            StatusBar: this.StatusBar,
            CustomBar: this.CustomBar,
            list: [], // 商品列表
            category: [], // 商品分类列表
            tabCur: 1,
            mainCur: 0,
            verticalNavTop: 0,
            load: true,
            currShop: {},
            wait: 0,
            orderList: {
                num: 0,
                list: [],
                money: '0'
            }
        };
    },
    onLoad(option) {
        uni.showLoading({
            title: '加载中...',
            mask: true
        });
        console.log('option', option);
        this.init(option);
    },
    onReady() {
        console.log(this.StatusBar, this.CustomBar, '...StatusBar');
    },
    computed: {
        topx() {
            return Number(uni.upx2px(200)) + Number(this.CustomBar);
        }
    },
    methods: {
        init(option) {
            const self = this;
            uni.request({
                url: api.product,
                method: 'get',
                data: {
                    shop_id: option.shopId,
                },
                success: res => {
                    console.log(api.product, res);
                    uni.hideLoading();
                    if (res.statusCode === 200 && res.data.code === '1000') {
                        uni.setStorageSync('shopInfo', res.data.data.shop); // 更新一下，以免出问题
                        self.currShop = res.data.data.shop;
                        self.wait = res.data.data.waiting;
                        // 构造数据
                        const category = [...res.data.data.category];
                        const product = [...res.data.data.product];
                        product.forEach(item => { item.num = 0 }); // 插入num数据，记录数量
                        category.forEach(item => { item.list = product.filter(one => one.c_id === item.id) }); // 把商品插入分类中；
                        self.list = [...category];
                    } else {
                        uni.showToast({
                            icon: 'none',
                            title: '获取数据异常'
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
        TabSelect(e) {
            this.tabCur = e.currentTarget.dataset.id;
            this.mainCur = e.currentTarget.dataset.id;
            this.verticalNavTop = (e.currentTarget.dataset.id - 1) * 50;
            console.log('tabselet', this.tabCur, this.mainCur, this.verticalNavTop);
        },

/* eslint-disable */
        VerticalMain(e) {
            // #ifdef MP-ALIPAY
            return false; // 支付宝小程序暂时不支持双向联动
            // #endif
            let tabHeight = 0;
            if (this.load) {
                for (let i = 0; i < this.list.length; i++) {
                    let view = uni.createSelectorQuery().select('#main-' + this.list[i].id);
                    view.fields(
                        {
                            size: true
                        },
                        data => {
                            console.log(data, '...data');
                            this.list[i].top = tabHeight;
                            tabHeight = tabHeight + data.height;
                            this.list[i].bottom = tabHeight;
                        }
                    ).exec();
                }
                this.load = false;
            }
            let scrollTop = e.detail.scrollTop + 10;
            for (let i = 0; i < this.list.length; i++) {
                if (scrollTop > this.list[i].top && scrollTop < this.list[i].bottom) {
                    this.verticalNavTop = (this.list[i].id - 1) * 50;
                    this.tabCur = this.list[i].id;
                    console.log(scrollTop);
                    return false;
                }
            }
        },
        
        /* eslint-enable */
        add(i, index) {
            this.list[index].list[i].num++;
            this.changeOrder(i, index, 'add');
        },
        minus(i, index) {
            this.list[index].list[i].num--;
            this.changeOrder(i, index, 'minus');
        },
        changeOrder(i, index, type) {
            const oldMoney = this.orderList.money;
            const currItem = { ...this.list[index].list[i] };
            if (type === 'add') {
                this.orderList.num++;
                this.orderList.money = Number(Number(oldMoney) + Number(currItem.price)).toFixed(2);
                // 添加list
                if (currItem.num === 1) {
                    this.orderList.list.push(currItem);
                } else {
                    const key = currItem.name;
                    this.orderList.list.forEach((item, index) => {
                        if (item.name === key) {
                            item.num++;
                        }
                    });
                }
            } else if (type === 'minus') {
                this.orderList.num--;
                this.orderList.money = Number(Number(oldMoney) - Number(currItem.price)).toFixed(2);
                // 删除list
                if (currItem.num === 0) {
                    const key = currItem.name;
                    const resultList = this.orderList.list.filter(item => item.name !== key);
                    this.orderList.list = [...resultList];
                } else {
                    const key = this.list[index].list[i].name;
                    this.orderList.list.forEach((item, index) => {
                        if (item.name === key) {
                            item.num--;
                        }
                    });
                }
            }
            console.log(this.orderList, '..orderList');
        },
        gotoConfirm(e) {
            const self = this;
            const type = e.currentTarget.dataset.type;
            const shopId = this.currShop.id;
            uni.setStorageSync(`goodsList`, this.orderList);
            if (this.currShop.way === 1) { // 点单
                // 直接取号
                if (type === 2) {
                    uni.showToast({
                        icon: 'none',
                        title: '不可以点单排号'
                    });
                    return;
                }
                const url = `/pages/callNumber/index?shopId=${shopId}&wait=${self.wait}`;
                uni.navigateTo({ url });
            } else if (this.currShop.way === 2) { // 排号
                // 跳转确定页面
                if (type === 1) {
                    uni.showToast({
                        icon: 'none',
                        title: '不可以直接取号'
                    });
                    return;
                }
                uni.navigateTo({
                    url: `/pages/confirmOrder/index?shopId=${shopId}&type=${type}&wait=${self.wait}`
                });
            } else {
                uni.showToast({
                    icon: 'none',
                    title: '稍等'
                });
                setTimeout(() => {
                    uni.navigateTo({
                        url: `/pages/confirmOrder/index?shopId=${shopId}&type=${type}&wait=${self.wait}`
                    });
                }, 1000);

            }
            // if (this.orderList.num === 0) {
            // 	uni.showToast({
            // 		icon:'none',
            // 		title: '当前状态无法叫号'
            // 	});
            // 	return;
            // }


        }
    }
};
</script>

<style>
.VerticalNav.nav {
  width: 200upx;
  white-space: initial;
  background-color: #f1f1f1;
}

.VerticalNav.nav .cu-item {
  width: 100%;
  text-align: center;
  background-color: #f1f1f1;
  margin: 0;
  border: none;
  height: 50px;
  position: relative;
}

.VerticalNav.nav .cu-item.cur {
  background-color: #fff;
}

.VerticalNav.nav .cu-item.cur::after {
  content: '';
  width: 8upx;
  height: 30upx;
  border-radius: 10upx 0 0 10upx;
  position: absolute;
  background-color: currentColor;
  top: 0;
  right: 0upx;
  bottom: 0;
  margin: auto;
}

.VerticalBox {
  display: flex;
}

.VerticalMain {
  background-color: #fff;
  flex: 1;
}

.fixed {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
