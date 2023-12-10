import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";

const Carrousel = () => {
  const [images, setImages] = useState([
    {
      src: "https://www.bing.com/images/search?view=detailV2&ccid=bEmEuRSK&id=14E85E9330FB7291DFD8DBFA8B19549B3D6058A3&thid=OIP.bEmEuRSKNRxg2EMckLJd6QHaFj&mediaurl=https%3a%2f%2fth.bing.com%2fth%2fid%2fR.6c4984b9148a351c60d8431c90b25de9%3frik%3do1hgPZtUGYv62w%26riu%3dhttp%253a%252f%252fgatos.pe%252fwp-content%252fuploads%252f2015%252f07%252fraza-gato-absinio.jpg%26ehk%3dj0mLM8a2Da8O%252fwPFU0ft6xI20YFZPATpUkBiN34IiO4%253d%26risl%3d%26pid%3dImgRaw%26r%3d0&exph=1200&expw=1600&q=gato&simid=608046724079904056&FORM=IRPRST&ck=6C7477F465A2C2D920D215056AFCCD9C&selectedIndex=4&itb=0&ajaxhist=0&ajaxserp=0",
    },
    {
      src: "https://img.bekiacocina.com/articulos/portada/57000/57365.jpg",
    },
    {
      src: "https://th.bing.com/th/id/OIP.-V4r_EbgMbcBcFCG-iozhwAAAA?w=350&h=350&rs=1&pid=ImgDetMain",
    },
  ]);

  const [currentPage, setCurrentPage] = useState(0);

  const handlePageChange = (event) => {
    setCurrentPage(event.nativeEvent.position);
  };

  return (
    <View style={styles.container}>
      <View style={styles.indicators}>
        {images.map((image, index) => (
          <View
            key={index}
            style={[
              styles.indicator,
              index === currentPage && styles.activeIndicator,
            ]}
          />
        ))}
      </View>
      <ScrollView
        style={styles.scrollView}
        horizontal={true}
        pagingEnabled={true}
        onScroll={handlePageChange}
      >
        {images.map((image, index) => (
          <View
            key={index}
            style={styles.item}
          >
            <Image source={{ uri: image.src }} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  indicators: {
    flexDirection: "row",
    width: "100%",
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  indicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#ccc",
    margin: 5,
  },
  activeIndicator: {
    backgroundColor: "#000",
  },
  scrollView: {
    width: "100%",
    height: "100%",
  },
  item: {
    width: "100%",
    height: 200,
  },
});

export default Carrousel;
