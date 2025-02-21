import Container from "../Container"

const WithdrawComp = ({ isChecked, handleSubmit, handleChange, values, handleChangeCheckBox, status, renderAlert }) => {
    return (
        <>
            <Container>
                <form id="withdraw" onSubmit={(e) => handleSubmit(e)} className="w-full flex flex-col gap-3 items-start">
                    <p>Submit a withdrawal request</p>
                    {!isChecked && <div className="flex flex-col w-full gap-1">
                        <label>wallet address</label>
                        <input type="text" value={values.address} onChange={(e) => handleChange(e)} name="address" className="p-2 rounded text-gray-800 outline-none" placeholder="Enter receipt wallet address" />
                    </div>}
                    <div className="flex flex-col w-full gap-1">
                        <label>Amount</label>
                        <input type="number" value={values.amount} onChange={(e) => handleChange(e)} name='amount' className="p-2 rounded text-gray-800 outline-none" placeholder="Enter Amount" />
                    </div>

                    <div className="flex gap-1 justify-start w-full">
                        <input type="checkbox" onChange={(e) =>
                            handleChangeCheckBox(e)} checked={isChecked} id="remember" className="rounded" />
                        <label htmlFor="remember" className="text-[#00FF5E]">Use your current wallet address?</label>
                    </div>
                    <div className="w-full text-center">
                        <button className="py-1 px-6 border rounded-full border-[#20FF44] text-center">Submit</button>
                    </div>
                    <div className="flex w-full items-center justify-center">
                        {status && renderAlert(status)}
                    </div>

                </form>

            </Container>
        </>
    )
}

export default WithdrawComp