import { ProductCardProps } from "../types/components/ProductCard";
import { useProductStore } from "../store/products";
import { MdEdit, MdDelete } from "react-icons/md";
import React, { useState } from "react";
import { 
   useColorModeValue,
   ModalCloseButton,
   useDisclosure,
   ModalOverlay,
   ModalContent,
   ModalHeader,
   ModalFooter,
   IconButton, 
   ModalBody,
   useToast, 
   Heading, 
   HStack,
   Button,
   VStack,
   Input,
   Image, 
   Modal,
   Text, 
   Box,
} from "@chakra-ui/react";

const ProductCard:React.FC<ProductCardProps> = ({ product }) => {

   const textColor = useColorModeValue("gray.600", "gray.200");
   const toast = useToast();
   const bg = useColorModeValue("white", "gray.800");
   
   const { isOpen, onOpen, onClose } = useDisclosure();
   const { deleteProduct, updateProduct } = useProductStore();

   const [ updatedProduct, setUpdatedProduct ] = useState(product);

   const handleDelete = async (id: string) => {
      const {success, message} = await deleteProduct(id);
      if (!success) {
         toast({
            title: "Error",
            description: message,
            status: "error",
            duration: 5000,
            isClosable: true,
         });
      } else {
         toast({
            title: "Success",
            description: message,
            status: "success",
            duration: 5000,
            isClosable: true,
         });
      };
   };

   const handleUpdateProduct = async (id: string, updatedProduct: any) => {
      const { success, message } = await updateProduct(id, updatedProduct);
      if (!success) {
         toast({
            title: "Error",
            description: message,
            status: "error",
            duration: 5000,
            isClosable: true,
         });
      } else {
         toast({
            title: "Success",
            description: message,
            status: "success",
            duration: 5000,
            isClosable: true,
         });
         onClose();
         setUpdatedProduct(product);
      };
   };
   
   return (
      <>
         <Box 
            shadow={"lg"}
            rounded={"lg"}
            overflow={"hidden"}
            transition={"all 0.3s"}
            _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
            bg={ bg }
         >
            <Image src={ product.image } alt={ product.name } h={48} w={"full"} objectFit={"cover"} />
            <Box p={4}>
               <Heading as={"h3"} size={"md"} mb={2}>
                  { product.name }
               </Heading>
               <Text fontWeight={"bold"} fontSize={"xl"} color={ textColor } mb={4}>
                  ${ product.price }
               </Text>
               <HStack spacing={2}>
                  <IconButton 
                     aria-label="Edit product" 
                     icon={<MdEdit />} 
                     onClick={ onOpen }
                     bg={"blue.400"} 
                  />
                  <IconButton 
                     aria-label="Delete product"
                     icon={<MdDelete />}
                     onClick={ () => handleDelete(product._id ?? "") }
                     bg={"red.500"}
                  />
               </HStack>
            </Box>

            <Modal isOpen={ isOpen } onClose={ onClose }>
               <ModalOverlay />
               <ModalContent>
                  <ModalHeader>Update Product</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                     <VStack>
                        <Input 
                           placeholder="Product name"
                           name="name"
                           value={ updatedProduct.name }
                           onChange={(e) => setUpdatedProduct({...updatedProduct, name: e.target.value })}
                        />
                        <Input 
                           placeholder="Price"
                           name="price"
                           type="number"
                           value={ updatedProduct.price }
                           onChange={(e) => setUpdatedProduct({...updatedProduct, price: e.target.value })}
                        />
                        <Input 
                           placeholder="Image URL"
                           name="image"
                           value={ updatedProduct.image }
                           onChange={(e) => setUpdatedProduct({...updatedProduct, image: e.target.value })}
                        />
                     </VStack>
                  </ModalBody>
                  <ModalFooter>
                     <Button 
                        colorScheme="blue" 
                        onClick={ () => handleUpdateProduct(product._id ?? " ", updatedProduct) }
                        mr={3} 
                     >
                        Update
                     </Button>
                     <Button variant={"ghost"} onClick={ onClose }>
                        Cancel
                     </Button>
                  </ModalFooter>
               </ModalContent>
            </Modal>
         </Box>
      </>
   );
};

export default ProductCard;