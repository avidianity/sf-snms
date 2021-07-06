import { useState } from 'react';
import { useRouteMatch } from 'react-router-dom';

export function useURL() {
	const match = useRouteMatch();

	return (path: string) => `${match.path}${path}`;
}

export function useMode() {
	return useState<'Add' | 'Edit'>('Add');
}

export function useNullable<T>(data?: T) {
	return useState<T | null>(data || null);
}

export function useArray<T>(data?: T[]) {
	return useState<T[]>(data || []);
}
