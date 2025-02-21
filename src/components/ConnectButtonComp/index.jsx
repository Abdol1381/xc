
// import styles from '../../../styles/Home.module.css';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Icon1 from '../../../public/icons/SVG.png'
import { useEffect, useState } from 'react';
import { useAccountEffect, useDisconnect } from 'wagmi';

export default function ConnectButtonComp({ setConnected, isConn }) {
  const { disconnect } = useDisconnect()
  const router = useRouter()
  // if(!disconnect) {
  //   console.log('dis');
  // }
  useAccountEffect({
    onConnect() {
      router.push('dashboard')
      setConnected(true)
    },
  })
  return (
   <>

   </>
  );
};