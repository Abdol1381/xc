const Container = ({ children }) => {
    return (
        <>
            <div className='shadow-main text-white flex flex-col backdrop-blur-sm items-center gap-3 border border-[#00F0FF] rounded-2xl m-8 p-5'>
                {children}
            </div>
        </>
    )
}

export default Container