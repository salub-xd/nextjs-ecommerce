'use client';

import { cn } from '@/libs/utlis';
import { Image as ImageType } from '@/types';
import { Tab } from '@headlessui/react'
import Image from 'next/image';

interface GalleryTabProps {
  image: ImageType;
}

const GalleryTab: React.FC<GalleryTabProps> = ({
  image
}) => {
  return (
    <Tab
      className={'relative cursor-pointer aspect-square flex items-center justify-center bg-white rounded-md '}
    >
      {({ selected }) => (
        <div>
          <span className="absolute h-full w-full  aspect-square inset-0 overflow-hidden rounded-md">
            <Image
              fill
              src={image.url}
              alt=""
              className="object-cover object-center"
            />
          </span>
          <span
            className={cn(
              'absolute inset-0 ring-slate-900 border-2 rounded-md ring-2 ring-offset-2',
              selected ? 'ring-black' : 'ring-transparent',
            )}
          />
        </div>
      )}
    </Tab>
  )
}

export default GalleryTab;
