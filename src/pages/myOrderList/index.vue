<template>
	<view class="body bg-gray">
		<cu-custom class="text-bold" bgColor="bg-green" :isBack="true"><block slot="backText"></block><block slot="content">餐饮等位</block></cu-custom>
		<OrderItem  status='wait'/>
		<OrderItem status='ok'/>
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
