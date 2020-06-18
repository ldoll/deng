<template>
	<view class="bg-white">
		<cu-custom class="text-bold" bgColor="bg-white" :isBack="false"><block slot="backText"></block><block slot="content">ALLELE等位叫号</block></cu-custom>
	<view class="padding-lr padding-top">
		<!-- 绿色nav -->
		<view class="bg-green padding radius30">
			<view class="cu-item">
				<view class="content">
					<text class="cuIcon-locationfill text-white"></text>
					<text class="text-whiet">{{gpsAddress.name}}</text>
				</view>
			</view>
			<view class="grid col-3 heightImg">
				<view class="padding-lg heightImg">
					<view class="bg-img hei100 relative" :style="[{ backgroundImage:'url(/static/icon/coupon.png)' }]"><view class='cu-tag badge'>9</view></view>
				</view>
				<view class="padding-lg heightImg">
					<view class="bg-img hei100" :style="[{ backgroundImage:'url(/static/icon/store.png)' }]"></view>
				</view>
				<view class="padding-lg heightImg">
					<view class="bg-img hei100" :style="[{ backgroundImage:'url(/static/icon/store.png)' }]"></view>
				</view>
			</view>
			<view class="grid col-3">
				<view class="text-center">
					<view class="text-df text-bold">消费券</view>
					<view class="text-sm">我的周边店券</view>
				</view>
				<view class="text-center">
					<view class="text-df text-bold">免费入驻</view>
					<view class="text-sm">店铺更高效经营</view>
				</view>
				<view class="text-center">
					<view class="text-df text-bold">等位商城</view>
					<view class="text-sm">智能商用寻呼设备</view>
				</view>
			</view>
		</view>
		<!-- 搜索 -->
		<view class="cu-bar search bg-white">
			<view class="search-form round" style="margin:0;">
				<text class="cuIcon-search"></text>
				<input @focus="InputFocus" @blur="InputBlur" :adjust-position="false" type="text" placeholder="搜索周边商家等位" confirm-type="search" />
			</view>
		</view>
		<!-- 商家分类 -->
		<view class="grid col-4">
			<view class=" heightImg">
				<view class="bg-img hei100 relative" :style="[{ backgroundImage:'url(/static/icon/diningRoom.png)' }]"></view>
			</view>
			<view class=" heightImg">
				<view class="bg-img hei100" :style="[{ backgroundImage:'url(/static/icon/ExperienceStore.png)' }]"></view>
			</view>
			<view class=" heightImg">
				<view class="bg-img hei100" :style="[{ backgroundImage:'url(/static/icon/ServiceHall.png)' }]"></view>
			</view>
			<view class=" heightImg">
				<view class="bg-img hei100" :style="[{ backgroundImage:'url(/static/icon/bank.png)' }]"></view>
			</view>
		</view>
		<view class="grid text-center col-4">
			<view class="text-md text-gray">餐饮等位</view>
			<view class="text-md text-gray">体验店</view>
			<view class="text-md text-gray">办事大厅</view>
			<view class="text-md text-gray">医院银行</view>
		</view>
		<!-- banner -->
		<swiper class="screen-swiper square-dot swiperCss"  :indicator-dots="true" :circular="true"
		 :autoplay="true" interval="5000" duration="500">
			<swiper-item v-for="(item,index) in swiperList" :key="index">
				<image :src="item.url" mode="aspectFill" v-if="item.type=='image'"></image>
				<!-- <video :src="item.url" autoplay loop muted :show-play-btn="false" :controls="false" objectFit="cover" v-if="item.type=='video'"></video> -->
			</swiper-item>
		</swiper>
		<!-- 附近商家 -->
		<view class="flex padding-tb-sm align-center justify-between">
			<view class="text-blod text-xl">附近的等位商家</view>
			<navigator hover-class='none' url='/pages/search/index'  navigateTo >
				<view class="text-sm">更多
					<text class="sm text-gray cuIcon-right"></text>
				</view>
			</navigator>
		</view>
		<GoodsItem/>
		<view class="cu-tabbar-height"></view>
	</view>
		<!-- 底部 -->
		<view class="cu-bar tabbar bg-white shadow foot">
			<view class="action" @click="NavChange" data-cur="home">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/icon/home' + [PageCur=='home'?'Active':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='home'?'text-green':'text-gray'">首页</view>
			</view>
			<view class="action" @click="NavChange" data-cur="call">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/icon/call' + [PageCur == 'call'?'':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='call'?'text-green':'text-gray'">等号</view>
			</view>
			<view class="action" @click="NavChange" data-cur="my">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/icon/my' + [PageCur == 'my'?'Active':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='my'?'text-green':'text-gray'">我的</view>
			</view>
		</view>
	</view>
</template>

<script>
	import GoodsItem from '@/components/GoodsItem';
	export default {
		components: {
			GoodsItem
		},
		data() {
			return {
				PageCur: 'home',
				gpsAddress:{
					name:"北京123",
					point:[123,123]

				},
				InputBottom: 0,
				swiperList: [{
					id: 0,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
				}, {
					id: 1,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big37006.jpg',
				}],
			}
		},
		methods: {
			NavChange: function(e) {
				this.PageCur = e.currentTarget.dataset.cur
			},
			InputFocus(e) {
				this.InputBottom = e.detail.height
			},
			InputBlur(e) {
				this.InputBottom = 0
			},
			gotoSearch(e) {
				uni.navigateTo({
						url: 'pages/search/index',
					});
			}

		}
	}
</script>

<style scoped>
	.radius30{
		border-radius:40upx ;
	}
	.relative{
		position: relative;
	}
	.heightImg{
		height: 180upx;
	}
	.hei100{
		height: 100%;
	}
	.wid100{
		width: 100%;
	}
	.cu-tag.badge{
		border-radius: 200upx;
		position: absolute;
		top: -10upx;
		right: -10upx;
		font-size: 40upx;
		padding: 0upx 10upx;
		height: 40upx;
		color: #ffffff;
	}
	.swiperCss{
		border-radius: 40upx;
		overflow: hidden;
		margin-top: 40upx;
	}
</style>
