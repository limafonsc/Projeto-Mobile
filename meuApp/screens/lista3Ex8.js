import React, { useState, useEffect } from "react";
import { StyleSheet, View, Image, Alert, TouchableOpacity, ScrollView } from "react-native"; 
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons } from '@expo/vector-icons'; 

export default function CameraComponent() {
  const [images, setImages] = useState([]);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);

  useEffect(() => {
    (async () => {
      const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === "granted");

      const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === "granted");
    })();
  }, []);

  const pickImage = async () => {
    if (hasGalleryPermission === false) {
      Alert.alert("Permissão necessária", "Sem permissão para acessar a galeria de fotos");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });
    
    if (!result.canceled) {
      setImages(prevImages => [...prevImages, result.assets[0].uri]);
    }
  };

  const takePhoto = async () => {
    if (hasCameraPermission === false) {
      Alert.alert("Permissão necessária", "Sem permissão para acessar a câmera");
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImages(prevImages => [...prevImages, result.assets[0].uri]);
    }
  };

  const removeImage = (indexToRemove) => {
    setImages(prevImages => prevImages.filter((_, index) => index !== indexToRemove));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={pickImage} style={styles.botao}>
          <MaterialIcons name="photo" size={30} color="deepskyblue" />
        </TouchableOpacity>
        
        <TouchableOpacity onPress={takePhoto} style={styles.botao}>
          <MaterialIcons name="photo-camera" size={30} color="deepskyblue" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {images.map((uri, index) => (
          <View key={index} style={styles.imageContainer}>
            <Image source={{ uri: uri }} style={styles.image} />
            
            <TouchableOpacity onPress={() => removeImage(index)} style={styles.botaoFechar}>
              <MaterialIcons name="close" size={24} color="white" />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#222",
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end', 
    paddingTop: 40,           
    paddingHorizontal: 15,
  },
  botao: {
    marginLeft: 15,           
    padding: 5,
  },
  scrollContainer: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  imageContainer: {
    position: 'relative',
    marginTop: 20,
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 10, 
  },
  botaoFechar: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: 'red',
    borderRadius: 15,
    padding: 3,
  },
});