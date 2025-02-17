<script lang="ts">
	import { writable, type Writable } from 'svelte/store';
	import { DataTable, Card, List, ListItem } from '@brainandbones/skeleton';
	import CodeBlock from '$lib/CodeBlock/CodeBlock.svelte';
	import SvgIcon from '$lib/SvgIcon/SvgIcon.svelte';

	let navSingle: Writable<string> = writable('A');
	let navMultiple: Writable<string[]> = writable(['A', 'B']);

	const tablePropsGroup: any = {
		headings: ['Prop', 'Type', 'Default', 'Values', 'Description'],
		source: [
			['tag', 'string', 'ul', 'ul | ol | dl | nav', , 'Defines the semantic wrapping element.'],
			['selected', 'Writable', '-', 'any', 'Nav tag only. Provide a writable store to maintain list selection.'],
			['hover', 'string', 'hover:bg-primary-500/10', 'class', 'Nav tag only. Provide a class to set hover background color.'],
			['highlight', 'string', '!bg-primary-500', 'class', 'Nav tag only. Provide a class for highlighted rows. Note this must be use (!) for important.']
		]
	};
	const tablePropsItems: any = {
		headings: ['Prop', 'Type', 'Description'],
		source: [
			['href', 'string', `To create a link, provide an anchor tag.`],
			['value', 'any', `To create a section item, provide a value.`]
		]
	};
	const slotsItems: any = {
		headings: ['Name', 'Description'],
		source: [
			['lead', 'Positioned on the left of each row item.'],
			['trail', 'Positioned on the right of each row item.']
		]
	};
	const tableA11yList: any = {
		headings: ['Prop', 'Type', 'Default', 'Description'],
		source: [
			['label', 'string', '-', `Define a semantic ARIA label.`],
			['labelledby', 'string', '-', `ID of the element that labels this this.`]
		]
	};
	const tableA11yItem: any = {
		headings: ['Prop', 'Type', 'Default', 'Description'],
		source: [
			['setsize', 'number', '-', `Nav Item only. Define the ARIA setsize value.`],
			['posinset ', 'number', '-', `Nav Item only. Define the ARIA posinset value.`]
		]
	};
</script>

