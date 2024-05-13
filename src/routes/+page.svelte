<script lang="ts">
	import { onMount } from 'svelte';
	import { RandomImage } from '$lib/components';
	import imageData from '$lib/data/data.json';

	const NUMBER_OF_IMAGES_PER_LAYER = 5;
	const DURATION = 5 * 1000;
	const DIVISOR_MULTIPLIER = 2;

	let visibleIndex = 0;
	let iterationCount = 0;

	$: layers = [
		{
			visible: false,
			zIndex: 0,
			imageIndex: 0
		},
		{
			visible: false,
			zIndex: 1,
			imageIndex: 0
		},
		{
			visible: false,
			zIndex: 0,
			imageIndex: 0
		}
	];

	onMount(async () => {
		setInterval(
			() => {
				if (visibleIndex >= layers.length - 1) {
					visibleIndex = 0;
				} else {
					visibleIndex++;
				}
				layers[visibleIndex].visible = !layers[visibleIndex].visible;
				layers[visibleIndex].zIndex = 1;
				layers[visibleIndex].imageIndex = iterationCount * NUMBER_OF_IMAGES_PER_LAYER;

				let previousIndex = visibleIndex - 1;
				if (previousIndex < 0) previousIndex = layers.length - 1;
				layers[previousIndex].zIndex = 2;

				let hiddenIndex = visibleIndex - DIVISOR_MULTIPLIER;
				if (hiddenIndex < 0) {
					hiddenIndex = layers.length + hiddenIndex;
				}
				layers[hiddenIndex].visible = false;
				layers[hiddenIndex].zIndex = 0;

				if (iterationCount >= imageData.length / NUMBER_OF_IMAGES_PER_LAYER - 1) {
					iterationCount = 0;
				} else {
					iterationCount++;
				}
			},
			DURATION / (1 * DIVISOR_MULTIPLIER)
		);
	});
</script>

<div class="bg-white fixed top-0 bottom-0 left-0 right-0">
	<p class="text-black font-semibold text-lg"></p>
	{#each layers as layer}
		{#if layer.visible}
			{#each { length: NUMBER_OF_IMAGES_PER_LAYER } as _, i}
				<RandomImage
					zIndex={layer.zIndex}
					imageMetaData={imageData}
					imageIndex={layer.imageIndex + i}
				/>
			{/each}
		{/if}
	{/each}
</div>
