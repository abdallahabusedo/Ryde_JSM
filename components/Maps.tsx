import { Text, View } from "react-native";
import MapView, { PROVIDER_DEFAULT } from "react-native-maps";
const Maps = () => {
  const region = {};
  return (
    <View className="items-stretch justify-start w-full h-full">
      <MapView
        provider={PROVIDER_DEFAULT}
        className="w-full h-full rounded-2xl"
        tintColor="black"
        mapType="mutedStandard"
        showsPointsOfInterest={false}
        //   initialRegion={}
        showsUserLocation={true}
        userInterfaceStyle="light"
      >
        <View className="w-full h-full" />
      </MapView>
    </View>
  );
};

export default Maps;
