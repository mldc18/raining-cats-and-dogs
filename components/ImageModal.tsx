import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

type ImageModalProps = {
  imageUrl: string;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const ImageModal = (props: ImageModalProps) => {
  const { imageUrl = "", isOpen, setIsOpen } = props;

  const image = imageUrl !== "" && (
    <Image
      blurDataURL={imageUrl}
      className="z-[100]"
      layout="fill"
      objectFit="cover"
      placeholder="blur"
      src={imageUrl}
      quality={100}
    />
  );

  function handleCloseModal() {
    setIsOpen(false);
  }

  const closeButton = (
    <div
      className="z-[101] absolute top-3 right-3 font-Rubik font-black text-6xl"
      onClick={handleCloseModal}
    >
      X
    </div>
  );

  return (
    <div
      className={`fixed h-screen w-full inset-0 modal z-50 ${
        !isOpen && "hidden"
      }`}
    >
      {closeButton}
      <div className="relative flex justify-center w-full sm:w-9/12 lg:w-5/12 h-3/4 lg:h-full m-auto top-24 sm:top-0">
        {image}
      </div>
    </div>
  );
};

export default ImageModal;
