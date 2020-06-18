<template>
	<view class="body bg-gray">
		<cu-custom class="text-bold" bgColor="bg-green" :isBack="true"><block slot="backText"></block><block slot="content">消费券</block></cu-custom>
		<scroll-view scroll-x class="bg-white nav">
			<view class="flex text-center">
				<view class="cu-item flex-sub text-bold" :class="index==TabCur?'text-green':''" v-for="(item,index) in TabType" :key="index" @tap="tabSelect" :data-id="index">
					{{item}}
				</view>
			</view>
		</scroll-view>
		<view class="flex justify-center margin-top padding bg-white"><text class="text-gray text-sm">没有更多</text></view>
		<view class="flex justify-center margin-top padding bg-white"><text class="text-gray text-sm">没有更多</text></view>
		<view class="flex justify-center margin-top padding bg-white"><text class="text-gray text-sm">没有更多</text></view>
		<view class="flex justify-center margin-top padding bg-white"><text class="text-gray text-sm">没有更多</text></view>
	</view>
</template>

<script>
import OrderItem from '@/components/OrderItem';
	export default {
		components: {
			OrderItem
		},
		data() {
			return {
				href: 'https://uniapp.dcloud.io/component/README?id=uniui',
				TabCur:0,
				TabType:['全部','美食券','生活券','教育券','其他'],
			}
		},
		methods: {
			tabSelect(e){
				this.TabCur = e.currentTarget.dataset.id;
			}

		}
	}
</script>

<style scoped>
	.body {
		
	}
</style>
