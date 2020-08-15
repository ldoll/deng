<template>
    <view>
        <cu-custom :isBack="false" class="text-bold" bgColor="bg-green">
            <block slot="backText"></block>
            <block slot="content">ALLELE等位叫号</block>
        </cu-custom>
        <view class="box">
            <view class="conent">
                <view class="bgImage"></view>
                <view class="flex justify-center">
                    <view>
                        <view class="cu-avatar xl radius bg-transparent"><image src="/static/icon/login.svg"></image></view>
                        <view class="text-sm text-gray text-center">会员中心</view>
                    </view>
                </view>
                <view class="entrance">
                    <!-- 需要使用 button 来授权登录 -->
                    <button v-if="canIUse" @getuserinfo="wxGetUserInfo" class="entranceBtn" open-type="getUserInfo" withCredentials="true"
                            lang="zh_CN">
                        微信登录
                    </button>
                </view>
            </view>
        </view>
    </view>
</template>
<script>
import api from '@/common/api.js';
export default {
    data() {
        return {
            canIUse: uni.canIUse('button.open-type.getUserInfo'),
            provider: '',
        };
    },
    onLoad(option) {
        const self = this;
        uni.getProvider({
            service: 'oauth',
            success: function(res) {
                console.log('getProvider:', res);
                self.provider = res.provider[0];
            }
        });
    },
    beforeMount() {
        console.log('我是beforeCreate生命周期');
    },
    methods: {
        wxGetUserInfo() {
            let self = this;
            uni.getUserInfo({
                provider: self.provider,
                success: function(infoRes) {
                    uni.setStorageSync('wxInfo', infoRes);
                    self.wxLogin();
                },
                fail(res) {
                    console.log('wxGetUserInfo error');
                }
            });
        },
        wxLogin() {
            uni.login({
                success(res) {
                    if (res.code) {
                        const wxInfo = uni.getStorageSync('wxInfo');
                        console.log('wxInfo:', wxInfo);
                        if (wxInfo === null || wxInfo === '') {
                            uni.navigateTo({
                                url: '/pages/login/login'
                            });
                        } else {
                            uni.request({
                                url: api.login,
                                method: 'POST',
                                data: {
                                    code: res.code,
                                    encryptedData: wxInfo.encryptedData,
                                    iv: wxInfo.iv,
                                    nickName: wxInfo.userInfo.nickName,
                                    avatarUrl: wxInfo.userInfo.avatarUrl,
                                    // sex: wxInfo.userInfo.sex
                                },
                                success: res => {
                                    // openId、或SessionKdy存储//隐藏loading
                                    console.log(api.login, res);
                                    if (res.statusCode === 200 && res.data.code === '1000') {
                                        // save wx info
                                        uni.setStorageSync('userInfo', res.data.msg);
                                        const url = `/pages/index/index`;
                                        uni.redirectTo({ url });
                                    } else {
                                        console.log('doLogin fail');
                                        uni.showToast({
                                            icon: 'none',
                                            title: res.data.msg || '登录失败'
                                        });
                                    }
                                },
                                error: res => {
                                    console.log('shibai', res);
                                    uni.showToast({
                                        icon: 'none',
                                        title: '登录失败'
                                    });
                                }
                            });
                        }
                    } else {
                        console.log('wxLogin fail！' + res.errMsg);
                    }
                }
            });
        }
    }
};
</script>

<style>
  .box {
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: #fff;
  }

  .conent {
    position: fixed;
    width: 100%;
    height: 30%;
    top: 23%;
  }

  .bgImage {
    display: flex;
    justify-content: center;
    margin: 0 auto;
    height: 100%;
  }

  .entrance {
    position: fixed;
    width: 100%;
    top: 73%;
  }

  .entranceBtn {
    width: 80%;
    background: #36ab60;
    border-radius: 8upx;
    font-size: 30upx;
    font-weight: normal;
    color: white;
    line-height: 36px;
    border: none;
  }
</style>
