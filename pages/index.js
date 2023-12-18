import Image from 'next/image'
import { Inter } from 'next/font/google'
import { NAV_OPTIONS } from '@/constants/pageConstants';
import { useState } from 'react';
import SearchBar from '@/components/ui/SearchBar';
import SearchOptions from '@/components/ui/SearchOptions';
import Insight from '@/components/ui/Insight';


export default function Home(props) {
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedCompanyId, setSelectedCompanyId] = useState(null);
  const [isInsight, setIsInsight] = useState(false);


  return (
    <div className="home_container relative w-full h-full">
      {
        isInsight ? (
          <div className='w-full relative h-[calc(100vh-70px)]'>
            <Insight selectedCompany={selectedCompany} setSelectedCompany={setSelectedCompany} selectedCompanyId={selectedCompanyId} setSelectedCompanyId={setSelectedCompanyId} />
          </div>
        ) : (
          <div className='home__container absolute right-0 left-0  top-16 flex flex-col items-center w-50 md:w-40 m-auto justify-center'>
            <div className='mb-9'>
              <img src='/icons/logo.svg'></img>
            </div >
            <SearchBar setSelectedCompany={setSelectedCompany} selectedCompany={selectedCompany} setSelectedCompanyId={setSelectedCompanyId} />
            <div className='mt-5'>
              <SearchOptions setIsInsight={setIsInsight} selectedCompany={selectedCompany} />
            </div>
          </div >
        )
      }
    </div >
  )
}

export async function getServerSideProps(context) {
  return {
    props: {
      navSelected: "Insights"
    }
  }
}