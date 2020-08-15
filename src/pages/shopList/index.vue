<template>
    <view :style="'min-height:calc(100vh - env(safe-area-inset-bottom) / 2)'" class="body bg-white">
        <cu-custom :isBack="true" :canBack="canBack" @changeCanBack="changeCanBack" class="text-bold" bgColor="bg-green">
            <block slot="backText"></block>
            <block slot="content">{{title}}</block>
        </cu-custom>
        <view>
            <!-- search -->
            <view :class="[!Hot ? 'bg-white' : 'bg-green']" class="cu-bar search padding-lr">
                <view :class="[!Hot ? 'bg-white' : 'bg-green']" class="search-form round" style="margin: 0;">
                    <text class="cuIcon-search"></text>
                    <input
                        id="inputSearch"
                        :focus="autofocus"
                        :value="inputValue"
                        :adjust-position="false"
                        @focus="InputFocus"
                        @blur="InputBlur"
                        @confirm="InputConfirm"
                        @input="onKeyInput"
                        maxlength="20"
                        type="text"
                        placeholder="搜索周边商家等位"
                        confirm-type="search"
                    />
                </view>
                <view v-if="!Hot" class="action margin-left">
                    <text :class="searchType === 'distance' ? 'text-black text-bold' : ''" @click="changeSearchType" data-type="distance" class="margin-right">距离最近</text>
                    <text :class="searchType === 'wait' ? 'text-black text-bold' : ''" @click="changeSearchType" data-type="wait">排队最短</text>
                </view>
            </view>
            <!-- list -->
            <view v-if="!Hot">
                <view v-for="(item, i) in currShopList" :key="i" class="margin-lr"><ShopItem :item="item" @gotoGoods="gotoGoods" /></view>
            </view>
            <!-- 热门搜索 -->
            <view v-if="Hot" class="padding-lr">
                <view class="text-gray padding">热门搜索</view>
                <view class="padding">
                    <button
                        v-for="(item,i) in hotList"
                        :key="i"
                        :data-type="item.name"
                        :class="keyWord === item.name ? 'bg-green' : 'line-gray'"
                        @click="changeKeyWord"
                        class="cu-btn margin-right"
                    >
                        {{item.name}}
                    </button>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
