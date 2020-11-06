export default async function getResources(url) {
	let res = await fetch(url);

	if (!res.ok) {
		throw new Error(`Something went wrong! URL: ${url}, STATUS: ${res.status}`);
	}

	return await res.json();
}

