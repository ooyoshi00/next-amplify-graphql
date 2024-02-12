import {} from 'aws-amplify';
import { allTodos, singleTodo } from '../graphql/queries';
import { createTodo, deleteTodo, updateTodo } from '../graphql/mutations';
import { AllTodosQuery, CreateTodoMutation, DeleteTodoMutation, SingleTodoQuery, Todo, TodoInput, UpdateTodoMutation } from '../API';
import { generateClient } from 'aws-amplify/api';

const client = generateClient();

export const getAllTodos = async () => {
	const response = (await client.graphql({ query: allTodos })) as {
		data: AllTodosQuery;
	};
	return response.data.allTodos as Todo[];
};
export const getTodoById = async (id: string) => {
	const response = (await client.graphql({ query: singleTodo, variables: { id: id } })) as { data: SingleTodoQuery };
	return response.data.singleTodo as Todo;
};

export const createTodoHandler = async (input: TodoInput) => {
	const response = (await client.graphql({ query: createTodo, variables: input })) as { data: CreateTodoMutation };
	return response.data.createTodo as Todo;
};
export const updateTodoHandler = async (id: string, input: TodoInput) => {
	const response = (await client.graphql({ query: updateTodo, variables: input })) as { data: UpdateTodoMutation };
	console.log(response);
	return response.data.updateTodo as Todo;
};
export const deleteTodoHandler = async (id: string) => {
	const response = (await client.graphql({ query: deleteTodo, variables: id })) as { data: DeleteTodoMutation };
	return response.data.deleteTodo as boolean;
};
