import Image from "next/image"
import commision from '../../../public/icons/Data.png'
import deposit from '../../../public/icons/Row.png'
import withdraw from '../../../public/icons/Body.png'
import { useEffect, useState } from "react"



const UserTransactions = ({ transactionsArray }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [transactionsPerPage] = useState(5);
    const [time, setTime] = useState('')

    const dataArray = [
        { icon: commision, title: 'commision', date: '14 Mar, 2021', title1: 'n(Matic)', action: 'Amount', color: '#00FF7F' },
        { icon: deposit, title: 'deposit', date: '14 Mar, 2021', title1: 'n(Matic)', action: 'Panel', color: '#FFF50A' },
        { icon: withdraw, title: 'withdraw', date: '14 Mar, 2021', title1: 'n(Matic)', action: 'Panel', color: '#FD625E' },
        { icon: withdraw, title: 'withdraw', date: '14 Mar, 2021', title1: 'n(Matic)', action: 'Panel', color: '#FD625E' },
        { icon: commision, title: 'commision', date: '14 Mar, 2021', title1: 'n(Matic)', action: 'Amount', color: '#00FF7F' },
        { icon: commision, title: '(Number_ID)', date: '14 Mar, 2021', title1: 'n(Matic)', action: 'Panel', color: '#00FF7F' },
    ]
    const today = new Date();
    const formattedDate = today.toDateString();
    const totalPages = Math.ceil(transactionsArray.length / transactionsPerPage);

    const indexOfLastTransaction = currentPage * transactionsPerPage;
    const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
    const currentTransactions = transactionsArray.slice(indexOfFirstTransaction, indexOfLastTransaction);

    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };
    useEffect(() => {
        setTime(formattedDate)
    }, [])
    return (
        <>
            <div className='shadow-main backdrop-blur-sm text-white flex flex-col items-center gap-2 border border-[#00F0FF] rounded-2xl m-8 pt-3'>
                <h3 className='font-bold text-lg'>Transactions</h3>
                <h3 className=' text-md'>{time}</h3>
                {currentTransactions.length > 0 ?
                    <div className='w-full h-auto flex flex-col overflow-auto gap-5 items-center border border-[#00F0FF] rounded-2xl p-3'>
                        {currentTransactions?.map((item, index) => (
                            <>
                                <div className="w-full flex flex-col items-center gap-2 justify-around border-b p-5">
                                    <div key={index} className="w-full flex justify-around gap-5">
                                        <div className="flex gap-3 items-center">

                                            <Image width={20} height={20} className={item.status === 'approve' && `rotate-180`} src={item.status === 'pending' ? deposit : item.status === 'decline' || item.status === 'ignore' ? withdraw : commision} alt="" />
                                            <span>
                                                <p className={item.status === 'pending' ? `text-[#FFF50A]` : item.status === 'approve' || item.transactionType === 'deposit' ? 'text-[#00FF7F]' : item.transactionType === 'withdraw' ? 'text-[#FD625E]' : ''}>{item.transactionType}</p>
                                                <p>{item.date}</p>
                                                <p>{item.time}</p>
                                            </span>
                                        </div>
                                        <span className="flex flex-col items-center justify-center mx-8">
                                            <p className={item.status === 'pending' ? `text-[#FFF50A]` : item.status === 'approve' || item.transactionType === 'deposit' ? 'text-[#00FF7F]' : item.transactionType === 'withdraw' ? 'text-[#FD625E]' : ''}>{item.status}</p>
                                            <p>{item.amount} USDT</p>
                                        </span>
                                    </div>
                                </div>
                            </>
                        ))}
                        <div className="flex justify-between items-center w-full p-3">
                            <button onClick={prevPage} disabled={currentPage === 1} className="bg-transparent border border-[#20A1FF] shadow-main px-5 p-2 rounded-full my-2 disabled:opacity-50">◄ Previous</button>
                            <span className="text-white">Page {currentPage} of {totalPages}</span>
                            <button onClick={nextPage} disabled={currentPage === totalPages} className="bg-transparent border border-[#20A1FF] shadow-main px-5 p-2 rounded-full my-2 disabled:opacity-50">Next ►</button>
                        </div>
                    </div>
                    :
                    <div className="text-white text-center border w-full h-32 flex items-center justify-center border-[#00F0FF] rounded-2xl p-3">there is no any activity...</div>
                }

            </div>

        </>
    )
}

export default UserTransactions