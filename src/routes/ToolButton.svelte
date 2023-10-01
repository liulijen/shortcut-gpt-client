<script>
	export let title;
	export let shortcutConfig;
	export let handleShortcutClick;
	export let prompt;
	export let model;
	export let handleDelete;
	export let isLastClicked = false;

	import {shortcut} from '$lib/shortcut.js'

    $: {
        shortcutConfig = {
            control: controlChecked,
            alt: altChecked,
            shift: shiftChecked,
            code: selectedKey
        };
		shortcutText = [
            controlChecked ? 'Ctrl' : '',
            altChecked ? 'Alt' : '',
            shiftChecked ? 'Shift' : '',
            selectedKey.replace('Digit', '')
        ].filter(Boolean).join('+');
    }

    let controlChecked = shortcutConfig.control;
    let altChecked = shortcutConfig.alt;
    let shiftChecked = shortcutConfig.shift;
    let selectedKey = shortcutConfig.code;
	let shortcutText;
</script>

<div class="dropdown dropdown-top dropdown-hover">
	<button use:shortcut={shortcutConfig} on:click={handleShortcutClick} class="${isLastClicked ? ' border-red-600 border-x-8' : ''} btn join-item flex flex-col items-center hover:bg-yellow-600 transition-colors duration-150 cursor-pointer active:bg-red-700">
		<span class="text-gray-200">{title}</span>
		<span class="text-gray-600 text-xxs">{model}</span>
		<span class="text-gray-400 text-xs">{shortcutText}</span>
	</button>
	<div class="dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-[370px]">
		<div class="flex items-center justify-between">
			Name
			<button on:click={handleDelete} class="btn bg-red-500 text-white flex items-center">
				Delete
			</button>
		</div>
		<input bind:value={title} class="mb-2"/>
		<p>Model</p>
		<select bind:value={model} class="select select-bordered w-full max-w-xs mb-2">
			<option>gpt-3.5-turbo</option>
			<option>gpt-4</option>
			<option>gpt-3.5-turbo-16k</option>
		</select>
		<p>Shortcut</p>
		<div class="flex space-x-4 p-4">
			<label class="flex items-center space-x-3">
				<input type="checkbox" class="form-checkbox h-5 w-5 text-blue-600" value="Option 1" name="options[]" bind:checked={controlChecked}>
				<span class="font-medium">Ctrl</span>
			</label>
			<label class="flex items-center space-x-3">
				<input type="checkbox" class="form-checkbox h-5 w-5 text-blue-600" value="Option 2" name="options[]" bind:checked={altChecked}>
				<span class="font-medium">Alt</span>
			</label>
			<label class="flex items-center space-x-3">
				<input type="checkbox" class="form-checkbox h-5 w-5 text-blue-600" value="Option 3" name="options[]" bind:checked={shiftChecked}>
				<span class="font-medium">Shift</span>
			</label>
			<select class="select select-bordered w-full max-w-xs mb-2" bind:value={selectedKey}>
				<option>Digit1</option>
				<option>Digit2</option>
				<option>Digit3</option>
				<option>Digit4</option>
				<option>Digit5</option>
				<option>Digit6</option>
				<option>Digit7</option>
				<option>Digit8</option>
				<option>Digit9</option>
				<option>Digit0</option>
			</select>
		</div>
		<p>Prompt</p>
		<textarea class="h-[400px] w-full" bind:value={prompt}></textarea>
	</div>
</div>
