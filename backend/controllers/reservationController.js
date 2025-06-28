import Table from "../models/tableModel.js";
import Reservation from "../models/reservationModel.js";
import User from "../models/userModel.js";
import mongoose from 'mongoose';

/**
 * Helper: Finds available tables for given parameters
 */
const findAvailableTable = async (numberOfSeats, date, duration) => {
    try {
        const requestedDate = new Date(date);
        const startHour = requestedDate.getHours();
        const endHour = startHour + Number(duration);

        // Find all tables with the required number of seats
        const candidateTables = await Table.find({
            numberOfSeats: numberOfSeats
        }).lean();

        if (candidateTables.length === 0) return null;

        // Create separate date objects to avoid mutation issues
        const dayStart = new Date(date);
        dayStart.setHours(0, 0, 0, 0);

        const dayEnd = new Date(date);
        dayEnd.setHours(23, 59, 59, 999);

        // Find all reservations for these tables on the requested date
        const reservations = await Reservation.find({
            date: {
                $gte: dayStart,
                $lte: dayEnd
            },
            tableId: { $in: candidateTables.map(t => t._id) }
        }).lean();

        // Check availability for each table
        for (const table of candidateTables) {
            const tableReservations = reservations.filter(
                res => res.tableId.toString() === table._id.toString()
            );

            // Check if this table has any overlapping reservations
            const hasConflict = tableReservations.some(res => {
                const resStartHour = new Date(res.date).getHours();
                const resEndHour = resStartHour + Number(res.duration);

                // Check for time overlap
                return (startHour < resEndHour) && (endHour > resStartHour);
            });

            if (!hasConflict) {
                return table; // Return first available table
            }
        }

        return null; // No available table found
    } catch (error) {
        console.error("Error in findAvailableTable:", error);
        throw error;
    }
};

const makeReservation = async (req, res) => {
    try {
        const { userId, numberOfSeats, date, duration } = req.body;

        // Basic validation
        if (!userId || !numberOfSeats || !date || !duration) {
            return res.json({
                success: false,
                message: "All fields are required: userId, numberOfSeats, date, duration",
            });
        }

        const seats = parseInt(numberOfSeats);
        if (isNaN(seats) || seats < 1) {
            return res.json({
                success: false,
                message: "Number of seats must be a positive integer",
            });
        }

        const durationNum = Number(duration);
        if (isNaN(durationNum) || durationNum < 1) {
            return res.json({
                success: false,
                message: "Duration must be a positive number",
            });
        }

        const reservationDate = new Date(date);
        if (isNaN(reservationDate.getTime())) {
            return res.json({
                success: false,
                message: "Invalid date format",
            });
        }

        // Check if the reservation is for a past date
        const now = new Date();
        if (reservationDate < now) {
            return res.json({
                success: false,
                message: "Cannot make reservations for past dates",
            });
        }

        // Find available table
        const availableTable = await findAvailableTable(seats, reservationDate, durationNum);

        if (!availableTable) {
            return res.json({
                success: false,
                message: "No available table found for the requested time and number of seats",
            });
        }

        // Create reservation
        const reservation = new Reservation({
            userId,
            tableId: availableTable._id,
            date: reservationDate,
            duration: durationNum
        });

        const savedReservation = await reservation.save();

        // Update user with reservation
        await User.findByIdAndUpdate(userId, {
            $push: { reservations: savedReservation._id }
        });

        return res.json({
            success: true,
            reservation: savedReservation,
            tableNumber: availableTable.number,
            message: "Reservation created successfully"
        });

    } catch (error) {
        console.error("Reservation error:", error);
        return res.json({
            success: false,
            message: error.message || error.message,
        });
    }
};

/**
 * Generate time slots for the day
 */
const generateDailyTimeSlots = (start = 7, end = 23) => {
    const slots = [];
    for (let hour = start; hour < end; hour++) {
        const label = `${hour.toString().padStart(2, '0')}:00`;
        slots.push(label);
    }
    return slots;
};

/**
 * List available time slots for a given date and party size
 */
