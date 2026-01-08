"use client";

import { useEffect, useState } from "react";

export interface DeviceSpecs {
  os: string;
  browser: string;
  deviceType: "mobile" | "tablet" | "desktop";
  screen: {
    width: number;
    height: number;
    pixelRatio: number;
  };
  userAgent: string;
  timestamp: number;
}

export function useDeviceSpecs() {
  const [specs, setSpecs] = useState<DeviceSpecs | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const getOS = () => {
      const userAgent = window.navigator.userAgent;
      if (userAgent.indexOf("Win") !== -1) return "Windows";
      if (userAgent.indexOf("Mac") !== -1) return "MacOS";
      if (userAgent.indexOf("Linux") !== -1) return "Linux";
      if (userAgent.indexOf("Android") !== -1) return "Android";
      if (userAgent.indexOf("like Mac") !== -1) return "iOS";
      return "Unknown";
    };

    const getBrowser = () => {
      const userAgent = window.navigator.userAgent;
      if (userAgent.indexOf("Chrome") !== -1) return "Chrome";
      if (userAgent.indexOf("Safari") !== -1) return "Safari";
      if (userAgent.indexOf("Firefox") !== -1) return "Firefox";
      if (userAgent.indexOf("Edg") !== -1) return "Edge"; // Edge uses 'Edg' token
      return "Unknown";
    };

    const getDeviceType = () => {
      const width = window.innerWidth;
      if (width < 768) return "mobile";
      if (width < 1024) return "tablet";
      return "desktop";
    };

    const currentSpecs: DeviceSpecs = {
      os: getOS(),
      browser: getBrowser(),
      deviceType: getDeviceType(),
      screen: {
        width: window.screen.width,
        height: window.screen.height,
        pixelRatio: window.devicePixelRatio || 1,
      },
      userAgent: window.navigator.userAgent,
      timestamp: Date.now(),
    };

    setSpecs(currentSpecs);
    localStorage.setItem("device_specs", JSON.stringify(currentSpecs));

  }, []);

  return specs;
}
