<template>
	<surveyQuestionWrapper :question="question" :showTitle="showTitle" :showDescription="showDescription">
		<radio-group @change="change($event)">
			<view class="container" v-for="(choice, choiceIndex) in question.choices" :key="choiceIndex">
				<radio class="radio" :value="choice.value" :checked="choice.value === value" />
				<view class="text">{{choice.text}}</view>
			</view>
		</radio-group>
	</surveyQuestionWrapper>
</template>

<script>
	import surveyQuestionWrapper from './wrapper';
	
	export default {
		components: { surveyQuestionWrapper },
		data() {
			return { };
		},
		props: {
			question: { type: Object, default: () =>  { choices: {} } },
			result: { type: String, default: "" },
			showTitle: { type: Boolean, default: true },
			showDescription: { type: Boolean, default: true },
		},
		computed: {
			range() {
				return this.question.choices.map(c => c.text);
			},
			value() {
				return this.result;
			}
		},
		methods: {
			change(event) {
				const { value } = event.target;
				this.$emit('change', { value });
			}
		},
	}
</script>

<style>
.container {
	display: flex;
	flex-direction: row;
	height: 52px;
	align-items: center;
}
.radio {
	padding-right: 10px;
}
.text {
	font-size: 18px;
	color: #171717;
}
</style>
