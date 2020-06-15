<template>
	<view class="container">
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
	export default {
		data() {
			return {
				PageCur: 'home'
			}
		},
		methods: {
			NavChange: function(e) {
				this.PageCur = e.currentTarget.dataset.cur
			}

		}
	}
</script>

<style>
	.container {
		
	}
</style>
