import React from 'react'
import LandingPageNavBar from './_components/navbar'

type Props = {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <div className="flex flex-col w-full max-w-[100vw]">
      <div className="py-10 px-6 md:px-10 xl:px-0 container max-w-[1920px] mx-auto">
        <LandingPageNavBar />
        {children}
      </div>
    </div>
  )
}

export default Layout