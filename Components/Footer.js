import React from 'react'

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className='flex items-center justify-center bg-transparent backdrop-blur-sm text-white h-12 px-3 mt-3'>
      <p>Copyright &copy; {currentYear} Get me a chai - All rights reserved</p>
    </footer>
  )
}

export default Footer
