```vue
<template>
    <view class="birth-time">
    	<view class="layout">
    		
			<view class="wrap">
				<picker-view class="wrap-height" v-if="visible" :indicator-style="indicatorStyle" :value="value" @change="bindChange">
					<picker-view-column>
						<view class="item" v-for="(item,index) in years" :key="index">{{item}}{{$t('verify.y')}}</view>
					</picker-view-column>
					<picker-view-column>
						<view class="item" v-for="(item,index) in months" :key="index">{{item}}{{$t('verify.m')}}</view>
					</picker-view-column>
					<picker-view-column>
						<view class="item" v-for="(item,index) in days" :key="index">{{item}}{{$t('verify.d')}}</view>
					</picker-view-column>
				</picker-view>
			</view>
			
			<view class="title">
				<text class="fl" @click="cancel">{{$t('verify.cancel')}}</text>
				<!-- <text class="h2">日期选择</text> -->
				<text class="fr" @click="confirm">{{$t('verify.confirm')}}</text>
			</view>
    	</view>
    </view>
</template>

<script>
export default {
	data(){
		var date = new Date()
		var years = []
		var year = date.getFullYear()
		var months = []
		var month = date.getMonth() + 1
		var days = []
		var day = date.getDate()
		for (let i = 1990; i <= date.getFullYear(); i++) {
			years.push(i)
		}
		for (let i = 1; i <= 12; i++) {
			months.push(i)
		}
		for (let i = 1; i <= 31; i++) {
			days.push(i)
		}
		return {
			title: 'picker-view',
			years,
			year,
			months,
			month,
			days,
			day,
			value: [9999, month - 1, day - 1],
			visible: true,
			indicatorStyle: `height: ${Math.round(uni.getSystemInfoSync().screenWidth/(750/100))}px;`,
		}
	},
	methods: {
		number(val){
			if (val < 10){
				return '0' + val
			}else{
				return val
			}
		},
		cancel(){
			this.$emit('cancel')
		},
		confirm(){
			var y = this.number(this.year)
			var m = this.number(this.month)
			var d = this.number(this.day)
			this.$emit('confirm', `${y}/${m}/${d}`)
		},
		bindChange(e) {
			const val = e.detail.value
			this.year = this.years[val[0]]
			this.month = this.months[val[1]]
			this.day = this.days[val[2]]
		}
	}
}
</script>

<style scoped lang="stylus">
	
	.birth-time
		position fixed
		left 0
		right 0
		bottom 0
		top 0
		background-color rgba(#000, .3)
		z-index 99
		visibility hidden
		&.active
			visibility initial
			.layout
				transition-delay 200ms
				bottom 0
		.layout
			background-color #fff
			position absolute
			left 0
			right 0
			bottom -500upx
			height 644upx
			transition .2s
			.title
				display flex
				justify-content space-between
				height 94upx
				padding 0 70upx 
				position absolute
				bottom 51upx
				width 100%
				box-sizing border-box
				text
					line-height 94upx
					display inline-block
					width 285upx
					border-radius 8upx
					background #F2F2F2
					color #333333
					font-size 36upx
					text-align center
					
				.fr
					color #f7224e
					background #ED5349
					color #FFFFFF
					
			.wrap
				height 410upx
				.wrap-height
					height 100%
					.item
						text-align center
						display flex
						align-items center
						justify-content center
</style>

```