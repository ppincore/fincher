import { Suspense, memo, useMemo, useState } from 'react';
import { Modal, ModalFooterContent } from '@shared/ui/Modal';
import { Loader } from '@shared/ui/Loader';
import { useTranslation } from 'react-i18next';
import { useFormContext } from 'react-hook-form';
import EntityForm from './Form';

interface FormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete?: () => void;
  formId: string;
  mode: 'edit' | 'create';
  loadingState?: {
    isDeleteLoading?: boolean;
    isUpdateLoading?: boolean;
  };
}

export const FormModal = memo(function FormModal(props: FormModalProps) {
  const { isOpen, onClose, onDelete, formId, mode, loadingState } = props;
  const [closeModal, setCloseModal] = useState(false);

  const { t } = useTranslation();
  const {
    formState: { isValid },
  } = useFormContext();

  const headingText = useMemo(
    () => (mode === 'create' ? t('Add new account') : t('Edit account')),
    [mode, t],
  );

  const modalFooterProps: ModalFooterContent = useMemo(() => {
    const commonFooterProps: ModalFooterContent = {
      cancel: {
        form: formId,
        text: t('Cancel'),
        onClick: () => setCloseModal(true),
        type: 'reset' as const,
      },
      confirm: {
        form: formId,
        text: t('Save'),
        onClick: () => {},
        type: 'submit' as const,
        disabled: !isValid,
      },
    };

    if (onDelete && mode === 'edit') {
      return {
        ...commonFooterProps,
        delete: {
          form: formId,
          text: t('Delete'),
          onClick: onDelete,
          type: 'reset',
        },
      };
    }
    return commonFooterProps;
  }, [formId, isValid, mode, onDelete, t]);

  return (
    <Modal
      footerProps={modalFooterProps}
      headingText={headingText}
      isOpen={isOpen}
      onClose={onClose}
      closeModalState={[closeModal, setCloseModal]}
      loadingState={loadingState}
    >
      <Suspense fallback={<Loader />}>
        <EntityForm />
      </Suspense>
    </Modal>
  );
});

FormModal.displayName = 'FormModal';
