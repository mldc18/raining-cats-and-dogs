import Image from "next/image";
import ImageModal from "./ImageModal";
import Masonry from "react-masonry-css";
import { motion } from "framer-motion";
import { useState } from "react";

type ImageGalleryProps = {
  photos: Array<any>;
};

const breakpointColumnsObj = {
  default: 3,
  1000: 2,
  700: 1,
};

const ImageGallery = (props: ImageGalleryProps) => {
  const { photos } = props;
  const [modalImage, setModalImage] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  function handleDisplayModal(url: string) {
    setModalImage(url);
    setIsOpen(true);
  }

  return (
    <>
      <ImageModal imageUrl={modalImage} isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className="m-auto my-52 lg:my-72 w-3/4">
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {photos.map((photo, index) => {
            return (
              <motion.div
                animate={{ translateY: 0 }}
                className="relative image"
                initial={{ translateY: index % 2 == 0 ? -500 : -1000 }}
                key={index}
                transition={{ duration: 0.7, delay: index * 0.001 }}
              >
                <Image
                  alt=""
                  blurDataURL={photo.urls.regular}
                  className="transition ease-in-out hover:scale-125"
                  height={photo.height / 12}
                  key={index}
                  layout="responsive"
                  objectFit="cover"
                  placeholder="blur"
                  quality={100}
                  sizes="30"
                  src={photo.urls.regular}
                  width={photo.width / 12}
                  onClick={() => handleDisplayModal(photo.urls.regular)}
                />
                <div className="absolute top-2 right-2 text-xl font-Karla p-2 photo-likes">
                  {photo.likes} people liked this
                </div>
                <div className="absolute bottom-2 left-2 text-xl font-Karla p-2 photo-owners">
                  {photo.user.name}
                </div>
              </motion.div>
            );
          })}
        </Masonry>
      </div>
    </>
  );
};

export default ImageGallery;
