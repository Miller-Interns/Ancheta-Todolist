import type { TodoItem } from './TodoItem.ts';


export interface Category {
id: string;
title: string;
todos: TodoItem[];
}