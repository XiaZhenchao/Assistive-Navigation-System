import React, { useEffect, useRef, useMemo, useState } from 'react';
import {DeckProps} from '@deck.gl/core';
import {GoogleMapsOverlay} from '@deck.gl/google-maps';

import { useMapsLibrary, useMap, GoogleMapsContext} from '@vis.gl/react-google-maps';
export default function DeckGLOverlay(props) {
    const map = useMap();
    const overlay = useMemo(() => new GoogleMapsOverlay(props));
  
    useEffect(() => {
      overlay.setMap(map);
      overlay.setProps(props);
      console.log(overlay)
      
      return () => overlay.setMap(null);
    }, [map])
    

    return null;
  }
