import React, { useEffect, useState } from 'react';
import { useAuth } from '../components/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function EditBalance() {
    const [balance, setBalance] = useState(0);
    const [paymentInfo, setPaymentInfo] = useState('');
    const [newPaymentInfo, setNewPaymentInfo] = useState('');
    const [lastDigits, setLastDigits] = useState(0);
    const [selectedOption, setSelectedOption] = useState('existing');
    const [userInput, setUserInput] = useState('');

    const { uid } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:2000/${uid}/balance`);
                console.log("get data:", response.data[0]);
                setBalance(response.data[0].AccountBalance);
                setPaymentInfo(response.data[0].PaymentInfo);

                // Update lastDigits when paymentInfo is fetched
                if (response.data[0].PaymentInfo) {
                    const newLastDigits = response.data[0].PaymentInfo.slice(-4);
                    setLastDigits(newLastDigits);
                    console.log('last 4', newLastDigits);
                }
            } catch (error) {
                console.error("Error getting balance", error);
            }
        };

        fetchData(); // Call the fetchData function initially
    }, [uid, setBalance, setPaymentInfo, setLastDigits]);

    const handleChange = (e) => {
        setUserInput(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Display confirmation dialog
        const isConfirmed = window.confirm("Are you sure you want to charge this payment method?");

        if (isConfirmed) {
            try {
                // Calculate the new balance by adding the user input to the original balance
                const newBalance = parseFloat(balance) + parseFloat(userInput);

                // Use the calculated new balance for the PUT request
                const response = await axios.put(`http://localhost:2000/${uid}/balance`, { AccountBalance: newBalance });

                console.log(response);

                // Reload the page after successful update
                navigate('/savings');
            } catch (error) {
                console.error("Error changing balance", error);
            }
        }
    };

    const handleUpdatePayment = async (e) => {
        e.preventDefault();

        // Validation: Check if the new payment info matches the pattern of four groups of four digits
        const paymentInfoPattern = /^\d{4}-\d{4}-\d{4}-\d{4}$/;
        if (!paymentInfoPattern.test(newPaymentInfo)) {
            alert("Please enter a valid payment info in the format xxxx-xxxx-xxxx-xxxx");
            return;
        }

        try {
            const response = await axios.put(`http://localhost:2000/${uid}/updatepayment`, { PaymentInfo: newPaymentInfo });
            console.log(response);

            // Reload the page after successful update
            window.location.reload();
        } catch (error) {
            console.error("Error changing payment info", error);
        }
    };

    return (
        <div className="edit">
            <h2>How would you like to add Credits?</h2>
            <form>
                <div>
                    <label>
                        <input
                            type="radio"
                            name="choosing-method"
                            value="existing"
                            checked={selectedOption === 'existing'}
                            onChange={() => setSelectedOption('existing')}
                        />
                        Use Payment Ending in {lastDigits}
                    </label>
                </div>
                <div>
                    <label>
                        <input
                            type="radio"
                            name="choosing-method"
                            value="new"
                            checked={selectedOption === 'new'}
                            onChange={() => setSelectedOption('new')}
                        />
                        Change Payment Info
                    </label>
                </div>
            </form>
            {selectedOption === 'existing' && (
                <form onSubmit={handleSubmit}>
                    <label>$</label>
                    <input
                        type="text"
                        name="AccountBalance"
                        value={userInput}
                        onChange={handleChange}
                    />
                    <button className="accept" type="submit">
                        Add Funds
                    </button>
                </form>
            )}
            {selectedOption === 'new' && (
                <form onSubmit={handleUpdatePayment}>
                    <label>New Payment Info</label>
                    <input
                        type="text"
                        name="newPaymentInfo"
                        value={newPaymentInfo}
                        onChange={(e) => setNewPaymentInfo(e.target.value)}
                    />
                    <button className="accept" type="submit">
                        Update Payment Info
                    </button>
                </form>
            )}
        </div>
    );
}

export default EditBalance;
