import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Header from './../Header';
import Footer from './../Footer';
import { useHomeAnimation } from './../../contexts/HomeAnimationContext';
import { Wheel } from 'react-custom-roulette';
import { style } from 'framer-motion/client';
import data from './../../data.json';


const godsList = [
  ['Odin', 'Freyja', 'Heimdall', 'Skadi', 'Njord', 'Baldr', 'Tyr'],
  ['Thor', 'Freyja', 'Forseti', 'Skadi', 'Bragi', 'Baldr', 'Tyr'],
  ['Loki', 'Heimdall', 'Forseti', 'Bragi', 'Njord', 'Tyr', 'Hel'],
  ['Freyr', 'Freyja', 'Ullr', 'Bragi', 'Aegir', 'Hel', 'Vidar'],
  ['Zeus', 'Athena', 'Hermes', 'Apollo', 'Dionysus', 'Hephaestus', 'Hera'],
  ['Hades', 'Ares', 'Athena', 'Aphrodite', 'Apollo', 'Hephaestus', 'Artemis'],
  ['Poseidon', 'Ares', 'Hermes', 'Dionysus', 'Aphrodite', 'Artemis', 'Hephaestus'],
  ['Ra', 'Bast', 'Ptah', 'Sobek', 'Sekhmet', 'Osiris', 'Horus'],
  ['Isis', 'Anubis', 'Bast', 'Nephthys', 'Sobek', 'Osiris', 'Thoth'],
  ['Set', 'Anubis', 'Ptah', 'Sekhmet', 'Nephthys', 'Horus', 'Thoth'],
  ['Kronos', 'Prometheus', 'Leto', 'Hyperion', 'Rheia', 'Helios', 'Atlas'],
  ['Oranos', 'Prometheus', 'Oceanus', 'Hyperion', 'Theia', 'Helios', 'Hekate'],
  ['Gaia', 'Leto', 'Oceanus', 'Rheia', 'Theia', 'Atlas', 'Hekate'],
  ['Nuwa', 'Xuannu', 'Houtu', 'Goumang', 'Rushou', 'Gonggong', 'Zhurong'],
  ['Shennong', 'Chiyou', 'Houtu', 'Nuba', 'Rushou', 'Gonggong', 'Huangdi'],
  ['Fuxi', 'Xuannu', 'Chiyou', 'Goumang', 'Nuba', 'Huangdi', 'Zhurong']
];

function replaceWithIcons(text, isMobile) {
  if (typeof text !== 'string') return text;

  let replaced = text;

  for (const [keyword, icon] of Object.entries(data.BO_icons)) {
    const regex = new RegExp(`\\b${keyword}s?\\b`, 'gi');

    replaced = replaced.replace(regex, (match) =>
      `<img
        src="/assets/BOs/images/${icon}"
        alt="${match}"
        title="${match}"
        style="height: ${isMobile ? '1.5em' : '2.5em'}; vertical-align: middle;"
      />`
    );
  }

  return replaced;
}

const majorData = godsList.map(g => ({ option: g[0] }));

