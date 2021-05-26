<template>
	<div class="container">
		<label class="title">{{title}}</label>
		<div class='interaction'>
			<span :class="[date ? 'select-text__selected' : 'select-text__none']" @click="handleClickChangeDate">
				<image v-if="!date" class="select-icon" :src="calendarIcon"></image>
				{{ dateParsed || '请选择日期' }}
			</span>
			<uni-calendar ref="calendar" :insert="false" @confirm="confirm" @close="close"/>
		</div>
	</div>
</template>

<script>
	import uniCalendar from '@/packageSubPage/components/uni-calendar/uni-calendar.vue';
	import { getStaticResource } from '@/common/util';
	import { format } from 'fecha';
	
	export default {
		name: 'dateInput',
		components: {
			uniCalendar
		},
		computed: {
			calendarIcon: () => getStaticResource('calendar'),
			dateParsed: function() {
				return this.date && format(this.date, "YYYY-MM-DD");
			},
		},
		props: {
			date: '',
			title: '',
		},
		methods: {
			confirm(e) {
				this.$emit('confirm', e);
			},
			close(e) {
				this.$emit('close', e);
			},
			handleClickChangeDate(e) {
				this.$emit('open', e);
				this.$refs.calendar.open();
			}
		}
	};
</script>

<style scoped>
	.container {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		background-color: #FFFFFF;
		padding: 0 16px;
		border-radius: 8px;
		align-items: center;
	}

	.title {
		color: #2E2E2E;
		font-size: 16px;
		line-height: 24px;
	}
	
	.interaction {
		display: flex;
	}

	.select-icon {
		height: 12px;
		width: 12px;
		margin-right: 4px;
	}

	.select-text__none {
		padding: 16px 0;
		color: #C1C1C1;
		font-size: 14px;
	}

	.select-text__selected {
		color: #333333;
		padding: 16px 0;
	}
</style>
