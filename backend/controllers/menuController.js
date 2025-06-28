import MenuItem from "../models/menuItemModel.js";


const addItem = async (req, res) => {
    try {
        const { name, description, price, category, available } = req.body
        if (!name || !description || !price || !category || !available) {
            return res.json({
                success: false, message: "All fields are mendatory"
            })
        }

        const existing_item = await MenuItem.find({ name })
        if (existing_item.lenth > 0) {
            return res.json({
                success: false, message: "Item already existing"
            })
        }

        const item = new MenuItem({ name, available, category, description, price })
        const savedItem = await item.save()
        return res.json({
            success: true, item: savedItem
        })
    } catch (error) {
        return res.json({
            success: false, message: error.message
        })
    }
}

const getMenu = async (req, res) => {
    try {
        const menu = await MenuItem.find()
        return res.json({
            success: true, menu
        })


    } catch (error) {
        return res.json({
            success: false, message: error.message
        })
    }
}

const updateItem = async (req, res) => {

    const { id } = req.params
    try {

        const { name, description, price, category, available } = req.body
        
        await MenuItem.findByIdAndUpdate(id, {
            name, description, price, category, available
        })

        return res.json({
            success: true, message: "Item updated successfully"
        })
    } catch (error) {
        return res.json({
            success: false, message: error.message
        })
    }
}

const removeItem = async (req, res) => {

    const { id } = req.params
    try {
        const itemToDelete = await MenuItem.findById(id)
        if (!itemToDelete) {
            return res.json({
                success: false, message: "No item found"
            })
        }
        await MenuItem.findByIdAndDelete(id)

        return res.json({
            success: true, message: "Item updated successfully"
        })


    } catch (error) {
        return res.json({
            success: false, message: error.message
        })
    }
}


export { addItem, getMenu, removeItem, updateItem }

/*


PUT /menu/:id – Update item

DELETE /menu/:id*/