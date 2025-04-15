import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Spinner } from "@heroui/spinner";

import { Meme, UpdateMemeDto } from "@/types/meme";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { updateMeme } from "@/store/memeSlice";

interface MemeEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentMeme: Meme | null;
  onSuccess: (updatedMeme: Meme) => void;
}

export const MemeEditModal: React.FC<MemeEditModalProps> = ({
  isOpen,
  onClose,
  currentMeme,
  onSuccess,
}) => {
  const dispatch = useAppDispatch();
  const [editForm, setEditForm] = useState<UpdateMemeDto>({});
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});
  const memeStatus = useAppSelector((state) => state.memes.status);

  React.useEffect(() => {
    if (currentMeme) {
      setEditForm({
        name: currentMeme.name,
        imageUrl: currentMeme.imageUrl,
      });
    }
  }, [currentMeme]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setEditForm((prev) => ({
      ...prev,
      [name]: name === "likes" ? parseInt(value, 10) : value,
    }));

    if (validationErrors[name]) {
      setValidationErrors((prev) => {
        const newErrors = { ...prev };

        delete newErrors[name];

        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (
      !editForm.name ||
      editForm.name.length < 3 ||
      editForm.name.length > 100
    ) {
      errors.name = "Назва має бути від 3 до 100 символів";
    }

    if (
      !editForm.imageUrl ||
      !/^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i.test(editForm.imageUrl)
    ) {
      errors.imageUrl =
        "Некоректне посилання на зображення (має бути URL з розширенням зображення)";
    }

    setValidationErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSave = async () => {
    if (!currentMeme || !validateForm()) return;

    const randomLikes = Math.floor(Math.random() * 100);
    const updatedForm = {
      ...editForm,
      likes: randomLikes,
    };

    try {
      const result = await dispatch(
        updateMeme({ id: currentMeme.id, meme: updatedForm }),
      ).unwrap();

      onSuccess(result);
    } catch (err) {
      if (err instanceof Error) {
        const errorMessage = err.message;

        if (errorMessage.includes("Назва")) {
          setValidationErrors((prev) => ({ ...prev, name: errorMessage }));
        } else if (errorMessage.includes("посилання")) {
          setValidationErrors((prev) => ({ ...prev, imageUrl: errorMessage }));
        } else if (errorMessage.includes("лайків")) {
          setValidationErrors((prev) => ({ ...prev, likes: errorMessage }));
        }
      }
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent className="mx-auto w-full max-w-[95%] sm:max-w-md md:max-w-lg">
        <ModalHeader>Редагування мема</ModalHeader>
        <ModalBody>
          {currentMeme && (
            <div className="flex flex-col gap-4">
              <Input
                isReadOnly
                label="ID (тільки для читання)"
                name="id"
                value={currentMeme.id}
              />
              <Input
                errorMessage={validationErrors.name}
                isInvalid={!!validationErrors.name}
                label="Назва"
                name="name"
                value={editForm.name || ""}
                onChange={handleInputChange}
              />
              <Input
                errorMessage={validationErrors.imageUrl}
                isInvalid={!!validationErrors.imageUrl}
                label="URL зображення"
                name="imageUrl"
                value={editForm.imageUrl || ""}
                onChange={handleInputChange}
              />
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Кількість лайків:</span>
                <span className="text-sm text-default-500">
                  {currentMeme.likes} (буде згенеровано випадково при
                  збереженні)
                </span>
              </div>
              <div className="mt-2">
                <p className="text-sm">Попередній перегляд:</p>
                <img
                  alt="Попередній перегляд"
                  className="mt-2 max-h-40 w-full object-contain rounded-md"
                  src={editForm.imageUrl || ""}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://placehold.co/400x300?text=Помилка+завантаження";
                  }}
                />
              </div>
            </div>
          )}
        </ModalBody>
        <ModalFooter className="flex flex-col xs:flex-row gap-2 xs:gap-0 justify-end">
          <Button
            className="w-full xs:w-auto"
            color="danger"
            isDisabled={memeStatus == "loading"}
            variant="light"
            onPress={onClose}
          >
            Скасувати
          </Button>
          <Button
            className="w-full xs:w-auto"
            color="primary"
            isDisabled={memeStatus == "loading"}
            onPress={handleSave}
          >
            {memeStatus == "loading" ? (
              <>
                <Spinner color="white" size="sm" />
                <span className="ml-2">Збереження...</span>
              </>
            ) : (
              "Зберегти"
            )}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