import ShopItem from '@/components/ShopItem';
import api from '@/common/api.js';
export default {
    components: {
        ShopItem
    },
    data() {
        return {
            Hot: false,
            title: '',
            canBack: true,
            searchType: '',
            keyWord: '',
            autofocus: false,
            type: '',
            hotList: [
                {
                    name: '餐饮'
                },
                {
                    name: '商超'
                }, {
                    name: '医院'
                }, {
                    name: '银行'
                },
            ],
            shopList: [],
            currShopList: [],
            inputValue: '',
            now: '',
            option: {},
        };
    },
    onLoad(option) {
        const self = this;
        self.type = option.type;
        self.option = option;
        if (option.type === 'search') {
            self.Hot = true;
            self.canBack = true;
            self.autofocus = true;
            self.changeTitle();
        } else {
            self.init();
        }
        this.now = new Date().getTime();
        console.log('是否可以返回，是否自动焦点 ', this.canBack, this.autofocus);
    },
    computed: {
        topx() {
            return Number(uni.upx2px(100));
        }
    },
    methods: {
        init() {
            uni.showLoading({
                title: '加载中'
            });
            const self = this;
            uni.request({
                url: api.allShops,
                method: 'get',
                data: {
                    lat: self.option.lat,
                    lng: self.option.lng,
                },
                success: res => {
                    // openId、或SessionKdy存储//隐藏loading
                    console.log(api.allShops, res);
                    uni.hideLoading();
                    if (res.statusCode === 200 && res.data.code === '1000') {
                        self.shopList = res.data.data.data;
                        self.changeCurrShopList();
                        self.changeCanBack();
                    } else {
                        uni.showToast({
                            icon: 'none',
                            title: res.data.msg || '获取商户列表失败'
                        });
                    }
                },
                error: res => {
                    console.log('shibai', res);
                    uni.showToast({
                        icon: 'none',
                        title: '获取商户列表失败'
                    });
                }
            });
        },
        changeTitle() {
            switch (this.type) {
                case 'search':
                    this.title = '等位订单';
                    break;
                case 'diningRoom':
                    this.title = '餐饮等位';
                    break;
                case 'ServiceHall':
                    this.title = '办事大厅';
                    break;
                case 'ExperienceStore':
                    this.title = '体验店';
                    break;
                case 'bank':
                    this.title = '医院银行';
                    break;
                default:
                    this.title = '等位订单';
                    break;
            }
        },
        InputFocus() {
            this.Hot = true;
            if (this.type !== 'search') {
                this.canBack = false;
            }
            this.title = '等位订单';
            console.log('获得焦点，canback', this.canBack);
        },
        changeCanBack() {
            this.Hot = false;
            this.canBack = true;
            this.changeTitle();
            console.log('改变canback，canback', this.canBack);
        },
        InputBlur() {
            // this.Hot = false;
        },
        changeCurrShopList() {
            const self = this;
            let arr = [...this.shopList];
            // type
            // if (this.type && this.type !== 'search') {
            // 	arr = arr.filter(item => item.type === this.type);
            // }
            // classify    分类，1-餐饮，2-体验店，3-办事大厅，4-医院银行
            if (self.type === 'diningRoom') {
                arr = arr.filter(item => item.classify === 1);
            } else if (self.type === 'ExperienceStore') {
                arr = arr.filter(item => item.classify === 2);
            } else if (self.type === 'ServiceHall') {
                arr = arr.filter(item => item.classify === 3);
            } else if (self.type === 'bank') {
                arr = arr.filter(item => item.classify === 4);
            }
            if (this.searchType === 'distance') {
                arr = arr.sort((a, b) => a.distance - b.distance);
            } else if (this.searchType === 'wait') {
                arr = arr.sort((a, b) => a.count - b.count);
            }
            this.currShopList = [...arr];
        },
        changeSearchType(e) {
            if (this.searchType === e.currentTarget.dataset.type) {
                this.searchType = '';
            } else {
                this.searchType = e.currentTarget.dataset.type;
            }
            console.log(this.searchType, '...searchType');
            this.changeCurrShopList();
        },
        changeKeyWord(e) {
            if (this.keyWord === e.currentTarget.dataset.type) {
                this.keyWord = '';
            } else {
                this.now = new Date().getTime();
                this.keyWord = e.currentTarget.dataset.type;
                setTimeout(() => {
                    this.inputValue = e.currentTarget.dataset.type;
                    console.log('给input赋值', e.currentTarget.dataset.type, this.inputValue);
                }, 200);
                this.InputConfirm();
                console.log('点击了keyword', this.keyWord, this.now);
            }
        },
        onKeyInput(e) {
            this.inputValue = e.target.value;
            const now = new Date().getTime();
            const timelength = now - this.now;
            console.log('输入了', e.target.value, now, timelength);
            if (timelength > 200) {
                if (this.keyWord) {
                    this.keyWord = '';
                    console.log('清空keyword');
                }
            }
        },
        InputConfirm() {
            const self = this;
            const keyword = self.keyWord || self.inputValue;
            console.log('准备提交', keyword);
            if (keyword) {
                self.postSearch(keyword);
            } else {
                self.init();
            }

        },
        postSearch(keyword) {
            const self = this;
            uni.showLoading({
                title: '搜索中'
            });
            uni.request({
                url: api.search,
                method: 'post',
                data: {
                    keyword,
                },
                success: res => {
                    console.log(api.search, res);
                    uni.hideLoading();
                    if (res.statusCode === 200 && res.data.code === '1000') {
                        self.shopList = res.data.data;
                        this.changeCanBack();
                        this.changeCurrShopList();
                    } else {
                        uni.showToast({
                            icon: 'none',
                            title: res.data.msg || '搜索失败'
                        });
                    }
                },
                error: res => {
                    console.log('shibai', res);
                    uni.showToast({
                        icon: 'none',
                        title: '获取数据失败'
                    });
                }
            });

        },
        gotoGoods(id) {
            uni.navigateTo({
                url: `/pages/goodsList/index?shopId=${id}`
            });
        }
    }
};
</script>
