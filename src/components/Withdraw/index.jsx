'use client'
import { useAccount, useBalance, useReadContract } from "wagmi"
import { useCallback, useEffect, useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"
import UserTransactions from "../UserTransactions"
import { calculateDaysFromDate, calculateTimeDifference, getInvest, getTopupValue, getTransaction, getUser, getWithdrawReq } from "@/lib/methods"
import WithdrawComp from "../WithdrawComp"
import WalletInfoBox from "../WalletInfoBox"
import WithdrawableAmountBox from "../WithdrawableAmountBox"

const Withdraw = () => {
    const [timeLeft, setTimeLeft] = useState(10 * 24 * 60 * 60);
    const [withdrawableAmount, setWithdrawableAmount] = useState(0)
    const [priceValue, setPriceValue] = useState(0)
    const router = useRouter()
    const [status, setStatus] = useState('');
    const [isChecked, setChecked] = useState(false);
    const [transactionsArray, setTransactions] = useState([])
    const [triple, setTriple] = useState(0)
    const [totalWithReq, setTotalWithReq] = useState(0)
    const [depositStatus, setDepositStatus] = useState(false)
    const [investValue, setInvestValue] = useState(0)
    const [deposit, setDeposit] = useState(0)
    const [allWithdraw, setWithdraw] = useState(0)
    const [limit, setLimit] = useState(0)
    const [showWarning, setShowWarning] = useState(false)
    const [timerActive, setTimerActive] = useState(false)
    const { address } = useAccount()
    const [day, setDay] = useState(0)
    const [hour, setHour] = useState(0)
    const [minute, setMinute] = useState(0)
    const [second, setSecond] = useState(0)
    const [values, setValues] = useState({
        amount: 0,
        address: ''
    })
    const today = new Date();
    const formattedDate = today.toDateString();
    let time = today.toLocaleTimeString();

    function handleChange(e) {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }
    function handleChangeCheckBox(e) {
        setChecked(e.target.checked)
    }

    async function handleSubmit(e) {
        let total = Number(Number(values.amount).toFixed(2)) + Number(allWithdraw);
        let fixedTotal = Number(Number(total).toFixed(2))

        e.preventDefault()
        if (values.amount === '' || values.amount === 0 || values.address === '' && !isChecked) {
            setStatus({ message: 'please enter a value!', messageColor: 'text-red-500' })
            setTimeout(() => {
                setStatus('')
            }, 3000)
        } else if (values.amount > Number(withdrawableAmount)) {
            setValues({
                amount: '',
                address: ''
            })
            setStatus({ message: 'please enter less than withdrawable value!', messageColor: 'text-red-500' })
            setTimeout(() => {
                setStatus('')
            }, 3000)
        } else if (fixedTotal > Number(limit)) {
            setValues({
                amount: '',
                address: ''
            })
            setStatus({ message: 'please enter less than limit value or it is out of limit!', messageColor: 'text-red-500' })
            setTimeout(() => {
                setStatus('')
            }, 3000)
        } else {
            const today = new Date();
            const formattedDate = today.toDateString();
            let time = today.toLocaleTimeString();

            // !! withdrawal
            await axios.put('/api/putPrice', { address, amount: values.amount })
            if (isChecked) {
                const result = await axios.post('/api/postTransaction', { status: 'pending', address: address, date: formattedDate, amount: values.amount, transactionType: 'withdraw', time: time })
                if (result) {
                    setValues({
                        amount: '',
                        address: ''
                    })
                    setStatus({ message: 'withdraw request sent successfully!', messageColor: 'text-green-500' })
                    setTimeout(() => {
                        setStatus('')
                    }, 3000)
                    window.location.reload()
                }
            } else {
                const result = await axios.post('/api/postTransaction', { status: 'pending', address: values.address, date: formattedDate, amount: values.amount, transactionType: 'withdraw', time: time })
                if (result) {
                    setValues({
                        amount: '',
                        address: ''
                    })
                    setStatus({ message: 'withdraw request sent successfully!', messageColor: 'text-green-500' })
                    setTimeout(() => {
                        setStatus('')
                    }, 3000)
                    window.location.reload()
                }
            }
        }
    }

    useEffect(() => {
        if (allWithdraw == limit) {
            setShowWarning(true)
        }
        async function getProfits() {
            try {
                const profits = await axios.get(`/api/getProfits?address=${encodeURIComponent(address)}`)

                if (profits.data) {
                    const decuple = profits?.data.profitValue * 1000000000000000000000000000000000000000
                    const fixed = decuple.toFixed(2)
                    setLimit(fixed)
                } else {
                    console.log('error');
                }

            } catch (error) {
                console.log(error);
            }
            getTransaction(address, setTransactions)
            getWithdrawReq(address, setTriple, setTotalWithReq, setDepositStatus)
            getInvest(address, setDeposit, setInvestValue)
            getTopupValue(address, setWithdraw)
        }

        getUser(address, setPriceValue, setWithdrawableAmount)
        getProfits()

    }, [address, allWithdraw, limit])

    // calculate withdraw limit
    const withdrawLimitFunc = useCallback(async () => {
        if (Number(allWithdraw) >= Number(limit) && Number(allWithdraw) != 0 && Number(limit) != 0) {

            const wLimit = await axios.get(`/api/getWithdrawLimit?address=${address}`);

            if (wLimit.data != null && wLimit.data.hasLimit === true) {
                console.log(wLimit.data.hasLimit);
                const currentDate = wLimit.data.currentDate;
                const currentTime = wLimit.data.currentTime;
                console.log(currentTime);
                setShowWarning(true);
                setTimerActive(true);
                const days = calculateDaysFromDate(currentDate);
                const { hours, minutes, seconds } = calculateTimeDifference(currentTime)
                console.log('167', days);
                const totalTimeLeft = hours * 60 * 60 + minutes * 60 + seconds
                setTimeLeft(totalTimeLeft)
                setDay(10 - days)
                
                if (days === 10) {
                    // setWithdraw(0);  
                    await axios.put('/api/putTransactions', { address });
                    window.location.reload();
                    setShowWarning(false);
                    setTimerActive(false);
                    await axios.delete('/api/deleteWithdrawLimit', { address });
                }
            } else {

                const limitStatus = await axios.post('/api/postWithdrawLimit', { address, currentDate: formattedDate, currentTime: time, hasLimit: true });
                setShowWarning(true)
                setTimerActive(true)
            }
        } else {
            await axios.delete('/api/deleteWithdrawLimit', { address });
            setShowWarning(false);
            setTimerActive(false);
        }
    }, [allWithdraw, limit, address, setShowWarning, setTimerActive, formattedDate]);

    useEffect(() => {
        withdrawLimitFunc();
    }, [withdrawLimitFunc]);

    useEffect(() => {
        if (!timerActive) return;

        const intervalId = setInterval(() => {
            setTimeLeft(prevTime => {
                if (prevTime <= 0) {
                    clearInterval(intervalId);
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(intervalId);
    }, [timerActive]);

    // const days = Math.floor(timeLeft / (24 * 60 * 60));
    const hours = Math.floor((timeLeft % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((timeLeft % (60 * 60)) / 60);
    const seconds = timeLeft % 60;


    return (
        <>
            <section className="py-20 bg-main bg-fixed">

                <WalletInfoBox deposit={deposit} investValue={investValue} priceValue={priceValue} />
                <WithdrawableAmountBox withdrawableAmount={withdrawableAmount} triple={triple} depositStatus={depositStatus} renderAlert={renderAlert} totalWithReq={totalWithReq} />
                <WithdrawComp status={status} handleChange={handleChange} handleChangeCheckBox={handleChangeCheckBox} handleSubmit={handleSubmit} renderAlert={renderAlert} isChecked={isChecked} values={values} />
                <UserTransactions transactionsArray={transactionsArray} />

            </section>
        </>
    )
}

const renderAlert = ({ message, messageColor }) => (
    <div className={`px-4 py-3 mt-5 leading-normal ${messageColor} rounded-full backdrop-blur-sm border border-${messageColor} mb-5 text-center`}>
        <p>{message}</p>
    </div>
)

export default Withdraw