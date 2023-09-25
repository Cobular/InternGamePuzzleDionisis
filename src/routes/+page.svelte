<script lang="ts">
	import { drinks } from '$lib/references';
	import {
		all_start_same_letter,
		has_repeated_letter,
		is_animal,
		is_color,
		negative_response,
		negative_response_d,
		positive_response
	} from '$lib/utils';

	let person: string = 'instructions';

	let submission: string;

	let choice: string;

	let response: string = 'Try to find a drink that Dionisis will like!';

	const is_true = (element: boolean) => element === true;

	function validate_case_some(words: string[], predicate: (word: string) => boolean): boolean {
		return words.map((x) => predicate(x)).some(is_true);
	}

	// Only allow validate to be pressed every 3 seconds
	let can_validate: boolean = true;
	function validate_cooldown() {
		if (can_validate === false) return
		can_validate = false;
		setTimeout(() => {
			can_validate = true;
		}, 3000);
	}

	function validate() {
		if (!can_validate) return;
		validate_cooldown();

		const split_submission = submission.split(' ').map((word) => word.toLowerCase());

		console.log(split_submission);
		switch (choice) {
			case '1':
				if (validate_case_some(split_submission, is_animal)) response = positive_response();
				else response = negative_response();
				person = 'bald guy';
				break;
			case '2':
				if (validate_case_some(split_submission, is_color)) response = positive_response();
				else response = negative_response();
				person = 'beard guy';
				break;
			case '3':
				if (split_submission.length === 3) response = positive_response();
				else response = negative_response();
				person = 'crown girl';
				break;
			case '4':
				// Does each word have some letter repeated
				if (validate_case_some(split_submission, has_repeated_letter))
					response = positive_response();
				else response = negative_response();
				person = 'long hair girl';
				break;
			case '5':
				// Does each word start with the same letter?
				if (all_start_same_letter(split_submission)) response = positive_response();
				else response = negative_response();
				person = 'other dude';
				break;
			case '6':
				if (
					validate_case_some(split_submission, is_animal) &&
					validate_case_some(split_submission, is_color) &&
					split_submission.length === 3 &&
					validate_case_some(split_submission, has_repeated_letter) &&
					all_start_same_letter(split_submission)
				)
					response = 'That sounds amazing! Nice job, you win!';
				else response = negative_response_d();
				person = 'dionisis';
				break;
			default:
				response = "Oops, that's not a valid choice! Try again.";
				break;
		}
	}
</script>


<svelte:head>
	<title>Party Till I Di-Onysus</title>
	<link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🍺</text></svg>">
</svelte:head>

<div class="p-5 md:p-10 text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-serif flex flex-col md:flex-row gap-2 md:gap-4 items-center">
		<p class="text-6xl">🍺</p>
		<p>Party Till I Di-Onysus</p>
</div>
<div class="card bg-base-100 shadow-xl max-w-prose w-2/3 min-w-fit">
	<div class="card-body flex flex-col gap-6"> 
		<div>
			<p class="">{person}:</p>
			<p class="text-xl text-center">{response}</p>
		</div>

		<div>
			<div class="form-control">
				<label class="label" for="input_word">
					<span class="label-text">whatr you drinking? (choose one or enter your own!)</span>
				</label>
				<input
					placeholder="drink name"
					class="input input-primary"
					bind:value={submission}
					on:submit={validate}
					name="input_word"
					list="input_word_list"
				/>
				<datalist id="input_word_list">
					{#each drinks as drink}
						<option value={drink} />
					{/each}
				</datalist>
			</div>

			<div class="flex flex-row gap-2 items-end">
				<div class="form-control flex-grow">
					<label class="label" for="person_target">
						<span class="label-text">who to ask?</span>
					</label>
					<select name="person_target" bind:value={choice} class="input select-secondary">
						<option value="1">bald god</option>
						<option value="2">beard god</option>
						<option value="3">crown goddess</option>
						<option value="4">long hair goddess</option>
						<option value="5">other god</option>
						<option value="6">dionysus herself :O</option>
					</select>
				</div>

				<button on:click={validate} class="btn btn-primary" class:btn-disabled={!can_validate}>show it!!</button>
			</div>
		</div>
	</div>
</div>
