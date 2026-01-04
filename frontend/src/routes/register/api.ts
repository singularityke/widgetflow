import { apiRequest } from '$lib/api';

export async function register(email: string, password: string, name: string) {
	return apiRequest('/api/auth/register', {
		method: 'POST',
		body: JSON.stringify({ email, password, name }),
		skipAuthRedirect: true
	});
}

export async function verifyEmail(email: string, code: string) {
	return apiRequest('/api/auth/verify-email', {
		method: 'POST',
		body: JSON.stringify({ email, code }),
		skipAuthRedirect: true
	});
}

export async function login(email: string, password: string) {
	return apiRequest('/api/auth/login', {
		method: 'POST',
		body: JSON.stringify({ email, password }),
		skipAuthRedirect: true
	});
}

export async function logout() {
	return apiRequest('/api/auth/logout', {
		method: 'POST',
		skipAuthRedirect: true
	});
}

export async function getUser() {
	return apiRequest('/api/auth/me', {
		method: 'GET'
	});
}

export async function initiateGoogleLogin() {
	const response = await apiRequest('/api/auth/google', {
		method: 'GET'
	});
	if (response.url) {
		window.location.href = response.url;
	}
	return response;
}
