<template>
	<view class="body">
		<view class="cu-list menu-avatar"> 
			<view class="cu-item">
				<view class="cu-avatar lg radius" style="background-image:url(https://ossweb-img.qq.com/images/lol/img/champion/Morgana.png);"></view>
				<view class="content">
					<view class="text-black text-bold ">
						<view class="text-cut">麦当劳北京灯饰口店麦当劳北京灯饰口店</view>
						<view class="">共计￥36</view>
						</view>
					<view class="text-gray text-sm flex">
						<view class="text-cut padding-right-sm">2020-03-18</view>
						<view class="text-cut">11:54</view>
					</view>
					<view class="text-gray text-sm flex">
						<view class="text-cut text-sm">前方正在等位前方正在等位前方正在等位</view>
					</view>
				</view>
				<!-- <view class="action">
					<view class="">共计￥36</view>
					<view class="">共计￥36</view>
				</view> -->
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
	/* .cu-list.menu-avatar>.cu-item>.cu-avatar{
		left: 0;
	}
	.cu-avatar.xl{
		width: 140upx;
		height: 140upx;
	} */
	.cu-list.menu-avatar>.cu-item{
		height: 160upx;
		padding-right: 30upx;
	}
	/* .cu-list.menu-avatar>.cu-item:after, .cu-list.menu>.cu-item:after{
		left:calc( 146upx + 30upx );
	} */
	.cu-list.menu-avatar>.cu-item .action{
		width: 160upx;
		text-align: right;
	}
	.cu-list.menu-avatar>.cu-item .content{
		width: calc(100% - 100upx);
	}
</style>
