import { render } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';

import { writable } from 'svelte/store';

// @ts-ignore
import Stepper from '$lib/Stepper/Stepper.svelte';

describe('Stepper.svelte', () => {
	it('Renders with minimal props', () => {
		const { getByTestId } = render(Stepper);
		expect(getByTestId('stepper')).toBeTruthy();
	});

	it('Renders with all props', () => {
		const { getByTestId } = render(Stepper, {
			props: {
				active: writable(0),
				length: 3,
				accent: 'bg-green-500',
				background: 'bg-surface-500'
			}
		});
		expect(getByTestId('stepper')).toBeTruthy();
	});
});