const listAvailableSlots = async (req, res) => {
    try {
        const { date, numberOfSeats } = req.body;

        // Validate input
        if (!date || !numberOfSeats) {
            return res.json({
                success: false,
                message: "Date and number of seats are required",
            });
        }

        const seats = parseInt(numberOfSeats);
        if (isNaN(seats) || seats < 1) {
            return res.json({
                success: false,
                message: "Number of seats must be a positive integer",
            });
        }

        const reservationDate = new Date(date);
        if (isNaN(reservationDate.getTime())) {
            return res.json({
                success: false,
                message: "Invalid date format",
            });
        }

        // Find tables that can accommodate the party size
        const tables = await Table.find({
            numberOfSeats: seats,
        }).lean();

        if (tables.length === 0) {
            return res.json({
                success: false,
                message: "No tables available for the requested party size",
            });
        }

        // Generate all possible time slots
        const allSlots = generateDailyTimeSlots();

        // Create separate date objects for day boundaries
        const dayStart = new Date(date);
        dayStart.setHours(0, 0, 0, 0);

        const dayEnd = new Date(date);
        dayEnd.setHours(23, 59, 59, 999);

        // Get reservations for these tables on the requested date
        const reservations = await Reservation.find({
            date: {
                $gte: dayStart,
                $lte: dayEnd
            },
            tableId: { $in: tables.map(t => t._id) }
        }).lean();

        // For each time slot, check if at least one table is available
        const availableSlots = [];

        for (const slot of allSlots) {
            const slotHour = parseInt(slot.split(':')[0]);
            const slotEndHour = slotHour + 1; // Assuming 1-hour minimum duration

            // Check if any table is available during this slot
            const hasAvailableTable = tables.some(table => {
                const tableReservations = reservations.filter(
                    res => res.tableId.toString() === table._id.toString()
                );

                // Check if this table has any overlapping reservations for this slot
                const hasConflict = tableReservations.some(res => {
                    const resStartHour = new Date(res.date).getHours();
                    const resEndHour = resStartHour + Number(res.duration);

                    return (slotHour < resEndHour) && (slotEndHour > resStartHour);
                });

                return !hasConflict;
            });

            if (hasAvailableTable) {
                availableSlots.push(slot);
            }
        }

        return res.json({
            success: true,
            slots: availableSlots,
            availableTables: tables.length,
            totalSlots: allSlots.length,
            reservedSlots: allSlots.length - availableSlots.length
        });

    } catch (error) {
        console.error("Available slots error:", error);
        return res.json({
            success: false,
            message: error.message,
        });
    }
};

const listReservation = async (req, res) => {
    try {
        const { userId } = req.body;

        if (!userId) {
            return res.json({
                success: false,
                message: "User ID is required",
            });
        }

        // Fetch reservations for the user and populate the table data
        const reservations = await Reservation.find({ userId })
            .populate({
                path: "tableId",
                select: "number numberOfSeats category", // include category as well
            })
            .sort({ date: -1 }); // newest first

        // Format reservations with table info
        const formattedReservations = reservations.map(res => ({
            reservationId: res._id,
            date: res.date,
            duration: res.duration,
            tableNumber: res.tableId?.number || "N/A",
            numberOfSeats: res.tableId?.numberOfSeats || "N/A",
            tableCategory: res.tableId?.category || "N/A",
        }));

        return res.json({
            success: true,
            reservations: formattedReservations,
        });

    } catch (error) {
        console.error("listReservation error:", error);
        return res.json({
            success: false,
            message: error.message,
        });
    }
};

const updateReservation = async (req, res) => {
    try {
        const { reservationId, date, numberOfSeats } = req.body;

        // Validate input
        if (!reservationId || !date || !numberOfSeats) {
            return res.json({
                success: false,
                message: "Reservation ID, date, and number of seats are required"
            });
        }

        const seats = parseInt(numberOfSeats);
        const reservationDate = new Date(date);

        if (isNaN(seats) || seats < 1 || isNaN(reservationDate.getTime())) {
            return res.json({
                success: false,
                message: "Invalid input data"
            });
        }

        // Fetch existing reservation
        const reservation = await Reservation.findById(reservationId);
        if (!reservation) {
            return res.json({
                success: false,
                message: "Reservation not found"
            });
        }

        const duration = reservation.duration;

        // Find new available table
        const newTable = await findAvailableTable(seats, reservationDate, duration);
        if (!newTable) {
            return res.json({
                success: false,
                message: "No available table for the new date/time and seats"
            });
        }

        // Update the reservation
        reservation.date = reservationDate;
        reservation.tableId = newTable._id;
        await reservation.save();

        return res.json({
            success: true,
            message: "Reservation updated successfully",
            updatedReservation: {
                reservationId: reservation._id,
                date: reservation.date,
                duration: reservation.duration,
                tableNumber: newTable.number,
                numberOfSeats: newTable.numberOfSeats,
            }
        });

    } catch (error) {
        console.error("updateReservation error:", error);
        return res.json({
            success: false,
            message: error.message
        });
    }
};

