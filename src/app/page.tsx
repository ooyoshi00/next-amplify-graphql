'use client';
import { useEffect, useState } from 'react';
import { getAllTodos } from '@/src/libs/graphql';
import { Todo } from '@/src/API';
import { Box, Container } from '@chakra-ui/react';
import React from 'react';
import { Header } from '../_components/Header';
import { TodoList } from '../_components/TodoList';
import { NoTodo } from '../_components/NoTodo';
import { Loading } from '../_components/Loading';
import { AddTodo } from '../_components/AddTodo';
import { Amplify } from 'aws-amplify';

Amplify.configure({
	API: {
		GraphQL: {
			endpoint: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT as string,
			region: 'ap-northeast-1',
			apiKey: process.env.NEXT_PUBLIC_API_KEY,
			defaultAuthMode: 'apiKey',
		},
	},
});

export default function Home() {
	const [todos, setTodos] = useState<Todo[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	useEffect(() => {
		(async () => {
			const res = await getAllTodos().catch((e) => {
				console.log(e);
				return [];
			});
			setTodos(res);
			setIsLoading(false);
		})();
	}, []);

	return (
		<Box>
			<Header />
			<Container py={4}>
				<Box>
					{todos.map((todo: Todo) => (
						<React.Fragment key={todo.id}>
							<TodoList todo={todo} setTodos={setTodos} setIsLoading={setIsLoading} />
						</React.Fragment>
					))}
					{todos.length === 0 && !isLoading && <NoTodo />}
				</Box>
			</Container>
			<AddTodo setTodos={setTodos} setIsLoading={setIsLoading} />
			<Loading isLoading={isLoading} />
		</Box>
	);
}
