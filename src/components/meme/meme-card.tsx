import React from "react";
import { Card, CardBody, CardFooter } from "@heroui/card";
import { Image } from "@heroui/image";
import { Link } from "@heroui/link";

import { HeartFilledIcon } from "../icons";

import { Meme } from "@/types/meme";

interface MemeCardProps {
  meme: Meme;
}

export const MemeCard: React.FC<MemeCardProps> = ({ meme }) => {
  return (
    <Card key={meme.id} className="max-w-full h-full">
      <CardBody className="w-full h-40 sm:h-48 p-0 overflow-hidden">
        <Image
          alt={meme.name}
          className="w-full h-full object-cover"
          src={meme.imageUrl}
        />
      </CardBody>
      <CardFooter className="flex flex-col items-start gap-2">
        <div className="flex justify-between w-full items-start">
          <h4 className="font-semibold truncate max-w-[70%]" title={meme.name}>
            {meme.name}
          </h4>
          <div className="flex items-center gap-1">
            <HeartFilledIcon color="red" />
            <span>{meme.likes}</span>
          </div>
        </div>
        <Link
          isExternal
          showAnchorIcon
          className="text-sm"
          color="primary"
          href={meme.imageUrl}
        >
          Відкрити зображення
        </Link>
      </CardFooter>
    </Card>
  );
};
