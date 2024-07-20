// import MapView, { LatLng, Marker, PROVIDER_GOOGLE } from "react-native-maps";
// import {
//   StyleSheet,
//   View,
//   Dimensions,
//   Text,
//   TouchableOpacity,
// } from "react-native";
// import {
//   GooglePlaceDetail,
//   GooglePlacesAutocomplete,
// } from "react-native-google-places-autocomplete";
// import { GOOGLE_API_KEY } from "@/environments";
// import Constants from "expo-constants";
// import { useRef, useState } from "react";
// import MapViewDirections from "react-native-maps-directions";

// // https://docs.expo.dev/versions/latest/sdk/map-view/
// // https://www.npmjs.com/package/react-native-google-places-autocomplete
// // https://www.npmjs.com/package/react-native-maps-directions


// const { width, height } = Dimensions.get("window");

// const ASPECT_RATIO = width / height;
// const LATITUDE_DELTA = 0.02;
// const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
// const INITIAL_POSITION = {
//   latitude: 40.76711,
//   longitude: -73.979704,
//   latitudeDelta: LATITUDE_DELTA,
//   longitudeDelta: LONGITUDE_DELTA,
// };

// type InputAutocompleteProps = {
//   label: string;
//   placeholder?: string;
//   onPlaceSelected: (details: GooglePlaceDetail | null) => void;
// };

// function InputAutocomplete({
//   label,
//   placeholder,
//   onPlaceSelected,
// }: InputAutocompleteProps) {
//   return (
//     <>
//       <Text>{label}</Text>
//       <GooglePlacesAutocomplete
//         styles={{ textInput: styles.input }}
//         placeholder={placeholder || ""}
//         fetchDetails
//         onPress={(data, details = null) => {
//           onPlaceSelected(details);
//         }}
//         query={{
//           key: GOOGLE_API_KEY,
//           language: "pt-BR",
//           components: 'country:UG'
//         }}
//         currentLocation={true}
//       />
//     </>
//   );
// }

// export default function App() {
//   const [origin, setOrigin] = useState<LatLng | null>();
//   const [destination, setDestination] = useState<LatLng | null>();
//   const [showDirections, setShowDirections] = useState(false);
//   const [distance, setDistance] = useState(0);
//   const [duration, setDuration] = useState(0);
//   const mapRef = useRef<MapView>(null);
//   const [initialRegion, setInitialRegion] = useState<Region | null>(null);

//   const moveTo = async (position: LatLng) => {
//     const camera = await mapRef.current?.getCamera();
//     if (camera) {
//       camera.center = position;
//       mapRef.current?.animateCamera(camera, { duration: 500 });
//     }
//   };

//   const edgePaddingValue = 70;

//   const edgePadding = {
//     top: edgePaddingValue,
//     right: edgePaddingValue,
//     bottom: edgePaddingValue,
//     left: edgePaddingValue,
//   };

//   const traceRouteOnReady = (args: any) => {
//     if (args) {
//       // args.distance
//       // args.duration
//       setDistance(args.distance);
//       setDuration(args.duration);
//     }
//   };

//   const traceRoute = () => {
//     if (origin && destination) {
//       setShowDirections(true);
//       mapRef.current?.fitToCoordinates([origin, destination], { edgePadding });
//     }
//   };

//   const onPlaceSelected = (
//     details: GooglePlaceDetail | null,
//     flag: "origin" | "destination"
//   ) => {
//     const set = flag === "origin" ? setOrigin : setDestination;
//     const position = {
//       latitude: details?.geometry.location.lat || 0,
//       longitude: details?.geometry.location.lng || 0,
//     };
//     set(position);
//     moveTo(position);

//     // Trace the route if the destination is selected
//     if (flag === "destination" && origin) {
//       traceRoute();
//     }
//   };

  

//   return (
//     <View style={styles.container}>
//       <MapView
//         ref={mapRef}
//         style={styles.map}
//         provider={PROVIDER_GOOGLE}
//         showsUserLocation={true}
//         showsMyLocationButton={true}
//         initialRegion={INITIAL_POSITION}
//         onMapReady={() => {
          
//         }}
//       >
//         {origin && <Marker coordinate={origin} />}
//         {destination && <Marker coordinate={destination} />}
//         {showDirections && origin && destination && (
//           <MapViewDirections
//             origin={origin}
//             destination={destination}
//             apikey={GOOGLE_API_KEY}
//             strokeColor="#6644ff"
//             strokeWidth={4}
//             onReady={traceRouteOnReady}
//           />
//         )}
//       </MapView>
//       <View style={styles.searchContainer}>
//         <InputAutocomplete
//           label="Origin"
//           onPlaceSelected={(details) => {
//             onPlaceSelected(details, "origin");
//           }}
//         />
//         <InputAutocomplete
//           label="Destination"
//           onPlaceSelected={(details) => {
//             onPlaceSelected(details, "destination");
//           }}
//         />
//         <TouchableOpacity style={styles.button} onPress={traceRoute}>
//           <Text style={styles.buttonText}>Trace route</Text>
//         </TouchableOpacity>
//         {distance && duration ? (
//           <View>
//             <Text>Distance: {distance.toFixed(2)}</Text>
//             <Text>Duration: {Math.ceil(duration)} min</Text>
//           </View>
//         ) : null}
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   map: {
//     width: Dimensions.get("window").width,
//     height: Dimensions.get("window").height,
//   },
//   searchContainer: {
//     position: "absolute",
//     width: "90%",
//     backgroundColor: "white",
//     shadowColor: "black",
//     shadowOffset: { width: 2, height: 2 },
//     shadowOpacity: 0.5,
//     shadowRadius: 4,
//     elevation: 4,
//     padding: 8,
//     borderRadius: 8,
//     top: Constants.statusBarHeight,
//   },
//   input: {
//     borderColor: "#888",
//     borderWidth: 1,
//   },
//   button: {
//     backgroundColor: "#bbb",
//     paddingVertical: 12,
//     marginTop: 16,
//     borderRadius: 4,
//   },
//   buttonText: {
//     textAlign: "center",
//   },
// });

import React, { useEffect } from "react";
import MapView, { LatLng, Marker, PROVIDER_GOOGLE, Region } from "react-native-maps";
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  TouchableOpacity,
} from "react-native";
import {
  GooglePlaceDetail,
  GooglePlacesAutocomplete,
} from "react-native-google-places-autocomplete";
import { GOOGLE_API_KEY } from "@/environments";
import Constants from "expo-constants";
import { useRef, useState } from "react";
import MapViewDirections, { MapViewDirectionsProps } from "react-native-maps-directions";
import * as Location from 'expo-location';

