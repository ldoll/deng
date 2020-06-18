<template>
	<view class="body bg-white">
		<cu-custom class="text-bold" bgColor="bg-green" :isBack="true"><block slot="backText"></block><block slot="content">餐饮等位</block></cu-custom>
		<view>
			<view class="cu-bar search padding-lr" :class="[!Hot?'bg-white':'bg-green']">
				<view class="search-form round" :class="[!Hot?'bg-white':'bg-green']"  style="margin:0;">
					<text class="cuIcon-search"></text>
					<input @focus="InputFocus" @blur="InputBlur" :adjust-position="false" type="text" placeholder="搜索周边商家等位" confirm-type="search" />
				</view>
				<view v-if='!Hot' class="action margin-left">
					<text class="margin-right text-black">距离最近</text>
					<text>排队最短</text>
				</view>
			</view>
			<view class="padding-lr" v-if='!Hot'>
				<GoodsItem />
			</view>
			<!-- 热门搜索 -->
			<view class="padding-lr" v-if='Hot'>
				<view class="text-gray padding">热门搜索</view>
				<view class="padding">
					<button class='cu-btn line-gray margin-right'>餐饮美食</button>
					<button class='cu-btn line-gray margin-right' >餐饮美食</button>
				</view>
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
				Hot:false,
			}
		},
		methods: {
			InputFocus() {
				// uni.navigateTo({
				// 	url: '/pages/searchHot/index',
				// })
				this.Hot=true;
			},
			InputBlur(){
				this.Hot=false;
			}

		}
	}
</script>

<style scoped>
	.body {
		
	}
</style>
