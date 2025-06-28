import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from "axios"
import { Await, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { listReservation } from '../../../backend/controllers/reservationController';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const api_url = import.meta.env.VITE_BACKEND_URL

    const [token, setToken] = useState("")
    const [user, setUser] = useState(null) // Add user state
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()

    // Decode token to get user info
    const decodeToken = (token) => {
        try {
            const payload = token.split('.')[1];
            return JSON.parse(atob(payload));
        } catch (error) {
            console.error('Error decoding token:', error);
            return null;
        }
    };

    const login = async (userData) => {
        try {
            const response = await axios.post(`${api_url}/users/login`, userData)
            if (response.data.success) {
                setToken(response.data.token)
                localStorage.setItem("token", response.data.token)

                // Decode token to get user info
                const userInfo = decodeToken(response.data.token);
                setUser(userInfo);

                toast.success("Login successful")
                navigate("/")
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message)
        }
    };

    const logout = () => {
        setToken("");
        setUser(null);
        localStorage.removeItem('token');
        navigate("/login")
    };

    const isAuthenticated = () => {
        return token !== "";
    };

    const register = async (userData) => {
        try {
            const response = await axios.post(`${api_url}/users/register`, userData)
            if (response.data.success) {
                setToken(response.data.token)
                localStorage.setItem("token", response.data.token)

                // Decode token to get user info
                const userInfo = decodeToken(response.data.token);
                setUser(userInfo);

                toast.success("Signup successful")
                navigate("/")
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message)
        }
    };

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
            const userInfo = decodeToken(storedToken);
            setUser(userInfo);
        }
        setLoading(false);
    }, []);

    // Reservation-related state
    const [date, setDate] = useState(() => new Date().toISOString().split("T")[0]);
    const [persons, setPersons] = useState(2)
    const [stamps, setStamps] = useState([])
    const [reservations, setReservations] = useState([])


    const getStamps = async (date, numberOfSeats) => {
        try {
            const response = await axios.post(`${api_url}/reservations/list`, {
                date,
                numberOfSeats
            })

            if (response.data.success) {
                console.log(response.data);
                setStamps(response.data.slots || []);
            } else {
                console.log(response.data);
                toast.error(response.data.message)
                setStamps([]);
            }
        } catch (error) {
            console.error('Get stamps error:', error);
            toast.error(error.response?.data?.message || error.message)
        }
    }

    const makeReservation = async (selectedTime, duration = 1) => {
        try {
            // Validate inputs
            if (!date || !selectedTime || !duration || !persons) {
                toast.error("Please select date, time, duration and number of persons");
                return false;
            }

            if (!user?.id) {
                toast.error("User not authenticated");
                return false;
            }

            // Convert to numbers
            const numPersons = Number(persons);
            const numDuration = Number(duration);

            if (isNaN(numPersons) || numPersons < 1) {
                toast.error("Number of persons must be at least 1");
                return false;
            }

            if (isNaN(numDuration) || numDuration < 1) {
                toast.error("Duration must be at least 1 hour");
                return false;
            }

            // Create proper date with selected time
            const [hours, minutes] = selectedTime.split(':').map(Number);
            const reservationDateTime = new Date(date);
            reservationDateTime.setHours(hours, minutes || 0, 0, 0);

            // Check if the reservation is for a past time
            const now = new Date();
            if (reservationDateTime < now) {
                toast.error("Cannot make reservations for past times");
                return false;
            }

            // Create reservation
            const response = await axios.post(
                `${api_url}/reservations/make`,
                {
                    userId: user.id,
                    date: reservationDateTime.toISOString(),
                    duration: numDuration,
                    numberOfSeats: numPersons
                },
                {
                    headers: {
                        token,
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (response.data.success) {
                toast.success(
                    `Reservation confirmed! Table ${response.data.tableNumber} for ${numDuration} hour(s)`
                );

                // Refresh available slots
                await getStamps(date, numPersons);
                await getUserReservations()
                return true;
            } else {
                toast.error(response.data.message || "Failed to make reservation");
                return false;
            }
        } catch (error) {
            console.error("Reservation error:", error);

            const errorMessage = error.response?.data?.message
                || error.message
                || "Failed to make reservation";

            toast.error(errorMessage);
            return false;
        }
    }

    // Fetch stamps when dependencies change
    useEffect(() => {
            getStamps(date, persons);
        
    }, [date, persons]);

    const getUserReservations = async () => {
        try {
            const response = await axios.post(
                `${api_url}/reservations/list-reservations`,
                {},
                {
                    headers: { token }
                }
            );

            setReservations(response.data.reservations);

        } catch (error) {
            console.error("Reservation error:", error);

            const errorMessage = error.response?.data?.message
                || error.message
                || "Failed to make reservation";

            toast.error(errorMessage);
            return false;
        }

    }
    const cancelReservations = async (id) => {
        try {
            const response = await axios.post(
                `${api_url}/reservations/cancel`,
                { reservationId: id },
                {
                    headers: { token }
                }
            );

            if (response.data.success) {
                toast.success("Reservation cenceled successfully");
                await getUserReservations(); // Refresh the list
                return true;
            } else {
                toast.error(response.data.message || "Cancel failed");
                return false;
            }
        } catch (error) {
            console.error("Update error:", error);
            toast.error(error.response?.data?.message || "Update failed");
            return false;
        }

    }
    const UpdateReservations = async (payload) => {
        try {
            const response = await axios.put(
                `${api_url}/reservations/update`,
                payload,
                {
                    headers: { token }
                }
            );

            if (response.data.success) {
                toast.success("Reservation updated successfully");
                await getUserReservations(); // Refresh the list
                return true;
            } else {
                toast.error(response.data.message || "Update failed");
                return false;
            }
        } catch (error) {
            console.error("Update error:", error);
            toast.error(error.response?.data?.message || "Update failed");
            return false;
        }
    };

    useEffect(() => {
        if (token) {
            getUserReservations()
        }
    }, [user])

    const [menu, setMenu] = useState([])
    
    const getMenu = async () => {
        try {
            const response = await axios.get(`${api_url}/menu/`, {
                headers: { token }
            });

            if (!response.data.success) {
                toast.error("Couldn't fetch menu");
                return;
            }

            const grouped = {};
            console.log(response.data);
            
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

    useEffect(() => {
        getMenu()
    }, [])

    return (
        <AuthContext.Provider value={{
            // Auth
            login,
            logout,
            register,
            isAuthenticated,
            loading,
            token,
            user,

            // Reservation
            cancelReservations,
            UpdateReservations,
            makeReservation,
            date,
            setDate,
            persons,
            setPersons,
            stamps,
            setStamps,
            getStamps,
            reservations,

            //menu ,
            menu
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};

export default AuthContext;