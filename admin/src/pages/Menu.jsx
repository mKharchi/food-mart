import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { backendUrl } from '../App'

const Menu = ({ token }) => {
    const [menu, setMenu] = useState({});
    const [show, setShow] = useState(false);
    const [edit, setEdit] = useState(false);

    const [newItem, setNewItem] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        available: true,
    });

    const getMenu = async () => {
        try {
            const response = await axios.get(`${backendUrl}/menu/`, {
                headers: { token }
            });

            if (!response.data.success) {
                toast.error("Couldn't fetch menu");
                return;
            }

            const grouped = {};
            console.log(response.data.menu);

            response.data.menu.forEach(item => {
                if (!grouped[item.category]) {
                    grouped[item.category] = [item];
                } else {
                    grouped[item.category].push(item);
                }
            });

            setMenu(grouped);

        } catch (error) {
            toast.error(error.message || "Failed to fetch menu");
        }
    };

    const addMenuItem = async () => {
        const { name, description, price, category } = newItem;
        if (!name || !description || !price || !category) {
            toast.warn("Please fill in all fields");
            return;
        }

        try {
            const response = edit
                ? await axios.put(`${backendUrl}/menu/${newItem._id}`, newItem, { headers: { token } })
                : await axios.post(`${backendUrl}/menu/add`, newItem, { headers: { token } });


            if (response.data.success) {
                toast.success("Item added successfully");
                setEdit(false); // Reset edit mode

                setNewItem({
                    name: '',
                    description: '',
                    price: '',
                    category: '',
                    available: true
                });
                setShow(false);
                getMenu(); // Refresh the menu list
            } else {
                toast.error(response.data.message || "Failed to add item");
            }
        } catch (error) {
            toast.error(error.message || "Error adding menu item");
        }
    };

    useEffect(() => {
        getMenu();
    }, []);

    return (
        <div className='p-6 flex flex-col gap-8'>
            {show && (
                <div className='bg-white/80 shadow p-6 rounded-lg w-full md:w-2/3 lg:w-1/2'>
                    <h2 className='text-2xl font-semibold mb-4'>Add Menu Item</h2>
                    <div className='flex flex-col gap-3'>
                        <input
                            type='text'
                            placeholder='Item name'
                            value={newItem.name}
                            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                            className='p-2 border rounded'
                        />
                        <input
                            type='text'
                            placeholder='Description'
                            value={newItem.description}
                            onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                            className='p-2 border rounded'
                        />
                        <input
                            type='number'
                            placeholder='Price'
                            value={newItem.price}
                            onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                            className='p-2 border rounded'
                        />
                        <input
                            type='text'
                            placeholder='Category (e.g., drinks, mains, desserts)'
                            value={newItem.category}
                            onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                            className='p-2 border rounded'
                        />

                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="available"
                                checked={newItem.available}
                                onChange={(e) => setNewItem({ ...newItem, available: e.target.checked })}
                            />
                            <label htmlFor="available" className="font-medium">Available</label>
                        </div>

                        <button
                            onClick={addMenuItem}
                            className='bg-green-600 text-white px-4 py-2 rounded font-semibold'
                        >
                            Add Item
                        </button>
                    </div>
                </div>
            )}

            <h1 className='text-3xl font-bold mb-4'>Menu</h1>

            {Object.keys(menu).length === 0 ? (
                <>
                    <p className="text-gray-600">No menu items found.</p>
                    {!show && (
                        <button
                            className='p-2 bg-black text-white rounded'
                            onClick={() => setShow(true)}
                        >
                            Add your first menu item
                        </button>
                    )}
                </>
            ) : (
                <>
                    {!show && (
                        <button
                            className='p-2 bg-black text-white rounded w-fit'
                            onClick={() => setShow(true)}
                        >
                            + Add Menu Item
                        </button>
                    )}
                    {Object.entries(menu).map(([category, items], index) => (
                        <div key={category} className='mb-6'>
                            <h1 className='text-3xl 2xl:text-6xl mb-2 text-center w-full font-bold'>{category}</h1>

                            <div
                                className={`flex flex-col gap-3 items-center w-1/2 ${index % 2 === 0 ? 'mr-auto' : 'ml-auto'
                                    }`}
                            >
                                {items.map(item => (
                                    <div
                                        key={item._id}
                                        className='flex flex-col 2xl:p-2 items-start justify-center gap-3 rounded-lg min-w-[255px] w-full  p-4'
                                    >
                                        <div className='flex items-center text-2xl font-semibold justify-end w-full 2xl:px-4 py-2'>
                                            ${item.price}
                                        </div>
                                        <hr className='border w-full' />
                                        <h1 className='text-3xl 2xl:text-5xl text-left 2xl:px-4 w-full'>{item.name}</h1>
                                        <p className='flex items-center justify-start w-full 2xl:max-w-sm text-lg text-left text-gray-600 2xl:px-4'>
                                            {item.description}
                                        </p>

                                        {/* ✅ Buttons container */}
                                        <div className='flex justify-end gap-3 w-full px-4 mt-2'>
                                            <button
                                                onClick={() => {
                                                    
                                                    setShow(true);
                                                    setNewItem(item);
                                                    setEdit(true)
                                                }}
                                                className='px-3 py-1 bg-black text-white rounded hover:opacity-80 transition-all duration-200'
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={async () => {
                                                    try {
                                                        const response = await axios.post(`${backendUrl}/menu/${item._id}`, {}, {
                                                            headers: { token }
                                                        });
                                                        if (response.data.success) {
                                                            toast.success("Item deleted");
                                                            getMenu();
                                                        } else {
                                                            toast.error(response.data.message);
                                                        }
                                                    } catch (error) {
                                                        toast.error(error.message || "Error deleting item");
                                                    }
                                                }}
                                                className='px-3 py-1 border '
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                ))}

                            </div>
                        </div>
                    ))}

                </>
            )}
        </div>
    );
};

export default Menu;