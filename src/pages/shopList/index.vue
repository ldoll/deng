<template>
	<view class="body bg-white">
		<cu-custom class="text-bold" bgColor="bg-green" :isBack="true"><block slot="backText"></block><block slot="content">餐饮等位</block></cu-custom>
		<view class="padding-lr bg-green">
			<view class="cu-bar search bg-green">
				<view class="search-form round ma" style="margin:0;">
					<text class="cuIcon-search"></text>
					<input @focus="InputFocus" @blur="InputBlur" :adjust-position="false" type="text" placeholder="搜索周边商家等位" confirm-type="search" />
				</view>
			</view>
		</view>
		<!-- 热门搜索 -->
		<view class="text-gray padding">热门搜索</view>
		<view class="padding">
			<button class='cu-btn line-gray margin-right'>餐饮美食</button>
			<button class='cu-btn line-gray margin-right' >餐饮美食</button>

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
				href: 'https://uniapp.dcloud.io/component/README?id=uniui'
			}
		},
		methods: {

		}
	}
</script>

<style scoped>
	.body {
		
	}
</style>
