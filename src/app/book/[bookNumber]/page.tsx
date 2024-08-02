'use client';
import Navbar from '@/components/Navbar';
import { CaretLeft, Heart } from '@phosphor-icons/react';
import React from 'react';
import bookImg from '../../../img/bookImg.png';
type Props = {};

const DetailsPage = (props: Props) => {
  return (
    <div className='bg-white h-screen'>
      <Navbar />
      <div className='container mx-auto'>
        <div className='flex flex-row w-full justify-between items-center'>
          <div className='flex flex-row items-center gap-5'>
            <button className='flex items-center justify-center'>
              <CaretLeft size={32} />
            </button>
            <p>Book Details</p>
          </div>
          <div>
            <Heart size={32} />
          </div>
        </div>

        <div className='flex flex-row items-start justify-between gap-10 mt-10  '>
          <div className=' flex items-center justify-center p-3  bg-[#F4F4FF] rounded w-96 h-auto'>
            <img src={bookImg.src} alt='' className='w-80 h-auto' />
          </div>
          <div className='flex flex-col gap-10 w-1/2 '>
            <div>
              <div>
                <p>Dune</p>
                <p>Frank Herbert</p>
              </div>
            </div>

            <div className=''>
              <p>Summury</p>
              <div className=''>
                Dune is set in the distant future amidst a feudal interstellar
                society in which various noble houses control planetary fiefs.
                It tells the story of young Paul Atreides, whose family accepts
                the stewardship of the planet Arrakis. While the planet is an
                inhospitable and sparsely populated desert wasteland, it is the
                only source of melange, or "spice", a drug that extends life and
                enhances mental abilities. Melange is also necessary for space
                navigation, which requires a kind of multidimensional awareness
                and foresight that only the drug provides. As melange can only
                be produced on Arrakis, control of the planet is a coveted and
                dangerous undertaking. The story explores the multilayered
                interactions of politics, religion, ecology, technology, and
                human emotion, as the factions of the empire confront each other
                in a struggle for the control of Arrakis and its spice.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
