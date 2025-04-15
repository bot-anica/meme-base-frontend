import React from "react";
import { Button } from "@heroui/button";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/table";

import { Meme } from "@/types/meme";

interface MemeTableProps {
  memes: Meme[];
  onEditClick: (meme: Meme) => void;
}

export const MemeTable: React.FC<MemeTableProps> = ({ memes, onEditClick }) => {
  return (
    <Table aria-label="Таблиця мемів" className="w-full border-collapse">
      <TableHeader>
        <TableColumn className="p-3 text-left hidden sm:table-cell">
          ID
        </TableColumn>
        <TableColumn className="p-3 text-left">Назва</TableColumn>
        <TableColumn className="p-3 text-left hidden xs:table-cell">
          Лайки
        </TableColumn>
        <TableColumn className="p-3 text-left">Дії</TableColumn>
      </TableHeader>
      <TableBody>
        {memes.map((meme) => (
          <TableRow key={meme.id} className="border-b border-default-100">
            <TableCell className="p-3 hidden sm:table-cell">
              {meme.id}
            </TableCell>
            <TableCell className="p-3">
              <div className="flex flex-col">
                <span>{meme.name}</span>
                <span className="text-sm text-default-500 xs:hidden">
                  Лайки: {meme.likes}
                </span>
              </div>
            </TableCell>
            <TableCell className="p-3 hidden xs:table-cell">
              {meme.likes}
            </TableCell>
            <TableCell className="p-3">
              <div className="flex gap-2">
                <Button
                  color="primary"
                  size="sm"
                  onPress={() => onEditClick(meme)}
                >
                  Редагувати
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
