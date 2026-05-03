'use client';

import { Html5Qrcode } from 'html5-qrcode';
import { useEffect, useRef } from 'react';

export default function BarcodeScanner({ onScan }) {
  const scannerRef = useRef(null);
  const isStoppingRef = useRef(false);
  const containerId = 'barcode-scanner-reader';

  useEffect(() => {
    const scanner = new Html5Qrcode(containerId);
    scannerRef.current = scanner;

    async function startScanner() {
      await scanner.start(
        { facingMode: 'environment' },
        { fps: 10, qrbox: 250 },
        async (decodedText) => {
          if (isStoppingRef.current) {
            return;
          }

          isStoppingRef.current = true;
          onScan(decodedText);

          if (scanner.isScanning) {
            await scanner.stop();
          }

          await scanner.clear();
        }
      );
    }

    startScanner();

    return () => {
      const currentScanner = scannerRef.current;
      if (!currentScanner) {
        return;
      }

      if (currentScanner.isScanning) {
        currentScanner.stop().finally(() => {
          currentScanner.clear();
        });
        return;
      }

      currentScanner.clear();
    };
  }, [onScan]);

  return <div id={containerId} />;
}
