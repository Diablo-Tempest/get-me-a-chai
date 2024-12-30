import PaymentPage from '@/Components/PaymentPage'
import connectDB from '../db/connectDB'
import User from '../models/User'
import { notFound } from 'next/navigation'


const Username = async({ params }) => {
  const { username } = params;
    await connectDB()
    const user = await User.findOne({ username })
    if (!user) {
      notFound()
    }
  return(<>
      <PaymentPage username={username}/>
    </>)
}

export default Username
