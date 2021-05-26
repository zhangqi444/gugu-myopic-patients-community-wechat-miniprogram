<template>
	<mpHtml :tag-style="tagStyle" :content="html" show-with-animation></mpHtml>
</template>

<script>
	import mpHtml from "./mp-html/mp-html";
	
	export default {
		components: { mpHtml },
		data(){
		    return {
				tagStyle: {
					table: 'border-collapse:collapse;border-top:1px solid gray;border-left:1px solid gray;',
					th: 'border-right:1px solid gray;border-bottom:1px solid gray;',
					blockquote: 'word-break:break-all;color:gray;',
					p: 'word-break:break-all;',
					td: 'border-right:1px solid gray;border-bottom:1px solid gray;'
				},
			};
		},
		props: {
			html: { type: String, default: '' }
		}
	}
</script>

<style>
	
</style>
