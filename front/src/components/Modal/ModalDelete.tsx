import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  Modal,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";

interface ModalProps {
  onCloseModal: () => void;
  confirmDelete: () => void;
  text: string;
}

export const ModalDelete = ({
  onCloseModal,
  confirmDelete,
  text,
}: ModalProps) => {
  return (
    <>
      <Modal
        closeOnOverlayClick={false}
        isOpen={true}
        onClose={onCloseModal}
        size={"sm"}
      >
        <ModalOverlay />
        <ModalContent style={{ background: "#dddddd" }}>
          <ModalHeader> Delete {text}?</ModalHeader>
          <ModalCloseButton style={{ border: "none", margin: "none" }} />
          <ModalFooter
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <div></div>
            <div>
              <Button
                onClick={() => {
                  onCloseModal();
                }}
                style={{ marginRight: "20px" }}
                type="button"
              >
                Cancel
              </Button>
              <button
                onClick={() => {
                  onCloseModal();
                }}
              >
                <Button
                  onClick={() => {
                    confirmDelete();
                  }}
                  type="submit"
                >
                  Yes
                </Button>
              </button>
            </div>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
