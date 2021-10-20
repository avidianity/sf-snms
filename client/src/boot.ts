import '@avidian/extras';
import '@popperjs/core';
import 'bootstrap';
import 'perfect-scrollbar';
import axios from 'axios';
import { SERVER_URL } from './constants';
import State from '@avidian/state';
import toastr from 'toastr';
import '@avidian/extras';

window.toastr = toastr;

const state = State.getInstance();

axios.defaults.baseURL = SERVER_URL;

axios.interceptors.request.use((config) => {
	if (state.has('token')) {
		const token = state.get<string>('token');
		config.headers['Authorization'] = `Bearer ${token}`;
	}
	return config;
});
