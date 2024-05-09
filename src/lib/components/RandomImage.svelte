<script lang="ts">
	import { onMount } from 'svelte';
	export let zIndex = 1;

	const apiEndpoint = 'https://random.imagecdn.app/500/300';
	$: x = 0;
	$: y = 0;
	$: width = 0;
	$: height = 0;
	$: visible = false;

	function generateXCoordinates() {
		let newX = Math.ceil(Math.random() * width);
		if (newX + 550 >= width) {
			return generateXCoordinates();
		} else {
			return newX;
		}
	}
	function generateYCoordinates() {
		let newY = Math.ceil(Math.random() * height);
		if (newY + 350 >= height) {
			return generateYCoordinates();
		} else {
			return newY;
		}
	}

	onMount(() => {
		x = generateXCoordinates();
		y = generateYCoordinates();
		visible = true;
	});
</script>

<svelte:window bind:outerWidth={width} bind:outerHeight={height} />
{#if visible}
	<div
		style={`top:${y}px;left:${x}px;z-index:${zIndex}`}
		class={`bg-red-100 absolute animate-fly-into transition-all `}
	>
		<div class="absolute animate-fade-into top-0 left-0 right-0 bottom-0 bg-gray-100 z-10"></div>
		<img src={apiEndpoint + `?random=${Math.random()}`} alt="Nature" class="z-0" />
	</div>
{/if}
