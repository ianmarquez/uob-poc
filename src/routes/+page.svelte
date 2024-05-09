<script lang="ts">
	import { onMount } from 'svelte';
	import { RandomImage } from '$lib/components';
	const duration = 8 * 1000;
	const DIVISOR_MULTIPLIER = 2;
	let visibleIndex = 0;

	$: layers = [
		{
			visible: false,
			zIndex: 0
		},
		{
			visible: false,
			zIndex: 0
		},
		{
			visible: false,
			zIndex: 0
		},
		{
			visible: false,
			zIndex: 0
		},
		{
			visible: false,
			zIndex: 0
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

				let previousIndex = visibleIndex - 1;
				if (previousIndex < 0) previousIndex = layers.length - 1;
				layers[previousIndex].zIndex = 2;

				let hiddenIndex = visibleIndex - DIVISOR_MULTIPLIER;
				if (hiddenIndex < 0) {
					hiddenIndex = layers.length + hiddenIndex;
				}
				layers[hiddenIndex].visible = false;
				layers[hiddenIndex].zIndex = 0;
			},
			duration / (1 * DIVISOR_MULTIPLIER)
		);
	});
</script>

<div class="bg-white fixed top-0 bottom-0 left-0 right-0">
	{#each layers as layer}
		{#if layer.visible}
			<RandomImage zIndex={layer.zIndex} />
			<RandomImage zIndex={layer.zIndex} />
			<RandomImage zIndex={layer.zIndex} />
			<RandomImage zIndex={layer.zIndex} />
			<RandomImage zIndex={layer.zIndex} />
			<RandomImage zIndex={layer.zIndex} />
		{/if}
	{/each}
</div>
