<template>
	<view class="body bg-white">
		<cu-custom class="text-bold" bgColor="bg-white" :isBack="true"><block slot="backText"></block><block slot="content">ALLELE等位叫号</block></cu-custom>
		<view class="flex justify-center padding-xl margin-xl">
			<view class="cu-avatar xl bg-green round">A0010</view>
		</view>
		<view class="padding text-bold text-xxl text-center">请听到呼叫凭号码取</view>
		<view class="padding text-grey text-xl text-center">
			您前面还有<text class="text-green text-xxl">12</text>名顾客排队
		</view>
		<view class="text-white text-center"><button class="cu-btn bg-green lg">桌号08号</button></view>
		<view class="flex justify-end padding">
			<view>
				<view class="cu-avatar lg bg-grey round">
					<text class="lg text-white cuIcon-check"></text>
				</view>
				<view>确认完成</view>
			</view>
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
				href: 'https://uniapp.dcloud.io/component/README?id=uniui',
				PageCur: 'call',
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
	.cu-avatar.xl{
		width: 300upx;
		height: 300upx;
	}
</style>
