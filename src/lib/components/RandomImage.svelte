<script lang="ts">
	import { onMount } from 'svelte';
	import type { ImageMeta } from '$lib/types/ImageMeta';

	export let zIndex = 1;
	export let imageIndex: number;
	export let imageMetaData: Array<ImageMeta>;

	const image = imageMetaData[imageIndex];
	const path = image?.path.slice(7);
	$: x = 0;
	$: y = 0;
	$: width = 300;
	$: height = 300;
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
{#if visible && image}
	<div
		style={`top:${y}px;left:${x}px;z-index:${zIndex}`}
		class={`bg-red-100 absolute animate-fly-into transition-all  h-80 w-80 `}
	>
		<div
			class="absolute animate-fade-into top-0 left-0 right-0 bottom-0 bg-gray-100 z-10 flex justify-center items-center"
		>
			<!-- <p class="text-black font-bold text-lg">{imageIndex}</p> -->
		</div>
		<img src={path} alt={image.name} class="z-0" />
	</div>
{/if}