const RandomGods = () => {
const isMobile = window.innerWidth <= 900;
  const { homeAnimation, setHomeAnimation } = useHomeAnimation();
  const [majorSpin, setMajorSpin] = useState(false);
  const [minorSpin, setMinorSpin] = useState([false, false, false]);
  const [majorPrize, setMajorPrize] = useState(null);
  const [minorPrizes, setMinorPrizes] = useState([0, 0, 0]);
  const [tcSpin, setTcSpin] = useState(false);
  const [stratSpin, setStratSpin] = useState(false);
  const [tcPrize, setTcPrize] = useState(0);
  const [stratPrize, setStratPrize] = useState(0);
  const [showSummary, setShowSummary] = useState(false);
  const [minorStoppedCount, setMinorStoppedCount] = useState(0);

  const tcData = ['1tc', '1tc', '2tc', '2tc', '3tc'].map(option => ({ option }));
  const stratData = ['fast up time', 'eco upgrades', 'normal bo'].map(option => ({ option }));

  const [minorData, setMinorData] = useState([[], [], []]);
  const spinWheels = () => {
    setMinorStoppedCount(0);
    setShowSummary(false);
    setMajorPrize(null);
    setMinorPrizes([0, 0, 0]);
    const prize = Math.floor(Math.random() * majorData.length);
    setMajorPrize(prize);
    setMajorSpin(true);
    setMinorSpin([false, false, false]); // reset minor spins

    setTcPrize(Math.floor(Math.random() * tcData.length));
    setStratPrize(Math.floor(Math.random() * stratData.length));
    setTcSpin(true);
    setStratSpin(true);
  };

  const handleMajorStop = () => {
    const god = godsList[majorPrize];

    const minors = [
      [god[1], god[2], god[1], god[2]].map(option => ({ option })), // Age II
      [god[3], god[4], god[3], god[4]].map(option => ({ option })), // Age III
      [god[5], god[6], god[5], god[6]].map(option => ({ option }))  // Age IV
    ];

    const newPrizes = [0, 0, 0].map(() => Math.floor(Math.random() * 4));

    setMinorData(minors);
    setTimeout(() => {
      setMinorPrizes(newPrizes);
      setMinorSpin([true, true, true]);
    }, 500); // short delay for realism
  };

  return (
  <div style={{ backgroundColor: '#101010', color: '#FAF9F6' }}>
      <Header isMobile={isMobile} page="RandomGods" setHasUserScrolled={() => {}} setHomeAnimation={setHomeAnimation} />
      <div
        id="top_page"
        style={{
          fontFamily: 'Cormorant Garamond, serif',
          minHeight: '100vh',
          paddingBottom: '5rem',
          position: 'relative',
          height: '100%',
          width: '100vw',
        }}
      >
        <div
          style={{
            maxWidth: '1700px',
            margin: '0 auto',
            position: 'relative',
            width: '100%',
            height: '100%',
            maxHeight: '800px',
          }}
        >

      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        style={{
          padding: isMobile ? "2rem 2rem" : '5rem 2rem',
          paddingTop: '1rem',
          paddingBottom: isMobile ? "3rem" : '10rem',
          backgroundColor: '#101010',
          color: '#FAF9F6',
          fontFamily: 'Cormorant Garamond, serif',
          marginTop: isMobile ? '10vh' : '7vh',
          minHeight: '100vh',
            textAlign: 'center',
        }}
      >
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          whileHover={{ scale: 1.05, color: '#ffffff' }}
          style={{
            fontSize: 'clamp(1.7rem, 4vw + 1rem, 4rem)',
            marginBottom: isMobile ? '1rem' : '2rem',
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
          }}
        >
          <motion.img
            src="/assets/logoOnly.png"
            alt="Coaching Icon"
            whileHover={{ scale: 1.2 }}
            transition={{ duration: 0.3 }}
            style={{
              width: '5rem',
              height: '5rem',
              objectFit: 'cover',
            }}
          />
          Random Draft
        </motion.h2>
          <p
            style={{
              fontSize: 'clamp(1rem, 2vw + 0.5rem, 1.5rem)',
              color: '#ccc',
              textAlign: 'center',
            }}
          >
            Will you be blessed by the gods or cursed by the fates? Spin the wheels to find out your divine destiny!
          </p>
    {/* Wheels Row */}
    <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
    {/* Major God */}
    <div id={"sfqsf"} style={{ position: isMobile ? 'relative' : 'absolute', left: isMobile ? '' : '0%', textAlign: 'center', marginTop:isMobile ? '-50px' : ''  }}>
        <div style={{ transform: 'scale(0.6)' }}>
        <Wheel
          mustStartSpinning={majorSpin}
          prizeNumber={majorPrize ?? 0}
          data={majorData}
          backgroundColors={[
            '#e53935', // blood red
            '#101010',
          ]}
          textColors={['#FAF9F6']} // bone-white
          spinDuration={1}
          fontSize={22}
          outerBorderColor={'#e53935'} // match red trim
          outerBorderWidth={5}
          radiusLineWidth={2}
          innerRadius={5}
          pointerProps={{
            style: {
              filter: 'hue-rotate(90deg)'
            }
          }}
          onStopSpinning={() => {
            setMajorSpin(false);
            handleMajorStop();
            }}

        />
        <p style={{ marginTop: '0.5rem', fontSize: '2.5rem' }}>Major God</p>

        </div>
    </div>

    {/* Minor Gods */}
    {minorData.map((data_, i) => (
        data_.length > 0 && (
        <div
            key={i}
            style={{
            position: isMobile ? "relative" : 'absolute',
            left: isMobile ? '' :i === 0 ? '18%' : '33%',
            top: isMobile ? '' : i === 0 ? '' : i === 1 ? '11%' : '40%',
            textAlign: 'center'
            }}
        >
            <div style={{ transform: 'scale(0.45)', marginTop:isMobile ? '-220px' : '' }}>
            <Wheel
                mustStartSpinning={minorSpin[i]}
                prizeNumber={minorPrizes[i]}
                data={data_}
                backgroundColors={[
                    '#e53935', // blood red
                    '#101010',
                    '#ff681f',
                    '#525055' // dark gray for contrast
                ]}
                outerBorderColor={'#e53935'} // match red trim
                outerBorderWidth={5}
                pointerProps={{
                    style: {
                        filter: 'hue-rotate(90deg)'
                    }
                }}
                textColors={['#FAF9F6']}
                spinDuration={1}
                fontSize={30}
                onStopSpinning={() => {
                  setMinorStoppedCount(prev => {
                    const next = prev + 1;
                    if (next === 3) {
                      setShowSummary(true);
                    }
                    return next;
                  });
                }}

                perpendicularText={true}
            />
            <p style={{ marginTop: '0.5rem', fontSize: '2.5rem' }}>
            {i === 0 ? 'Classical God' : i === 1 ? 'Heroic God' : 'Mythical God'}
            </p>
            </div>

        </div>
        )
    ))}
    </div>

  {/* Extra Wheels */}
{/* Extra Wheels */}
    <div style={{ position: isMobile ? 'relative' : 'absolute', right: isMobile ? '' : '20%',textAlign: 'center', marginTop:isMobile ? '-190px' : ''  }}>
      <div style={{ transform: 'scale(0.6)' }}>
        <Wheel
          mustStartSpinning={tcSpin}
          prizeNumber={tcPrize}
          data={tcData}
          backgroundColors={['#e53935', '#101010', '#ff681f']}
          textColors={['#FAF9F6']}
          outerBorderColor={'#e53935'}
          outerBorderWidth={5}
          pointerProps={{ style: { filter: 'hue-rotate(90deg)' } }}
          spinDuration={1}
          fontSize={30}
          onStopSpinning={() => setTcSpin(false)}
                perpendicularText={true}
        />
      <p style={{ marginTop: '0.5rem', fontSize: '2.5rem' }}>Town Centers</p>
      </div>
    </div>

    <div style={{ position: isMobile ? 'relative' : 'absolute', right: isMobile  ? '' : '0%', textAlign: 'center', marginTop:isMobile ? '-180px' : ''  }}>
      <div style={{ transform: 'scale(0.6)' }}>
        <Wheel
          mustStartSpinning={stratSpin}
          prizeNumber={stratPrize}
          data={stratData}
          backgroundColors={['#e53935', '#101010', '#ff681f']}
          textColors={['#FAF9F6']}
          outerBorderColor={'#e53935'}
          outerBorderWidth={5}
          pointerProps={{ style: { filter: 'hue-rotate(90deg)' } }}
          spinDuration={1}
          fontSize={30}
          onStopSpinning={() => setStratSpin(false)}
                perpendicularText={true}
        />
      <p style={{ marginTop: '0.5rem', fontSize: '2.5rem' }}>Strategy</p>
      </div>
    </div>

    {majorPrize !== null && showSummary && (
      <div
        style={{
          textAlign: 'center',
          fontSize: 'clamp(1rem, 3vw + 0.5rem, 1.5rem)',
          position: 'absolute',
          bottom:  isMobile ? '':'0%',
          left:  isMobile ? '':'50%',
          transform:  isMobile ? '':'translateX(-50%)',
          marginTop:isMobile ? '-90px' : '3rem' 
        }}
        dangerouslySetInnerHTML={{
          __html: replaceWithIcons(
            `${majorData[majorPrize].option} → ` +
            `${minorData[0]?.[minorPrizes[0]]?.option ?? ''} (Age II), ` +
            `${minorData[1]?.[minorPrizes[1]]?.option ?? ''} (Age III), ` +
            `${minorData[2]?.[minorPrizes[2]]?.option ?? ''} (Age IV), ` +
            `${tcData[tcPrize]?.option ?? ''} and ${stratData[stratPrize]?.option ?? ''}.`, isMobile
          )
        }}
      />
    )}

      <div
        style={{
          position: isMobile ? 'relative' : 'absolute',
          bottom: isMobile ? '':'-10%',
          left:  isMobile ? '':'50%',
          transform:  isMobile ? '':'translateX(-50%)',
        }}
      >
        <motion.button
          onClick={spinWheels}
          whileHover={{ scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 300 }}
          style={{
            padding: '1rem 2.5rem',
            fontSize: '1.3rem',
            background: 'linear-gradient(135deg, #e53935, #ff681f)',
            color: '#FAF9F6',
            border: 'none',
            borderRadius: '12px',
            cursor: 'pointer',
            boxShadow: '0 0 15px rgba(255, 104, 31, 0.5)',
          }}
        >
          Spin Draft
        </motion.button>
      </div>



      </motion.section>
      <Footer />

        </div>
    </div>
  </div>
  );
};

export default RandomGods;