const cancelReservation = async (req, res) => {
    try {
        const { reservationId, userId } = req.body;

        if (!reservationId || !userId) {
            return res.json({
                success: false,
                message: "Reservation ID and User ID are required",
            });
        }

        const reservation = await Reservation.findById(reservationId);
        if (!reservation) {
            return res.json({
                success: false,
                message: "Reservation not found",
            });
        }

        // Verify that the reservation belongs to the user
        if (reservation.userId.toString() !== userId) {
            return res.json({
                success: false,
                message: "Unauthorized: This reservation does not belong to you",
            });
        }

        // Remove reservation from user's reservations array
        await User.findByIdAndUpdate(userId, {
            $pull: { reservations: reservationId }
        });

        // Delete the reservation
        await Reservation.findByIdAndDelete(reservationId);

        return res.json({
            success: true,
            message: "Reservation canceled successfully",
        });
    } catch (error) {
        console.error("cancelReservation error:", error);
        return res.json({
            success: false,
            message: error.message,
        });
    }
};

const listAllReservations = async (req, res) => {
    try {
        // Fetch all reservations and populate the table data
        const reservations = await Reservation.find()
            .populate({
                path: "tableId",
                select: "number numberOfSeats category",
            })
            .populate({
                path: "userId",
                select: "name email", // assuming user has name and email
            })
            .sort({ date: -1 }); // newest first

        // Format reservations with table and user info
        const formattedReservations = reservations.map(res => ({
            reservationId: res._id,
            date: res.date,
            duration: res.duration,
            tableNumber: res.tableId?.number || "N/A",
            numberOfSeats: res.tableId?.numberOfSeats || "N/A",
            tableCategory: res.tableId?.category || "N/A",
            userName: res.userId?.name || "N/A",
            userEmail: res.userId?.email || "N/A",
        }));

        return res.json({
            success: true,
            reservations: formattedReservations,
        });

    } catch (error) {
        console.error("listAllReservations error:", error);
        return res.json({
            success: false,
            message: error.message,
        });
    }
};

const deleteReservation = async (req, res) => {
    try {
        const { reservationId } = req.body;

        if (!reservationId) {
            return res.json({
                success: false,
                message: "Reservation ID is required",
            });
        }

        const reservation = await Reservation.findById(reservationId);
        if (!reservation) {
            return res.json({
                success: false,
                message: "Reservation not found",
            });
        }

        // Remove reservation from user's reservations array
        await User.findByIdAndUpdate(reservation.userId, {
            $pull: { reservations: reservationId }
        });

        // Delete the reservation
        await Reservation.findByIdAndDelete(reservationId);

        return res.json({
            success: true,
            message: "Reservation deleted successfully",
        });
    } catch (error) {
        console.error("deleteReservation error:", error);
        return res.json({
            success: false,
            message: error.message,
        });
    }
};

// New function to get all reservations for a specific table
const getTableReservations = async (req, res) => {
    try {
        const { tableId } = req.params;

        if (!tableId) {
            return res.json({
                success: false,
                message: "Table ID is required",
            });
        }

        // Get the table with all its reservations
        const table = await Table.findById(tableId).populate({
            path: 'reservations',
            populate: {
                path: 'userId',
                select: 'name email'
            }
        });

        if (!table) {
            return res.json({
                success: false,
                message: "Table not found",
            });
        }

        const formattedReservations = table.reservations.map(res => ({
            reservationId: res._id,
            date: res.date,
            duration: res.duration,
            userName: res.userId?.name || "N/A",
            userEmail: res.userId?.email || "N/A",
        }));

        return res.json({
            success: true,
            table: {
                tableId: table._id,
                tableNumber: table.number,
                category: table.category,
                numberOfSeats: table.numberOfSeats,
            },
            reservations: formattedReservations,
        });

    } catch (error) {
        console.error("getTableReservations error:", error);
        return res.json({
            success: false,
            message: error.message,
        });
    }
};

export {
    deleteReservation,
    updateReservation,
    listAllReservations,
    makeReservation,
    listAvailableSlots,
    listReservation,
    cancelReservation,
    getTableReservations
};