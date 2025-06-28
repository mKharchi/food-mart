import Table from "../models/tableModel.js";

const listTables = async (req, res) => {
    try {
        const tables = await Table.find({});
        return res.json({
            success: true, 
            tables
        });
    } catch (error) {
        return res.json({
            success: false, 
            message: error.message
        });
    }
};

const addTable = async (req, res) => {
    try {
        const { number, category, numberOfSeats } = req.body;

        if (!number) {
            return res.json({
                success: false, 
                message: "Please provide a table number"
            });
        }

        if (!numberOfSeats) {
            return res.json({
                success: false, 
                message: "Please provide number of seats"
            });
        }

        const table = await Table.findOne({ number: Number(number) });
        if (table) {
            return res.json({
                success: false, 
                message: "Table with this number already exists"
            });
        }

        const newTable = new Table({
            number: Number(number), 
            category, 
            numberOfSeats: Number(numberOfSeats)
        });

        const savedTable = await newTable.save();

        return res.json({
            success: true, 
            table: savedTable
        });

    } catch (error) {
        return res.json({
            success: false, 
            message: error.message
        });
    }
};

// Get tables with their reservations
const listTablesWithReservations = async (req, res) => {
    try {
        const tables = await Table.find({}).populate({
            path: 'reservations',
            populate: {
                path: 'userId',
                select: 'name email'
            }
        });

        const formattedTables = tables.map(table => ({
            tableId: table._id,
            tableNumber: table.number,
            category: table.category,
            numberOfSeats: table.numberOfSeats,
            reservationCount: table.reservations.length,
            reservations: table.reservations.map(res => ({
                reservationId: res._id,
                date: res.date,
                duration: res.duration,
                userName: res.userId?.name || "N/A",
                userEmail: res.userId?.email || "N/A",
            }))
        }));

        return res.json({
            success: true, 
            tables: formattedTables
        });
    } catch (error) {
        return res.json({
            success: false, 
            message: error.message
        });
    }
};

// Get a specific table with its reservations
const getTableById = async (req, res) => {
    try {
        const { tableId } = req.params;

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
                message: "Table not found"
            });
        }

        const formattedTable = {
            tableId: table._id,
            tableNumber: table.number,
            category: table.category,
            numberOfSeats: table.numberOfSeats,
            reservationCount: table.reservations.length,
            reservations: table.reservations.map(res => ({
                reservationId: res._id,
                date: res.date,
                duration: res.duration,
                userName: res.userId?.name || "N/A",
                userEmail: res.userId?.email || "N/A",
            }))
        };

        return res.json({
            success: true, 
            table: formattedTable
        });
    } catch (error) {
        return res.json({
            success: false, 
            message: error.message
        });
    }
};

// Update table information
const updateTable = async (req, res) => {
    try {
        const { tableId } = req.params;
        const { number, category, numberOfSeats } = req.body;

        // Check if another table with the same number exists (excluding current table)
        if (number) {
            const existingTable = await Table.findOne({ 
                number: Number(number), 
                _id: { $ne: tableId } 
            });
            if (existingTable) {
                return res.json({
                    success: false,
                    message: "Another table with this number already exists"
                });
            }
        }

        const updateData = {};
        if (number) updateData.number = Number(number);
        if (category) updateData.category = category;
        if (numberOfSeats) updateData.numberOfSeats = Number(numberOfSeats);

        const updatedTable = await Table.findByIdAndUpdate(
            tableId, 
            updateData, 
            { new: true }
        );

        if (!updatedTable) {
            return res.json({
                success: false,
                message: "Table not found"
            });
        }

        return res.json({
            success: true,
            table: updatedTable,
            message: "Table updated successfully"
        });

    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        });
    }
};

// Delete table (only if no active reservations)
const deleteTable = async (req, res) => {
    try {
        const { tableId } = req.params;

        const table = await Table.findById(tableId).populate('reservations');

        if (!table) {
            return res.json({
                success: false,
                message: "Table not found"
            });
        }

        // Check if table has any future reservations
        const now = new Date();
        const futureReservations = table.reservations.filter(res => new Date(res.date) > now);

        if (futureReservations.length > 0) {
            return res.json({
                success: false,
                message: `Cannot delete table. It has ${futureReservations.length} future reservation(s).`
            });
        }

        await Table.findByIdAndDelete(tableId);

        return res.json({
            success: true,
            message: "Table deleted successfully"
        });

    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        });
    }
};

export { 
    listTables, 
    addTable, 
    listTablesWithReservations, 
    getTableById, 
    updateTable, 
    deleteTable 
};