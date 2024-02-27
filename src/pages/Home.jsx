import React from 'react'
import Banner from '../components/Banner'
import ListingSection from '../components/ListingSection'
import ExclusiveDeals from '../components/ExclusiveDeals'
import JoinUs from '../components/JoinUs'
import SearchFrom from '../components/SearchFrom'
import Header from "../components/Navbar"

function Home() {
  return (
    <>
        <Header/>
        <Banner />
        <SearchFrom />
        <ListingSection />
        <JoinUs />
    </>
  )
}

export default Home
