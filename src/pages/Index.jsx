import { useState } from "react";
import { Container, VStack, Heading, Text, Box, Image, SimpleGrid, Button, Input } from "@chakra-ui/react";

const photos = [
  { id: 1, src: "https://via.placeholder.com/300", alt: "Photo 1" },
  { id: 2, src: "https://via.placeholder.com/300", alt: "Photo 2" },
  { id: 3, src: "https://via.placeholder.com/300", alt: "Photo 3" },
  { id: 4, src: "https://via.placeholder.com/300", alt: "Photo 4" },
  { id: 5, src: "https://via.placeholder.com/300", alt: "Photo 5" },
  { id: 6, src: "https://via.placeholder.com/300", alt: "Photo 6" },
];

const [selectedPhoto, setSelectedPhoto] = useState(null);
const [photoList, setPhotoList] = useState(photos);

const handlePhotoChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectedPhoto(reader.result);
    };
    reader.readAsDataURL(file);
  }
};

const handleUpload = () => {
  if (selectedPhoto) {
    const newPhoto = {
      id: photoList.length + 1,
      src: selectedPhoto,
      alt: `Photo ${photoList.length + 1}`,
    };
    setPhotoList([...photoList, newPhoto]);
    setSelectedPhoto(null);
  }
};

const Index = () => {
  return (
    <Container maxW="container.xl" py={10}>
      <VStack spacing={8} align="stretch">
        <Heading as="h1" size="2xl" textAlign="center">
          Photo Sharing Platform
        </Heading>
        <Text fontSize="xl" textAlign="center">
          Share your favorite moments with the world.
        </Text>
        <Box textAlign="center">
          <Input type="file" accept="image/*" onChange={handlePhotoChange} display="none" id="photo-upload" />
          <label htmlFor="photo-upload">
            <Button as="span" colorScheme="teal" size="lg">
              Select Photo
            </Button>
          </label>
          {selectedPhoto && (
            <Box mt={4}>
              <Image src={selectedPhoto} alt="Selected Photo" maxH="300px" mx="auto" />
              <Button mt={4} colorScheme="teal" onClick={handleUpload}>
                Upload Photo
              </Button>
            </Box>
          )}
        </Box>
        <SimpleGrid columns={[1, 2, 3]} spacing={10}>
          {photoList.map((photo) => (
            <Box key={photo.id} borderWidth="1px" borderRadius="lg" overflow="hidden">
              <Image src={photo.src} alt={photo.alt} />
              <Box p={6}>
                <Text mt={2} fontSize="lg" fontWeight="semibold" lineHeight="short">
                  {photo.alt}
                </Text>
              </Box>
            </Box>
          ))}
        </SimpleGrid>
      </VStack>
    </Container>
  );
};

export default Index;