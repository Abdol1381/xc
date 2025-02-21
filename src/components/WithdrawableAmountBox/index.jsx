import Container from "../Container"

const WithdrawableAmountBox = ({ withdrawableAmount, triple, totalWithReq, depositStatus, renderAlert }) => {
    return (
        <>
            <Container>
                <p className="text-lg ">the withdrawable amount is: </p>
                <p className="text-gray-300">
                    {withdrawableAmount} USDT
                </p>
                <p className="text-lg">your withdraw requests until triple:</p>
                <span className={triple - totalWithReq <= 10 ? `text-red-500` : triple - totalWithReq <= 20 && triple - totalWithReq >= 10 ? `text-yellow-500` : `text-green-500`}>{totalWithReq} / {triple}</span>
                {depositStatus && renderAlert(depositStatus)}


            </Container>
        </>
    )
}

export default WithdrawableAmountBox