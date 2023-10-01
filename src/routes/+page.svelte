<script>
	import OpenAI from 'openai';
	import {marked} from 'marked';
	import {open_ai_api_key} from '$lib/store.js'
	import ToolButton from './ToolButton.svelte';
	import { buttonData, lastClickedButton } from '$lib/buttonData';
	import {
		beforeUpdate,
		afterUpdate,
		getContext
	} from 'svelte';

	let inputValue = ""
	const showModal = getContext('showModal');
	let openai;
	let div;
	let autoscroll = false;
	let comments = [];

	// Reactive statement to redeclare `openai` when `$open_ai_api_key` changes
	$: {
		openai = new OpenAI({
		apiKey: $open_ai_api_key,
		dangerouslyAllowBrowser: true
		});
		console.log("Renew API key object")
  	}

	beforeUpdate(() => {
		if (div) {
			const scrollableDistance = div.scrollHeight - div.offsetHeight;
			autoscroll = div.scrollTop > scrollableDistance - 20;
		}
	});

	afterUpdate(() => {
		if (autoscroll) {
			div.scrollTo(0, div.scrollHeight);
		}
	});

	async function handleShortcutClick(llmModel, llmPrompt) {
		lastClickedButton.set({ model: llmModel, prompt: llmPrompt });
		if (!inputValue.trim()) return;
		const comment = {
				author: 'user',
				text: inputValue.trim()
		};

		comments = [...comments, comment];
		const reply = {
				author: 'bot',
				text: ''
		};
		try {
			const stream = await openai.chat.completions.create({
					model: llmModel,
					messages: [
						{ role: 'system', content: llmPrompt },
						{ role: 'user', content: inputValue.trim() }
					],
					stream: true,
			});
			comments = [...comments, reply];
			for await (const part of stream) {
				comments[comments.length - 1].text += (part.choices[0]?.delta?.content || '');
			}
		} catch (error) {
			console.error('API Error:', error);
			showModal()
		}
  	}

	function handleDelete(id) {
		buttonData.update(data => data.filter(btn => btn['name'] !== id));
	}

	function handleAddNew() {
    	buttonData.update(data => [
        ...data,
        {
            name: 'Untitled' + (data.length + 1),
            shortcut: {
                control: true,
                alt: false,
                shift: false,
                code: 'Digit9'
            },
            prompt: '',
            model: 'gpt-3.5-turbo'
        }
		]);
	}

	async function handleKeydown(event) {
		if (event.key === 'Enter' && event.target.value) {
			handleShortcutClick($lastClickedButton.model, $lastClickedButton.prompt);
		}
	}
	let tabName1 = "Chi-Eng (shift+1)"
</script>

	<div class="h-screen w-screen flex flex-col bg-gray-900 text-white" bind:this={div}>
			<article>
				<span class="bot">How can I help you?</span>
			</article>
		{#each comments as comment}
			<article>
				<span class="{comment.author}">
					{@html marked(comment.text.replace(/\n/g, '<br>'))}
				</span>
			</article>
		{/each}
		<div class="flex flex-col justify-center items-center w-full fixed bottom-5">

            <div class="join flex flex-wrap">
				{#each $buttonData as btn}
					<ToolButton 
						bind:title={btn['name']} 
						bind:shortcutConfig={btn['shortcut']} 
						handleShortcutClick={() => handleShortcutClick(btn['model'], btn['prompt'])} handleDelete={() => handleDelete(btn['name'])} 
						bind:prompt={btn['prompt']} 
						bind:model={btn['model']}
						isLastClicked={$lastClickedButton && $lastClickedButton['model'] === btn['model'] && $lastClickedButton['prompt'] === btn['prompt']}
					></ToolButton>
				{/each}
				<button on:click={handleAddNew} class="btn flex items-center">
					+
				</button>
			</div>
			<div class="flex justify-center items-center w-full">
				<textarea bind:value={inputValue} placeholder="Type here" class="textarea-md w-11/12 textarea textarea-bordered" on:keydown={handleKeydown}></textarea>
			</div>
		</div>
	</div>

<style>
	.bot {
  		@apply text-base float-left bg-gray-500 text-white rounded-md flex items-center justify-center p-2 m-1;
		max-width: calc(99vw - 1rem); /* 1rem accounts for padding */
	}
	.user {
  		@apply text-base float-right bg-blue-500 text-white rounded-md flex items-center justify-center p-2 m-1;
		max-width: calc(99vw - 1rem); /* 1rem accounts for padding */
	}
</style>