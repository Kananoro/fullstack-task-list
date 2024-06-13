import { hashPassword } from "../src/services/user-service.js";
import { PrismaClient, Prisma } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

const main = async () => {
	try {
		await prisma.task.deleteMany();
		await prisma.user.deleteMany();

		const password1 = await hashPassword("password1");
		const password2 = await hashPassword("password2");
		const password3 = await hashPassword("password3");

		const user1 = await prisma.user.create({
			data: {
				FIO: faker.person.fullName(),
				login: "user1",
				password: password1,
			},
		});

		const user2 = await prisma.user.create({
			data: {
				FIO: faker.person.fullName(),
				login: "user2",
				password: password2,
			},
		});

		const user3 = await prisma.user.create({
			data: {
				FIO: faker.person.fullName(),
				login: "user3",
				password: password3,
			},
		});

		async function createFakeTasks(count, user) {
			let responsibleUser;
			if (user == 1) {
				responsibleUser = {
					connect: { FIO: user1.FIO },
				};
			}
			if (user == 2) {
				responsibleUser = {
					connect: { FIO: user2.FIO },
				};
			}
			if (user == 3) {
				responsibleUser = {
					connect: { FIO: user3.FIO },
				};
			}
			const tasks = Array.from({ length: count }).map(() => {
				return {
					accountNumber: faker.finance.accountNumber(),
					firstName: faker.person.firstName(),
					lastName: faker.person.lastName(),
					middleName: faker.person.middleName(),
					birthday: new Date(
						faker.date.birthdate({ min: 20, max: 65, mode: "age" }),
					),
					inn: faker.finance.accountNumber(12),
					responsible: responsibleUser,
				};
			});

			await prisma.$transaction(
				tasks.map((task) => prisma.task.create({ data: task })),
			);
		}

		createFakeTasks(15, 1);
		createFakeTasks(15, 2);
		createFakeTasks(15, 3);
	} catch (error) {
		throw error;
	}
};

main().catch((err) => {
	console.warn("Error While generating Seed: \n", err);
});
