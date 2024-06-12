import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import WidgetContainer from '../../components/Cards/WidgetContainer';
import SearchLogo from '../../assets/SearchLogo.svg';
import CircularButton from '../../components/CircularButton';
import DryLeavesLogo from '../../assets/DryLeaves.svg';
import Countdown from '../../components/Countdown';
import InnerPlugins from '../../assets/InnerPlugins.svg';
import InputField from '../../components/InputField';
import Drawer from '../../components/Drawer';
import Date from '../../assets/Date.svg';
import WeightLogo from '../../assets/Weight.svg';

import CountdownIcon from '../../assets/Countdown.svg';

function DryLeaves() {
  const data = [
    { time: '01h05m', color: '#79B2B7', image: CountdownIcon, weight: '30 Kg', code: 'W232122' },
    { time: '01h45m', color: '#79B2B7', image: CountdownIcon, weight: '20 Kg', code: 'W267710' },
  ];

  const [value, setValue] = useState('');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <div className="mt-4 flex justify-center items-center gap-3">
        <InputField icon={SearchLogo} placeholder={'Search'} className={'max-w-none'} />
        <div className="ml-1">
          <WidgetContainer backgroundColor="#94C3B3" borderRadius="20px" border={false}>
            <img src={InnerPlugins} alt="InnerPlugins" className="w-8 h-8 " />
          </WidgetContainer>
        </div>
      </div>

      {data.map((item) => (
        <div key={item.code} className="flex justify-between">
          <WidgetContainer borderRadius="10px" className="w-full flex items-center">
            <Link to={`/centra/dry-leaves/detail/${item.code}/${item.time}/${item.weight}`}>
              <CircularButton imageUrl={DryLeavesLogo} backgroundColor="#94C3B3" />
            </Link>
            <div className="flex flex-col ml-3">
              <span className="font-montserrat text-base font-semibold leading-tight tracking-wide text-left">
                {item.weight}
              </span>
              <span className="font-montserrat text-sm font-medium leading-17 tracking-wide text-left">
                {item.code}
              </span>
            </div>
            <div className="flex ml-auto items-center">
              <Countdown time={item.time} color={item.color} image={item.image} />
            </div>
          </WidgetContainer>
        </div>
      ))}

      <Drawer includeFourthSection={false} showThirdInput={true} firstText="Expiry Date" secondText="Weight" thirdText="Wet leaves" firstImgSrc={Date} secondImgSrc={WeightLogo} />
    </>
  );
}

export default DryLeaves;
