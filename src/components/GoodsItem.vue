<template>
	<view class="body">
		<view class="cu-list menu-avatar"> 
			<view class="cu-item">
				<view class="cu-avatar xl radius" style="background-image:url(https://ossweb-img.qq.com/images/lol/img/champion/Morgana.png);"></view>
				<view class="content margin-left">
					<view class="text-black text-bold "><view class="text-cut">麦当劳北京灯饰口店</view></view>
					<view class="text-gray text-sm flex">
						<view class="text-cut padding-right-sm">西餐</view>
						<view class="text-cut">附近100m</view>
					</view>
					<view class="text-gray text-sm flex">
						<view class="text-cut padding-lr-xs margin-right-xs bg-olive radius text-algin">排队</view>
						<view class="text-cut text-sm">前方正在等位<text class="text-red text-lg padding-lr-xs">10</text>位</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			

		}
	}
</script>

<style scoped>
	.cu-list.menu-avatar>.cu-item>.cu-avatar{
		left: 0;
	}
	.cu-avatar.xl{
		width: 140upx;
		height: 140upx;
	}
	.cu-list.menu-avatar>.cu-item{
		height: 160upx;
	}
	.cu-list.menu-avatar>.cu-item:after, .cu-list.menu>.cu-item:after{
		left:calc( 146upx + 30upx );
	}
</style>
