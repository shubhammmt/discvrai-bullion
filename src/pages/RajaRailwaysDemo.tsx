import React, { useState } from 'react';
import { RailwayLanding } from '@/components/raja-railways/RailwayLanding';
import { DivisionPulseDemo } from '@/components/raja-railways/DivisionPulseDemo';

const RajaRailwaysDemo = () => {
  const [started, setStarted] = useState(false);

  if (!started) {
    return <RailwayLanding onStart={() => setStarted(true)} />;
  }

  return <DivisionPulseDemo />;
};

export default RajaRailwaysDemo;
