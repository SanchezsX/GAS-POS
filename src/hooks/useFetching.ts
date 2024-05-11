import { useState } from 'react';

type UseFetchingReturn = [
	fetching: (
		callback: () => Promise<void>
	) => Promise<void>,
	isLoading: boolean
]

const useFetching = (): UseFetchingReturn => {
	const [isLoading, setIsLoading] = useState(true);

	async function fetching(callback: () => Promise<void>) {
		try {
			await callback();
		} finally {
			setIsLoading(false)
		}
	}

	return [fetching, isLoading]
}

export default useFetching;