<div class="space-y-8">
	<!-- Header -->
	<header class="space-y-4">
		<h1>Lists</h1>
		<p class="space-y-4">Lists are continuous, vertical indexes of text options.</p>
		<CodeBlock language="js" code={`import { List, ListItem } from '@brainandbones/skeleton';`} />
	</header>

	<!-- Variations -->
	<section class="space-y-4">
		<div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4">
			<section class="space-y-4">
				<Card class="space-y-4">
					<h6>Unordered</h6>
					<List tag="ul">
						{#each ['A', 'B', 'C'] as v, i}
							<ListItem tabindex={i}>
								<svelte:fragment slot="lead">
									<!-- {@html svgHeart} -->
									<SvgIcon name="skull" fill="fill-primary-500" />
								</svelte:fragment>
								Item {v}
								<svelte:fragment slot="trail">
									<span class="opacity-50">⋮</span>
								</svelte:fragment>
							</ListItem>
						{/each}
					</List>
				</Card>
			</section>
			<section class="space-y-4">
				<Card class="space-y-4">
					<h6>Ordered</h6>
					<List tag="ol">
						{#each ['A', 'B', 'C'] as v, i}
							<ListItem tabindex={i}>
								<svelte:fragment slot="lead"><div class="circle font-bold text-white">{i + 1}</div></svelte:fragment>
								Item {v}
							</ListItem>
						{/each}
					</List>
				</Card>
			</section>
			<section class="space-y-4">
				<Card class="space-y-4">
					<h6>Description</h6>
					<List tag="dl">
						{#each ['A', 'B'] as v, i}
							<ListItem tabindex={i}>
								<svelte:fragment slot="dt">Item {v}</svelte:fragment>
								<svelte:fragment slot="dd"><p>Description for {v}</p></svelte:fragment>
							</ListItem>
						{/each}
					</List>
				</Card>
			</section>
			<section class="space-y-4">
				<Card class="space-y-4">
					<h6>Anchors</h6>
					<List tag="nav" label="Anchor List Example">
						<ListItem href="/">Page A</ListItem>
						<ListItem href="/">Page B</ListItem>
						<ListItem href="/">Page C</ListItem>
					</List>
				</Card>
			</section>
		</div>
	</section>

	<!-- Selection Listbox -->
	<section class="space-y-4">
		<h3>Selection Listbox</h3>
		<div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
			<section class="space-y-4">
				<Card class="space-y-4">
					<h6>Single</h6>
					<List tag="nav" selected={navSingle} label="Single Selection">
						<ListItem value={'A'}>Item A</ListItem>
						<ListItem value={'B'}>Item B</ListItem>
						<ListItem value={'C'}>Item C</ListItem>
					</List>
					<pre>Selected: {$navSingle}</pre>
				</Card>
			</section>
			<section class="space-y-4">
				<Card class="space-y-4">
					<h6>Multiple</h6>
					<List tag="nav" selected={navMultiple} label="Multi-Selection" hover="hover:bg-accent-500/10" highlight="!bg-accent-500">
						<ListItem value={'A'}>Item A</ListItem>
						<ListItem value={'B'}>Item B</ListItem>
						<ListItem value={'C'}>Item C</ListItem>
					</List>
					<pre>Selected: {$navMultiple}</pre>
				</Card>
			</section>
		</div>
	</section>

	<!-- Usage -->
	<section class="space-y-4">
		<h2>Usage</h2>
		<p>Defaults to an unordered list with list item children.</p>
		<CodeBlock
			language="html"
			code={`
<List>
    <ListItem>Item A</ListItem>
    <ListItem>Item B</ListItem>
    <ListItem>Item C</ListItem>
</List>
        `.trim()}
		/>
		<h3>Role and Slot</h3>
		<CodeBlock
			language="html"
			code={`
<List tag="ol">
    <ListItem>
        <svelte:fragment slot="lead">1.</svelte:fragment>
        Item A
    </ListItem>
</List>
        `.trim()}
		/>
		<h3>Description List</h3>
		<CodeBlock
			language="html"
			code={`
<List tag="dl">
    <ListItem>
        <svelte:fragment slot="dt">Item A</svelte:fragment>
        <svelte:fragment slot="dd"><p>Description for A</p></svelte:fragment>
    </ListItem>
</List>
        `.trim()}
		/>
		<h3>Navigation Lists</h3>
		<CodeBlock
			language="html"
			code={`
<List tag="nav">
    <ListItem href="/">Link Example 1</ListItem>
    <ListItem href="/">Link Example 2</ListItem>
</List>
        `.trim()}
		/>
		<h3>Selection Listbox</h3>
		<p>Define a writable to store to house the selection state, then apply a value property to each child.</p>
		<h6>Single Value</h6>
		<CodeBlock language="typescript" code={`const storeSingle: Writable<number> = writable(1);`} />
		<CodeBlock
			language="html"
			code={`
<List tag="nav" selected={storeSingle}"">
    <ListItem value={1}>Selection Example 1</ListItem>
    <ListItem value={2}>Selection Example 2</ListItem>
</List>
        `.trim()}
		/>
		<h6>Multiple Values</h6>
		<CodeBlock language="typescript" code={`let storeMultiple: Writable<any[]> = writable(['A', 'B']);`} />
		<CodeBlock
			language="html"
			code={`
<List tag="nav" selected={storeMultiple}">
    <ListItem value={'A'}>Item A</ListItem>
    <ListItem value={'B'}>Item B</ListItem>
    <ListItem value={'C'}>Item C</ListItem>
</List>
        `.trim()}
		/>
	</section>

	<!-- Properties -->
	<section class="space-y-4">
		<h2>Properties</h2>
		<h3>List Group</h3>
		<DataTable headings={tablePropsGroup.headings} source={tablePropsGroup.source} />
		<h3>Nav Item</h3>
		<DataTable headings={tablePropsItems.headings} source={tablePropsItems.source} />
	</section>

	<!-- Slots -->
	<section class="space-y-4">
		<h2>Slots</h2>
		<DataTable headings={slotsItems.headings} source={slotsItems.source} />
	</section>

	<!-- Accessibility -->
	<section class="space-y-4">
		<div class="flex justify-between items-end">
			<h2>Accessibility</h2>
			<a href="https://www.w3.org/WAI/ARIA/apg/patterns/listbox/" target="_blank">ARIA Guidelines</a>
		</div>
		<h3>List</h3>
		<DataTable headings={tableA11yList.headings} source={tableA11yList.source} />
		<h3>Items</h3>
		<DataTable headings={tableA11yItem.headings} source={tableA11yItem.source} />
	</section>
</div>

<style lang="postcss">
	.circle {
		@apply bg-primary-500 text-xs w-6 h-6 aspect-square text-center flex justify-center items-center rounded-full;
	}
</style>