// Define window dimensions
const { width, height } = Dimensions.get("window");

// Define aspect ratio and map deltas
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.005;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

// Define props for InputAutocomplete component
type InputAutocompleteProps = {
  label: string;
  placeholder?: string;
  onPlaceSelected: (details: GooglePlaceDetail | null) => void;
};

// InputAutocomplete component for selecting locations
function InputAutocomplete({
  label,
  placeholder,
  onPlaceSelected,
}: InputAutocompleteProps) {
  return (
    <>
      <Text>{label}</Text>
      <GooglePlacesAutocomplete
        styles={{ textInput: styles.input }}
        placeholder={placeholder || ""}
        fetchDetails
        onPress={(data, details = null) => {
          onPlaceSelected(details);
        }}
        query={{
          key: GOOGLE_API_KEY,
          language: "pt-BR",
          components: 'country:ug'
        }}
        currentLocation={true}
        currentLocationLabel='Current location'
      />
    </>
  );
}

// Main App component
export default function App() {
  // State hooks for origin, destination, directions, distance, duration, and initial region
  const [origin, setOrigin] = useState<LatLng | null>(null);
  const [destination, setDestination] = useState<LatLng | null>(null);
  const [showDirections, setShowDirections] = useState<boolean>(false);
  const [distance, setDistance] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [initialRegion, setInitialRegion] = useState<Region | null>(null);

  // Reference hook for the MapView
  const mapRef = useRef<MapView>(null);

  // Function to move the map camera to a specific position
  const moveTo = async (position: LatLng) => {
    const camera = await mapRef.current?.getCamera();
    if (camera) {
      camera.center = position;
      mapRef.current?.animateCamera(camera, { duration: 1000 });
    }
  };

  // Edge padding for fitToCoordinates function
  const edgePaddingValue = 70;
  const edgePadding = {
    top: edgePaddingValue,
    right: edgePaddingValue,
    bottom: edgePaddingValue,
    left: edgePaddingValue,
  };

  // Callback function for when the route is ready
  const traceRouteOnReady = (args: { distance: number; duration: number }) => {
    if (args) {
      setDistance(args.distance);
      setDuration(args.duration);
    }
  };

  // Function to trace the route on the map
  const traceRoute = () => {
    if (origin && destination) {
      setShowDirections(true);
      mapRef.current?.fitToCoordinates([origin, destination], { edgePadding });
    }
  };

  // Function to handle place selection
  const onPlaceSelected = (
    details: GooglePlaceDetail | null,
    flag: "origin" | "destination"
  ) => {
    const set = flag === "origin" ? setOrigin : setDestination;
    const position = {
      latitude: details?.geometry.location.lat || 0,
      longitude: details?.geometry.location.lng || 0,
    };
    set(position);
    moveTo(position);

    // Trace the route if the destination is selected
    if (flag === "destination" && origin) {
      traceRoute();
    }
  };

  // Function to get the user's current location
  const getCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = location.coords;

    setInitialRegion({
      latitude,
      longitude,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    });

    setOrigin({
      latitude,
      longitude,
    });

    moveTo({
      latitude,
      longitude,
    });
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        showsMyLocationButton={true}
        followsUserLocation={true}
        initialRegion={initialRegion || undefined}
        onMapReady={() => {}}
      >
        {origin && <Marker coordinate={origin} />}
        {destination && <Marker coordinate={destination} />}
        {showDirections && origin && destination && (
          <MapViewDirections
            origin={origin}
            destination={destination}
            apikey={GOOGLE_API_KEY}
            strokeColor="#6644ff"
            strokeWidth={4}
            onReady={traceRouteOnReady}
          />
        )}
      </MapView>
      <View style={styles.searchContainer}>
        <InputAutocomplete
          label="Origin"
          onPlaceSelected={(details) => {
            onPlaceSelected(details, "origin");
          }}
        />
        <InputAutocomplete
          label="Destination"
          onPlaceSelected={(details) => {
            onPlaceSelected(details, "destination");
          }}
        />
        <TouchableOpacity style={styles.button} onPress={traceRoute}>
          <Text style={styles.buttonText}>Trace route</Text>
        </TouchableOpacity>
        {distance && duration ? (
          <View>
            <Text>Distance: {distance.toFixed(2)}</Text>
            <Text>Duration: {Math.ceil(duration)} min</Text>
          </View>
        ) : null}
      </View>
    </View>
  );
}

// Styles for the components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  searchContainer: {
    position: "absolute",
    width: "90%",
    backgroundColor: "white",
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4,
    padding: 8,
    borderRadius: 8,
    top: Constants.statusBarHeight,
  },
  input: {
    borderColor: "#888",
    borderWidth: 1,
  },
  button: {
    backgroundColor: "#bbb",
    paddingVertical: 12,
    marginTop: 16,
    borderRadius: 4,
  },
  buttonText: {
    textAlign: "center",
  },
});
