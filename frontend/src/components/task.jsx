import { useState } from "react";
import statuses from "../utils/statuses.js";
import Modal from "../modal.jsx";
import { api } from "../utils/api-get.js";

const Task = ({ data }) => {
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [statusOpen, setStatusOpen] = useState(false);
	const [stat, setStat] = useState(statuses[data.status]);
	function onStatusChange(status) {
		setStat(statuses[status]);
		api.statusChange(data.id, status);
	}
	const date = new Date(data.birthday);
	const year = date.getFullYear();
	const month = date.getMonth() + 1;
	const day = date.getDate();
	const formattedDate = `${year}-${month.toString().padStart(2, "0")}-${day
		.toString()
		.padStart(2, "0")} `;
	return (
		<>
			<button
				onClick={() => setModalIsOpen(true)}
				className="w-[1190px] relative h-15 bg-primary p-5 rounded-lg flex flex-row justify-between">
				<div className="flex flex-row gap-2">
					<p>{data.lastName}</p>
					<p>{data.firstName}</p>
					<p>{data.middleName}</p>
				</div>
				<div className="relative z-0">
					<p>{stat}</p>
				</div>
			</button>
			<Modal
				isOpen={modalIsOpen}
				onClose={() => {
					setModalIsOpen((prev) => !prev);
				}}>
				<div className="flex flex-row gap-2 mb-5 text-lg">
					<div className="pr-3">
						<h2>Номер Счёта:</h2>
						<h2>ФИО Заказчика:</h2>
						<h2>День Рождения:</h2>
						<h2>ИНН:</h2>
						<h2>ФИО Ответственного:</h2>
					</div>
					<div className="">
						<p className="">{data.accountNumber}</p>
						<p className="text-nowrap overflow-clip">
							{data.lastName} {data.middleName} {data.firstName}
						</p>
						<p>{data.birthday ? formattedDate : "Не указан"}</p>
						<p>{data.inn}</p>
						<p>{data.responsibleFIO}</p>
					</div>
				</div>
				<hr className="border-0 w-72 self-center h-1 bg-secondary rounded-2xl mb-5" />
				<h1 className="self-center mb-2">Статус клиента</h1>
				<button
					className="relative border border-secondary px-2 py-1 rounded-md self-center"
					onClick={() => {
						setStatusOpen((prev) => !prev);
					}}>
					{stat}
					{statusOpen && (
						<div className="absolute w-[150px] border border-secondary right-0 top-10 rounded-md flex flex-col items-start bg-primary overflow-hidden">
							<button
								className="px-3 py-1 text-start w-full hover:bg-secondary"
								onClick={() => {
									onStatusChange("IN_WORK");
								}}>
								{statuses.IN_WORK}
							</button>
							<button
								className="px-3 py-1 text-start w-full hover:bg-secondary"
								onClick={() => {
									onStatusChange("CANCELED");
								}}>
								{statuses.CANCELED}
							</button>
							<button
								className="px-3 py-1 text-start w-full hover:bg-secondary"
								onClick={() => {
									onStatusChange("CLOSED");
								}}>
								{statuses.CLOSED}
							</button>
						</div>
					)}
				</button>
			</Modal>
		</>
	);
};

export default Task;
