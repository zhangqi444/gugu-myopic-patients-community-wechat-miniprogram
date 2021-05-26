<template>
	<view class="container">
		<view class="doctor-details">
			<view class="doctor-picture">
				<image class="doctor-image" :src="item.avatar"></image>
			</view>
			<view class="doctor-info">
				<view class="doctor-simple-info">
					<span class="doctor-name">{{item.name}}</span>
					<span class="doctor-title">{{item.title}}</span>
				</view>
				<view class="header-tag-container">
					<tag class="tag" v-for="(tag, index) in tags" :key="tag._id" :text="tag.name"></tag>
				</view>
				<view class="doctor-hospital">
					<span class="doctor-hospital">{{hospital}}</span>
				</view>
			</view>
		</view>
		<view class="tab-bar-line-width" />
		<view class="doctor-index">
			<view class="consult-numbers">
				<span class="numbers">{{numbers}}</span>
				<label class="doctor-index-name">咨询人数</label>
			</view>
			<view class="tab-bar-column" />
			<view class="response-rate">
				<span class="numbers">{{numbers}}</span>
				<label class="doctor-index-name">回复率</label>
			</view>
			<view class="tab-bar-column" />	
			<view class="response-time">
				<span class="numbers">{{numbers}}</span>
				<label class="doctor-index-name">响应时间</label>
			</view>
		</view>
		<view class="div" />
		<view class="skills-contain">
			<label class="doctor-text-name">擅长主治</label>
			<text class="doctor-text-info">{{item.specialty}}</text>
			<label class="doctor-text-name">个人简介</label>
			<text class="doctor-text-info">{{item.introduction}}</text>
		</view>
		<view class="tab-bar-line" />
		<view class="work-hospitol">
			<label class="doctor-text-hospital">出诊医院</label>
			<text class="doctor-text-info">浙江大学第二附属医院</text>
		</view>
		<view class="div" />
		<view class="">
			<label class="patient-comment ">患者评价</label>
		</view>
	</view>
</template>

<script>
	import tag from "@/components/tag";
	export default {
		components: { tag },
		props: {
			item: { type: Object, default: () => {} }
		}
	}
</script>

<style>
	.container{
		width: 750rpx;
		height: 100%;
	}
	.doctor-details{
		width: 750rpx;
		height: 234rpx;
		flex-direction: row;
	}
	.doctor-picture{
		margin: 42rpx 40rpx 32rpx 30rpx;
		width: 160rpx;
		height: 160rpx;
	}
	.doctor-image{
		width: 160rpx;
		height: 160rpx;
		background-color: #0081FF;		
		border-radius: 80rpx;
	}
	
	.doctor-info{
		flex-direction: column;
		margin-top: 52rpx;
		margin-left: 26rpx;
		width: 590rpx;
		height: 160rpx;
	}
	.doctor-simple-info{
		flex-direction: row;
		width: 320rpx;
		height: 40rpx;
	}
	.doctor-name{
		color: #4E5053;
		font-size: 32rpx;
		padding: 0;
	}
	.doctor-title{
		color: #A6A6A6;
		font-size: 24rpx;
		margin-top: 10rpx;
		padding: 0;
	}
	.doctor-hospital{
		color: #A6A6A6;
		font-size: 28rpx;
	}
	.doctor-index{
		flex-direction: row;
		width: 750rpx;
		height: 166rpx;
	}
	.consult-numbers{
		flex-direction: column;
		width: 228rpx;
		height: 166rpx;
		margin-top: 12rpx;
	}
	.numbers{
		margin-top: 12rpx;
		margin-bottom: 12rpx;
		text-align: center;
		color:#424242;
		font-size: 40rpx;
		width: 228rpx;
		height: 48rpx;
	}
	
	.doctor-index-name{
		margin-top: 12rpx;
		margin-bottom: 12rpx;
		text-align: center;
		width: 228rpx;
		height: 40rpx;
		font-size: 28rpx;
		color: #797979;
	}
	
	.response-rate{
		flex-direction: column;
		width: 228rpx;
		height: 166rpx;
		margin-top: 12rpx;
	}
	.response-time{
		flex-direction: column;
		width: 228rpx;
		height: 166rpx;
		margin-top: 12rpx;
	}
	.header-tag-container {
		display: flex;
		flex-direction: row;
		flex-flow: wrap;
		margin: 14rpx 0 14rpx 14rpx;
		line-height: 46rpx;
	}
	.skills-contain{
		width: 750rpx;
		height: 498rpx;
		flex-direction: column;
	}
	.doctor-text-name{
		width: 220rpx;
		height: 40rpx;
		color: #A6A6A6;
		font-size: 28rpx;
		margin-top: 52rpx;
		margin-left: 30rpx;
	}
	.doctor-text-info{
		color: #4E5053;
		font-size: 28rpx;
		margin-top: 16rpx;
		margin-left: 30rpx;
	}
	.doctor-text-hospital{
		width: 220rpx;
		height: 40rpx;
		color: #A6A6A6;
		font-size: 28rpx;
		margin-top: 14rpx;
		margin-left: 30rpx;
	}
	.work-hospitol{
		width: 750rpx;
		height: 184rpx;
		}
	.patient-comment{
		width: 220rpx;
		height: 40rpx;
		color: #A6A6A6;
		font-size: 28rpx;
		margin-top: 28rpx;
		margin-left: 28rpx;
	}
	.tag {
		margin-right: 22rpx;
		margin-top: 6rpx;
	}
	.div {
		background-color: #F6F6F6;
		width: 750rpx;
		height: 20rpx;
	}
	.tab-bar-line {
		height: 2rpx;
		background-color: #E4E4E4;
	}
	.tab-bar-column{	
		width: 2rpx;
		background-color: #E4E4E4;
		margin-top: 34rpx;
		margin-bottom: 40rpx;
	}
	.tab-bar-line-width{
		height: 2rpx;
		background-color: #E4E4E4;
		margin-left: 34rpx;
		margin-right: 30rpx;
	}
</style>
