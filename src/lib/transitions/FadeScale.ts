import type { FadeParams } from 'svelte/transition';

interface FadeScaleParms extends FadeParams {
	baseScale: number;
}

export default function fadeScale(
	node: Element,
	{ delay = 0, duration = 200, easing = (x) => x, baseScale = 0 }: FadeScaleParms
) {
	const o = +getComputedStyle(node).opacity;
	const m = getComputedStyle(node).transform.match(/scale\(([0-9.]+)\)/);
	const s = m ? m[1] : 1;
	const is = 1 - baseScale;

	return {
		delay,
		duration,
		css: (t: number) => {
			const eased = easing(t);
			return `opacity: ${eased * o}; transform: scale(${eased * s * is + baseScale})`;
		}
	};
}
