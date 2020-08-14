<template>
    <view>
        <home v-if="PageCur === 'home'"></home>
        <call :opt="opt" @clearOption="clearOption" v-if="PageCur === 'call'"></call>
        <my v-if="PageCur === 'my'"></my>
        <view class="cu-bar tabbar bg-white shadow foot">
            <view @click="NavChange" class="action" data-cur="home">
                <view class="cuIcon-cu-image">
                    <image :src="'/static/icon/home' + [PageCur === 'home' ? 'Active' : ''] + '.png'"></image>
                </view>
                <view :class="PageCur === 'home' ? 'text-green' : 'text-gray'">首页</view>
            </view>
            <view @click="NavChange" class="action" data-cur="call">
                <view class="cuIcon-cu-image">
                    <image :src="'/static/icon/call' + [PageCur === 'call' ? '' : ''] + '.png'"></image>
                </view>
                <view :class="PageCur === 'call' ? 'text-green' : 'text-gray'">叫号</view>
            </view>
            <view @click="NavChange" class="action" data-cur="my">
                <view class="cuIcon-cu-image">
                    <image :src="'/static/icon/my' + [PageCur === 'my' ? 'Active' : ''] + '.png'"></image>
                </view>
                <view :class="PageCur === 'my' ? 'text-green' : 'text-gray'">我的</view>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            PageCur: 'home',
            opt: {},
        };
    },
    onLoad(option) {
        this.PageCur = option.curr;
        this.opt = option;
        console.log('onload', option);
    },
    // beforeCreate:function(){
    // 	console.log('1-beforeCreate 初始化之后');
    // },
    // created:function(){
    // 	console.log('2-created 创建完成');
    // },
    // beforeMount:function(){
    // 	console.log('3-beforeMount 挂载之前');
    // },
    // mounted:function(){
    // 	console.log('4-mounted 被创建');
    // },
    // beforeUpdate:function(){
    // 	console.log('5-beforeUpdate 数据更新前');
    // },
    // updated:function(){
    // 	console.log('6-updated 被更新后');
    // },
    // activated:function(){
    // 	console.log('7-activated');
    // },
    // deactivated:function(){
    // 	console.log('8-deactivated');
    // },
    // beforeDestroy:function(){
    // 	console.log('9-beforeDestroy 销毁之前');
    // },
    // destroyed:function(){
    // 	console.log('10-destroyed 销毁之后')
    // },
    methods: {
        NavChange: function(e) {
            this.PageCur = e.currentTarget.dataset.cur;
        },
        clearOption() {
            this.opt = {};
        }
    }
};
</script>
