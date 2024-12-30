"use client"
import { useState, useEffect } from 'react'
import Script from 'next/script'
import Image from 'next/image'
import { fetchUser, fetchPayments, deleteFailedPayments, initiate } from '@/app/actions/userActions'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

const PaymentPage = ({ username }) => {
    const { data: session } = useSession()
    const router = useRouter()
    // if (!session) {
    //     router.push("/", undefined, { shallow: true })
    // }
    const [currentUser, setCurrentUser] = useState({})
    const [payments, setPayments] = useState([])
    const [paymentform, setPaymentform] = useState({
        name: '',
        amount: '',
        message: ''
    })

    useEffect(() => {
        const getData = async () => {
            let user = await fetchUser(username)
            setCurrentUser(user)
            let payment = await fetchPayments(username)
            setPayments(payment)
        }
        deleteFailedPayments()
        getData()
    }, [username])


    const handleChange = (e) => {
        setPaymentform({ ...paymentform, [e.target.name]: e.target.value })
    }
    const isDisabled = (btntype) => {
        if (btntype === 'mainbtn') {
            if (!paymentform.name || !paymentform.amount || !paymentform.message) {
                return true
            }
            else {
                return false
            }
        }
        if (btntype === 'quickbtn') {
            if (!paymentform.name || !paymentform.message) {
                return true
            }
            if (!paymentform.amount) {
                return false
            }
            else {
                return true
            }
        }
    }

    const pay = async (amount) => {
        // get orderID
        let ord = await initiate(amount, username, paymentform)
        let orderID = ord.id
        let options = {
            "key": currentUser.razorpay_id, // Replace with your Razorpay key_id
            "amount": amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": 'INR',
            "name": 'Get me a Chai',
            "description": 'Test Transaction',
            "order_id": orderID, // This is the order_id created in the backend
            "callback_url": `${process.env.NEXT_PUBLIC_URL}/api/razorpay`, // Your success URL
            prefill: {
                name: 'Biprosom Majumder',
                email: 'biprosommajumder@gmail.com',
                contact: '9064246324'
            },
            theme: {
                color: '#F37254'
            },
        }
        var rzp1 = new Razorpay(options);
        rzp1.open();
    }

    return (
        <>
            <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>

            <div className="cover_image relative">
                <Image className='w-full h-[400px]' src={currentUser.coverpic || '/DefaultCoverPicture.jpg'} alt='cover' width={0} height={0} unoptimized='true'></Image>
                <span className='absolute right-[calc(50vw-50px)] -bottom-12 shadow-md shadow-slate-500 overflow-hidden rounded-xl w-24 h-24'><Image unoptimized='true' className='w-full h-full' src={currentUser.profilepic || '/DefaultProfilePicture.jpg'} alt='profile-picture' width={0} height={0}></Image></span>
            </div>
            <div className="info flex flex-col items-center mt-16 mb-5 gap-1">
                <h1 className='text-2xl font-bold'>@{username}</h1>
                <span className=''>Creating Animated art for Funzees!</span>
                <span className='text-sm text-slate-300'>9,719 members <span className='text-white'>&nbsp;•&nbsp;</span> 82 posts <span className='text-white'>&nbsp;•&nbsp;</span> $15,450/release</span>
            </div>
            <div className='flex justify-center'>
                <button className='px-20 py-3 rounded-xl focus:outline focus:outline-2 focus:outline-violet-200 bg-violet-600 hover:bg-violet-700 transition font-bold'>Join for free</button>
            </div>
            <div className='w-11/12 mx-auto flex gap-2 mt-10 h-96'>
                <div className="payment w-1/2 bg-slate-900 rounded-xl p-4 h-full">
                    <div className="supporters h-full">
                        {/* show list of all the supporters as a leaderboard */}
                        <h2 className='font-bold text-xl pb-3 text-center mb-4 border-b border-slate-500'>Supporters</h2>
                        <div className='h-[80%] overflow-y-auto scrollbar'>
                            <ul className='list-none'>
                                {payments.length === 0 && <span className='mt-2 text-lg flex text-pretty gap-3'>No supporters yet!</span>}
                                {payments.map((payment, index) => {
                                    return (<li key={index} className='mt-2 text-lg flex text-pretty gap-3'><Image className='rounded-full w-7 h-7' src='/avatar.gif' width={0} height={0} alt='follower-avatar' /><p><span className='font-bold text-violet-500'>{payment.name}</span> donated <span className='text-green-400 font-bold'>₹{(payment.amount)}</span> with a message <span className='font-bold text-orange-500'>{payment.message}</span></p></li>)
                                }
                                )}

                            </ul>
                        </div>
                    </div>
                </div>
                <div className="make-payments w-1/2 bg-slate-900 rounded-xl p-4">
                    <h2 className='font-bold text-xl pb-3 text-center mb-4 border-b border-slate-500'>Make a Payment</h2>
                    <div className='flex flex-col gap-2'>
                        <input type="text" onChange={handleChange} value={paymentform.name} name='name' placeholder='Enter name' className='w-full p-3 rounded-lg bg-slate-800' />
                        <input type="number" onChange={handleChange} value={paymentform.amount} name='amount' inputMode='numeric' placeholder='Enter amount' className='w-full p-3 rounded-lg bg-slate-800' />
                        <input type="text" onChange={handleChange} value={paymentform.message} name='message' placeholder='Enter message' className='w-full p-3 rounded-lg bg-slate-800' />
                        <button disabled={isDisabled('mainbtn')} onClick={() => pay((paymentform.amount) * 100)} className="relative inline-flex items-center justify-center px-5 py-0.5 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white disabled:from-slate-700 disabled:to-slate-700">
                            <span className="relative px-[50.5%] py-3 transition-all ease-in duration-75 bg-gray-900 text-white text-lg rounded-md group-hover:bg-opacity-0 disabled:bg-opacity-0 ">
                                Pay
                            </span>
                        </button>
                    </div>
                    {/* or choose from these amounts */}
                    <div className='mt-4 flex gap-2 justify-center'>
                        <button disabled={isDisabled('quickbtn')} className='bg-violet-600 hover:bg-violet-700 transition rounded-lg px-6 py-2 font-bold disabled:bg-violet-800 disabled:hover:bg-violet-800' onClick={() => pay(500)}>₹5</button>
                        <button disabled={isDisabled('quickbtn')} className='bg-violet-600 hover:bg-violet-700 transition rounded-lg px-6 py-2 font-bold disabled:bg-violet-800 disabled:hover:bg-violet-800' onClick={() => pay(1000)}>₹10</button>
                        <button disabled={isDisabled('quickbtn')} className='bg-violet-600 hover:bg-violet-700 transition rounded-lg px-6 py-2 font-bold disabled:bg-violet-800 disabled:hover:bg-violet-800' onClick={() => pay(2000)}>₹20</button>
                        <button disabled={isDisabled('quickbtn')} className='bg-violet-600 hover:bg-violet-700 transition rounded-lg px-6 py-2 font-bold disabled:bg-violet-800 disabled:hover:bg-violet-800' onClick={() => pay(5000)}>₹50</button>
                    </div>
                </div>

            </div>
        </>
    )
}

export default PaymentPage
