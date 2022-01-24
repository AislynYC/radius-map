import React, {useState} from 'react';
import {useLoadScript, GoogleMap, DrawingManager} from '@react-google-maps/api';

const googleMapConfig = {
  center: {
    lat: 25.041969,
    lng: 121.544902,
  },
  zoom: 12,
  options: {
    streetViewControl: false,
  },
  mapContainerStyle: {
    width: '800px',
    height: '600px',
  },
};

const Map = () => {
  const [currentCircle, setCurrentCircle] = useState();
  const [radius, setRadius] = useState(0);
  const [circleCenter, setCircleCenter] = useState();
  const [keyInput, setKeyInput]=useState('');
  const [apiKey,setApiKey]=useState('')
  const {isLoaded,loadError} = useLoadScript({
    googleMapsApiKey: `${apiKey}&libraries=geometry,places,visualization,drawing`,
  });
  const [isMapMount, setIsMapMount] = useState(false)

  const onCircleComplete = (circle) => {
    if (currentCircle) {
      currentCircle.setMap(null);
      setCurrentCircle();
    }
    setCurrentCircle(circle);
    setRadius(circle.radius);
    setCircleCenter(circle.center);
  };

  const inputOnChange=(e)=>{
    setKeyInput(e.target.value)
  }

  const mountMap=()=>{
    setApiKey(keyInput)
    setIsMapMount(true)

  }

  const unMountMap=()=>{
    setIsMapMount(false)

  }

  const renderMap =()=>(
    <GoogleMap {...googleMapConfig}>
    <DrawingManager
      onCircleComplete={onCircleComplete}
      options={{
        circleOptions: {
          fillColor: '#00c9e7',
          strokeColor: '#00c9e7',
          fillOpacity: 0.2,
        },
        drawingControlOptions: {
          drawingModes: ['circle'],
          position: window.google.maps.ControlPosition.TOP_CENTER,
        },
      }}
    />
  </GoogleMap>
  )

  return (
    <div style={{padding:'32px'}}>
    <div style={{margin:"16px 0"}}>Google Map API Key: 
    <input type="text" name="keyInput" value={keyInput} onChange={inputOnChange} style={{margin: '0 8px'}}/>
    {isMapMount?<button onClick={unMountMap}>Unload Map</button>:<button onClick={mountMap}>Load Map</button>}
    </div>
    <div style={{border:'1px solid gray',width:'800px'}}>
    {!isMapMount && <div style={{padding:'16px'}}> Please enter an API Key above. </div>}
      {isMapMount && (isLoaded ? renderMap() : <div>Loading...</div>)}
      {loadError && <div>Map cannot be loaded right now, sorry.</div>}
    </div>
      <div style={{margin:"16px 0"}}>Radius:{radius} m </div>
      <div style={{margin:"16px 0"}}>
        Circle Center:
        {`lat:${circleCenter?.lat() || ''}, lng:${circleCenter?.lng() || ''}`}
      </div>
    </div>
  );
};

export default Map;
