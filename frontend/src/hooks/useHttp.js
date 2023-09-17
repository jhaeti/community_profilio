"use client";
import apiUrl from "@/utils/apiUrl";
import { useState } from "react";

export default useHttp = async (url) => {
	const [result, setResult] = useState({
		data: null,
		error: null,
		loading: false,
	});
	const res = await axios.get(apiUrl + url);

	if (!res.data && !res.error) {
		setResult({ ...result, loading: true });
	}

	if (res.error) {
		setResult({
			data: res.data,
			error: null,
			loading: false,
		});
	}
	if (res.data) {
		setResult({
			data: res.data,
			error: null,
			loading: false,
		});
	}
	console.log(result);
	return result;
};
