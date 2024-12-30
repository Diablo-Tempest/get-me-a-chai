
export const metadata = {
  title: 'About - Get Me A Chai',
  description: 'About page of the Get Me A Chai website',
}

const About = () => {
  return (
    <div className='mx-5'>
      <h1 className='text-5xl font-bold inline-block text-transparent bg-clip-text bg-gradient-to-br from-purple-600 from-30% via-cyan-400 to-blue-400 to-70% mb-5'>About Us</h1>
      <p className='text-2xl inline-block text-transparent bg-clip-text bg-gradient-to-br from-purple-600 from-30% via-cyan-400 to-blue-400 to-70%'><span className='text-4xl'>W</span>e aim to provide a platform where creators can connect with their supporters and receive financial support for their work. Our mission is to empower creators to pursue their passions and build sustainable careers. We believe in the power of community and strive to create a space where creativity can flourish. Whether you&apos;re an artist, writer, musician, or any other type of creator, we are here to support you every step of the way. Join us and be part of a growing community that values and celebrates creativity.</p>
    </div>
  )
}

export default About
