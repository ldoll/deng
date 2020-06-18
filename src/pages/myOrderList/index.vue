<template>
	<view class="body bg-white">
		<cu-custom class="text-bold" bgColor="bg-green" :isBack="true"><block slot="backText"></block><block slot="content">餐饮等位</block></cu-custom>
		<OrderItem />
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
