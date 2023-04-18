import React, {
  FC,
  ImgHTMLAttributes,
  useEffect,
  useRef,
  useState,
} from "react";
import checkInViewIntersectionObserver from "utils/isInViewPortIntersectionObserver";
import PlaceIcon from "./PlaceIcon";
import { getAvatar } from 'services/apiServices'

export interface NcImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  containerClassName?: string;
}

const NcImage: FC<NcImageProps> = ({
  containerClassName = "",
  alt = "nc-imgs",
  src = "",
  className = "object-cover w-full h-full",
  ...args
}) => {

  const _containerRef = useRef(null);


  const [__src, set__src] = useState("");
  const [imageLoaded, setImageLoaded] = useState(false);

  const _handleImageLoaded = async() => {
    setImageLoaded(true);
    await getImageBlob();
  };

  const getImageBlob = async() => {
    const file = await getAvatar(src);
    if(file.response === "success"){
      set__src(URL.createObjectURL(file.file));
    }else{
      set__src(file.file);
    }
  }

  useEffect(() => {
    _handleImageLoaded()
  }, [src]);

  const renderLoadingPlaceholder = () => {
    return (
      <div
        className={`${className} flex items-center justify-center bg-neutral-200 dark:bg-neutral-6000 text-neutral-100 dark:text-neutral-500`}
      >
        <div className="h-2/4 max-w-[50%]">
          <PlaceIcon />
        </div>
      </div>
    );
  };

  return (
    <div
      className={`nc-NcImage ${containerClassName}`}
      data-nc-id="NcImage"
      ref={_containerRef}
    >
      {__src && imageLoaded ? (
        <img src={__src} className={className} alt={alt} {...args} />
      ) : (
        renderLoadingPlaceholder()
      )}
    </div>
  );
};

export default NcImage;
