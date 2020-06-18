<template>
	<view class="body">
		<cu-custom class="text-bold" bgColor="bg-green" :isBack="true"><block slot="backText"></block><block slot="content">餐饮等位</block></cu-custom>
		<view class="cu-list menu-avatar padding-bottom bg-green"> 
			<view class="cu-item">
				<view class="cu-avatar round lg" style="background-image:url(https://ossweb-img.qq.com/images/lol/img/champion/Morgana.png);"></view>
				<view class="content">
					<view class="text-white title">Hello,等位中国石强</view>
					<view class="text-white text-sm">点餐排队更高效</view>
				</view>
				<view class="rightRadius">
					<view class="rightBox">
						<view class="bg-img rightImg" :style="[{ backgroundImage:'url(/static/icon/BarCode.png)' }]"></view>
						<text class="text-black text-xs">消费券</text >

					</view>
				</view>
			</view>
		</view>
		<!-- banner -->
		<swiper class="screen-swiper square-dot swiperCss"  :indicator-dots="true" :circular="true"
		 :autoplay="true" interval="5000" duration="500">
			<swiper-item v-for="(item,index) in swiperList" :key="index">
				<image :src="item.url" mode="aspectFill" v-if="item.type=='image'"></image>
			</swiper-item>
		</swiper>
		<view class="padding-left bg-white ">
			<viwe class="solid-bottom padding-right text-df listItem flex align-center">
				<view class="bg-img leftImg" :style="[{ backgroundImage:'url(/static/icon/consumerCoupon.png)' }]"></view>
				<text class="text-black basis-lg ">我的消费券</text>
				<text class="text-gray cuIcon-right flex-sub text-right"></text>
			</viwe>
		</view>
		<view class="padding-left bg-white ">
			<viwe class=" padding-right text-df listItem flex align-center">
				<view class="bg-img leftImg" :style="[{ backgroundImage:'url(/static/icon/order.png)' }]"></view>
				<text class="text-black basis-lg">我的订单</text>
				<text class="text-gray cuIcon-right flex-sub text-right"></text>
			</viwe>
		</view>
		<view class="padding-left bg-white margin-top-lg">
			<viwe class=" padding-right solid-bottom text-df listItem flex align-center">
				<view class="bg-img leftImg" :style="[{ backgroundImage:'url(/static/icon/customerService.png)' }]"></view>
				<text class="text-black basis-lg">在线客服</text>
				<text class="text-gray cuIcon-right flex-sub text-right"></text>
			</viwe>
		</view>
		<view class="padding-left bg-white ">
			<viwe class=" padding-right solid-bottom text-df listItem flex align-center">
				<view class="bg-img leftImg" :style="[{ backgroundImage:'url(/static/icon/SettleIn.png)' }]"></view>
				<text class="text-black basis-lg">商户入住</text>
				<text class="text-gray cuIcon-right flex-sub text-right"></text>
			</viwe>
		</view>
		<view class="padding-left bg-white ">
			<viwe class="  padding-right text-df listItem flex align-center">
				<view class="bg-img leftImg" :style="[{ backgroundImage:'url(/static/icon/aboutMe.png)' }]"></view>
				<text class="text-black basis-lg">关于我们</text>
				<text class="text-gray cuIcon-right flex-sub text-right"></text>
			</viwe>
		</view>
		<!-- 退出登录 -->
		<view class="padding-lr-xl  margin-xl ">
			<viwe class="bg-white text-df padding-tb-sm flex align-center text-center">
				<text class="text-black flex-sub">退出登录</text>
			</viwe>
		</view>
		<view class="cu-tabbar-height"></view>
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
				href: 'https://uniapp.dcloud.io/component/README?id=uniui',
				PageCur: 'my',
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

		}
	}
</script>

<style scoped>
	.cu-list.menu-avatar>.cu-item{
		background-color: #39b54a;
	}
	.cu-list.menu-avatar>.cu-item .content>uni-view:first-child{
		font-size: 32upx;
	}
	.cu-list.menu-avatar>.cu-item:after, .cu-list.menu>.cu-item:after{
		opacity:0;
	}
	.rightRadius {
		position: absolute;
		right: 0;
		width: 120upx;
		height: 120upx;
		top: 0;
		background: white;
		border-bottom-left-radius: 5000upx;
		text-align: center;
	}
	.rightBox{
		position: absolute;
		right: 10upx;
	}
	.rightImg{
		height: 40upx;
		background-size: contain;
    	background-position: center;
	}
	.swiperCss{
		overflow: hidden;
	}
	.screen-swiper{
		min-height:200upx;
	}
	.leftImg {
		display: inline-block;
		margin-right: 16upx;
		width: 1.6em;
		height: 1.6em;
		vertical-align: middle;
	}
	.solid-bottom::after{
		left: calc( 1.6em + 16upx );
	}
	.listItem{
		height: 88upx;
	}
	.padding-left.bg-white{
		overflow: hidden;
	}

</style>
