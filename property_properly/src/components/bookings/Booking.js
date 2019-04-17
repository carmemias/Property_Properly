import React from 'react';

const Booking = ( { booking } ) => {

	const calculateNumNights = (booking) => {

		// console.log(typeof booking.endDate);

		// const endDate = booking.endDate.toString()
		const date2 = new Date(booking.endDate);
		// console.log(date2)
		// const startDate = booking.startDate.toString()
		const date1 = new Date(booking.startDate);

		const timeDiff = Math.abs(date2.getTime() - date1.getTime());
		const dayDifference = Math.ceil(timeDiff / (1000 * 3600 * 24));
		return dayDifference;
		// return 3
	}

	const calculateTotalPrice = (booking) => {
		// add up the room rates
		const rates = booking.bookableItems.map((item)=>{ return item.rate});
		const totalRates = rates.reduce((acc, item) => {
			return acc + item;
		});
		// multiply by number of nights
		return calculateNumNights(booking) * totalRates;
	}

	const allRoomsBooked = booking.bookableItems.map((item)=>{ return item.name}).join(', ');

	return (
		<tr>
		<td>{booking.id}</td>
		<td>{booking.startDate}</td>
		<td>{booking.endDate}</td>
		<td>{calculateNumNights(booking)}</td>
		<td>{booking.customer.name}</td>
		<td>{allRoomsBooked}</td>
		<td>£{calculateTotalPrice(booking)}</td>
		</tr>
	);
}

export default Booking;
