<template>
	<view class="body">
		<cu-custom class="text-bold" bgColor="bg-green" :isBack="true"><block slot="backText"></block><block slot="content">确认订单</block></cu-custom>
		<view class="flex bg-white justify-between padding align-center">
			<text class="text-lg text-black">排号说明</text>
			<text class="text-sm text-gray">前面现在有<text class="text-lg padding-xs text-green">12</text>名顾客在排队</text>
		</view>
		<view class="padding-lr-sm  margin-lr-sm margin-top-sm bg-white ">
			<viwe class="solid-bottom flex padding-tb-sm">
				<text class="text-lg text-black">点单说明</text>
			</viwe>
		</view>
		<!-- 商品 -->
		<view class="padding-lr-sm padding-tb-xs margin-lr-sm bg-white">
			<viwe class="flex align-center  padding-tb-xs text-sm">
				<text class="basis-xl text-black">洗茶苹果味</text>
				<text class="basis-xs text-center text-gray">X1</text>
				<text class="text-black">￥16</text>
			</viwe>
			<viwe class="flex align-center padding-tb-xs">
				<text class="text-sm basis-xl text-black">洗茶苹果味</text>
				<text class="text-sm basis-xs text-center text-gray">X1</text>
				<text class="text-sm text-black">￥16</text>
			</viwe>
			<viwe class="flex align-center padding-tb-xs">
				<text class="text-sm basis-xl text-black">洗茶苹果味</text>
				<text class="text-sm basis-xs text-center text-gray">X1</text>
				<text class="text-sm text-black">￥16</text>
			</viwe>
			<viwe class="flex align-center padding-tb-xs">
				<text class="text-sm basis-xl text-black">洗茶苹果味</text>
				<text class="text-sm basis-xs text-center text-gray">X1</text>
				<text class="text-sm text-black">￥16</text>
			</viwe>
			<viwe class="flex align-center padding-tb-xs">
				<text class="text-sm basis-xl text-black">洗茶苹果味</text>
				<text class="text-sm basis-xs text-center text-gray">X1</text>
				<text class="text-sm text-black">￥16</text>
			</viwe>
			<viwe class="flex align-center padding-tb-xs">
				<text class="text-sm basis-xl text-black">洗茶苹果味</text>
				<text class="text-sm basis-xs text-center text-gray">X1</text>
				<text class="text-sm text-black">￥16</text>
			</viwe>
			<viwe class="flex align-center padding-tb-xs">
				<text class="text-sm basis-xl text-black">洗茶苹果味</text>
				<text class="text-sm basis-xs text-center text-gray">X1</text>
				<text class="text-sm text-black">￥16</text>
			</viwe>
			<viwe class="flex align-center padding-tb-xs">
				<text class="text-sm basis-xl text-black">洗茶苹果味</text>
				<text class="text-sm basis-xs text-center text-gray">X1</text>
				<text class="text-sm text-black">￥16</text>
			</viwe>
			<viwe class="flex align-center padding-tb-xs">
				<text class="text-sm basis-xl text-black">洗茶苹果味</text>
				<text class="text-sm basis-xs text-center text-gray">X1</text>
				<text class="text-sm text-black">￥16</text>
			</viwe>
			<viwe class="flex align-center padding-tb-xs">
				<text class="text-sm basis-xl text-black">洗茶苹果味</text>
				<text class="text-sm basis-xs text-center text-gray">X1</text>
				<text class="text-sm text-black">￥16</text>
			</viwe>
			<viwe class="flex align-center padding-tb-xs">
				<text class="text-sm basis-xl text-black">洗茶苹果味</text>
				<text class="text-sm basis-xs text-center text-gray">X1</text>
				<text class="text-sm text-black">￥16</text>
			</viwe>
		</view>
		<!-- 小计 -->
		<view class="padding-lr-sm  margin-lr-sm bg-white flex justify-end">
			<viwe class="solid-top flex-sub text-right  text-black padding-tb-sm">
				<text class="text-sm ">共计3个商品,小记￥<text class=" text-xxl">16</text></text>
			</viwe>
		</view>
		<view class="padding-lr-sm  margin-lr-sm margin-top-sm bg-white ">
			<viwe class="solid-bottom text-df padding-tb-sm flex justify-between">
				<text class="text-black">您的桌号</text>
				<text class="text-gray">必选<text class="sm text-gray cuIcon-right"></text></text>
			</viwe>
		</view>
		<view class="padding-lr-sm  margin-lr-sm  bg-white ">
			<viwe class="text-df padding-tb-sm flex justify-between">
				<text class="text-black">支付方式</text>
				<text class="text-green">在线支付</text>
			</viwe>
			<view class="cu-form-group ">
				<textarea class="bg-gray textarea" maxlength="-1" @input="textareaAInput" placeholder="更多备注信息"></textarea>
			</view>
		</view>
		<view class="cu-tabbar-height margin-top-sm"></view>
		<view class="fixedItem flex justify-between text-lg bg-white align-center">
			<view class="text-black text-bold padding">￥16.４</view>
			<view class=" text-white bg-green basis-30 padding text-center">支付</view>
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

<style  scoped>
	.bt-gray{
		border-top:20upx solid #f1f1f1;
	}
	.cu-form-group{
		padding: 0;
	}
	.textarea{
		margin-top: 0;
		padding: 20upx;
		border-radius: 10upx;
		min-height: 200upx;
	}
	.basis-30{
		flex-basis: 30%;
	}
	.fixedItem{
		position: fixed;
		bottom: 0;
		width: 100%;
	}
</style>