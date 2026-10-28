import { Suspense, memo, useMemo, useState } from 'react';
import { Modal, ModalFooterContent } from '@shared/ui/Modal';
import { Loader } from '@shared/ui/Loader';
import { useTranslation } from 'react-i18next';
import { useFormContext } from 'react-hook-form';
import EntityForm from './Form';

interface FormModalProps {
  isOpen: boolean;
  onClose: () => void;
  formId: string;
}

export const FormModal = memo(function FormModal(props: FormModalProps) {
  const { isOpen, onClose, formId } = props;
  const [closeModal, setCloseModal] = useState(false);
  const { t } = useTranslation();
  const {
    formState: { isValid },
  } = useFormContext();

  const modalFooterProps: ModalFooterContent = useMemo(
    () => ({
      cancel: {
        form: formId,
        text: t('Cancel'),
        onClick: () => {
          setCloseModal(true);
        },
        type: 'reset',
      },
      confirm: {
        form: formId,
        text: t('Save'),
        onClick: () => {},
        type: 'submit',
        disabled: !isValid,
      },
    }),
    [formId, isValid, t],
  );

  return (
    <Modal
      footerProps={modalFooterProps}
      headingText={t('Add new transaction')}
      isOpen={isOpen}
      onClose={onClose}
      closeModalState={[closeModal, setCloseModal]}
    >
      <Suspense fallback={<Loader />}>
        <EntityForm />
      </Suspense>
    </Modal>
  );
});

FormModal.displayName = 'FormModal';
