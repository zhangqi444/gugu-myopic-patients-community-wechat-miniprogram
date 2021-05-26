<template>
	<wrapper :titleStyle="wrapperTitleStyle" :descriptionStyle="wrapperDescriptionStyle" 
		:descriptionPosition="wrapperDescriptionPosition" :question="question" :showTitle="showTitle" :showDescription="showDescription">
		<input class="input" @blur="blur($event, question)" :value="value" :placeholder="question.placeHolder||'请输入'" 
			:type="question.inputType === 'number' ? 'digit' : question.inputType" :style="[inputStyle]" />
	</wrapper>
</template>

<script>
	import wrapper from './wrapper';
	
	export default {
		components: { wrapper },
		data() {
			return { };
		},
		props: {
			question: { type: Object, default: () =>  { } },
			result: { type: String, default: "" },
			showTitle: { type: Boolean, default: true },
			showDescription: { type: Boolean, default: true },
			wrapperTitleStyle: { type: Object, default: () => {} },
			inputStyle: { type: Object, default: () => {} },
			wrapperDescriptionStyle: { type: Object, default: () => {} },
			wrapperDescriptionPosition: { type: String, default: 'top' },
		},
		computed: {
			value() {
				return this.result;
			}
		},
		methods: {
			blur(event) {
				let { value } = event.target;
				value = value.trim() === '' ? null : value.trim();
				this.$emit('change', { value });
			}
		},
	}
</script>

<style>
.input {
	font-size: 18px;
	height: 52px;
	color: #171717;
}
</style>
