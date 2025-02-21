import axios from "axios";

export function createRefCode() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < 12; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}


export function calculateDaysFromDate(dateString) {
    const date = new Date(dateString);
    const currentDate = new Date();

    const differenceInTime = currentDate - date;

    const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));

    return differenceInDays;
}

export function calculateTimeDifference(specificTimeString) {
    // Create a date object for the current date  
    const currentDate = new Date();

    // Parse the specific time string into a date object  
    const [timeString, modifier] = specificTimeString.split(" ");
    const [hours, minutes, seconds] = timeString.split(":").map(Number);

    // Create a new date object for the specific time today  
    const specificTimeDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(),
        modifier === "PM" ? hours + 12 : hours, minutes, seconds);

    // Calculate the difference in milliseconds  
    const differenceInTime = currentDate - specificTimeDate;

    // Convert the difference to hours, minutes, and seconds  
    const differenceInSeconds = Math.floor(differenceInTime / 1000);
    const hoursDiff = Math.floor(differenceInSeconds / 3600);
    const minutesDiff = Math.floor((differenceInSeconds % 3600) / 60);
    const secondsDiff = differenceInSeconds % 60;

    return {
        hours: hoursDiff,
        minutes: minutesDiff,
        seconds: secondsDiff
    };
}

export async function getWithdrawReq(address, setTriple, setTotalWithReq, setDepositStatus) {
    const response = await axios.get(`/api/getWithdrawReq?address=${address}`)
    let fixed = response.data.triple.toFixed(2)
    setTriple(fixed)
    let fixed2 = response.data.result.toFixed(2)
    setTotalWithReq(fixed2)
    if (response.data.result >= response.data.triple) {
        setDepositStatus({ message: 'please do deposit!', messageColor: 'text-red-500' })
    }
}


export async function getTopupValue(address, setWithdraw) {
    const response = await axios.get(`/api/getWithdrawReq?address=${address}`)
    const fixedRes = response.data.result.toFixed(2)
    setWithdraw(fixedRes == 0 ? 0 : fixedRes)
}

export async function getTransaction(address, setTransactions) {
    const transactions = await axios.get(`/api/getTransaction?address=${encodeURIComponent(address)}`)
    setTransactions(transactions.data.userTransactions);
}

export async function getInvest(address, setDeposit, setInvestValue) {
    const response = await axios.get(`/api/getInvest?address=${address}`)
    let fixedRes = response.data.invest.toFixed(2)
    let fixed = response.data.deposit.toFixed(2)
    setDeposit(fixed)
    setInvestValue(fixedRes)
}

export async function getUser(address, setPriceValue, setWithdrawableAmount) {
    try {
        const response = await axios.get(`/api/getPrice?address=${encodeURIComponent(address)}`)
        const price = await response.data.price.price

        if (price) {
            let fixedPrice = price.toFixed(2)
            setPriceValue(fixedPrice);
            setWithdrawableAmount(fixedPrice)
        } else {
            console.warn(`No price found: ${price}`);
        }
        return response
    } catch (error) {
        console.log(error);
    }
}
