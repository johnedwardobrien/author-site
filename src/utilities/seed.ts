import { Config } from 'payload'

export const seed: NonNullable<Config['onInit']> = async (payload): Promise<void> => {
	await payload.create({
		collection: 'users',
		data: {
			name: 'John OB',
			email: 'johnobrien8642@gmail.com',
			password: 'password',
		},
	})
}
