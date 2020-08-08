<template>
    <view>
        <view :style="[{ height: CustomBar + 'px' }]" class="cu-custom">
            <view :style="style" :class="[bgImage !== '' ? 'none-bg text-white bg-img' : '',bgColor]" class="cu-bar fixed">
                <view v-if="isBack" @tap="BackPage" class="action">
                    <text class="cuIcon-back"></text>
                    <slot name="backText"></slot>
                </view>
                <view :style="[{ top: StatusBar + 'px' }]" class="content">
                    <slot name="content"></slot>
                </view>
                <slot name="right"></slot>
            </view>
        </view>
    </view>
</template>
<script>
export default {
    name: 'CuCustom',
    props: {
        bgColor: {
            type: String,
            default: ''
        },
        isBack: {
            type: [Boolean, String],
            default: false
        },
        bgImage: {
            type: String,
            default: ''
        },
        canBack: {
            type: [Boolean, String],
            default: true
        }
    },
    data() {
        return {
            StatusBar: this.StatusBar,
            CustomBar: this.CustomBar
        };
    },
    computed: {
        style() {
            let StatusBar = this.StatusBar;
            let CustomBar = this.CustomBar;
            let bgImage = this.bgImage;
            let style = `height:${CustomBar}px;padding-top:${StatusBar}px;`;
            if (this.bgImage) {
                style = `${style}background-image:url(${bgImage});`;
            }
            return style;
        }
    },
    methods: {
        BackPage() {
            if (!this.canBack) {
                this.$emit('changeCanBack');
            } else {
                uni.navigateBack({
                    delta: 1
                });
            }
        }
    }
};
</script>
