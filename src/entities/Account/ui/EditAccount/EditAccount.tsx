import { ComponentType, memo, useMemo } from 'react';
import clsx from 'clsx';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useModal } from '@shared/lib/hooks';
import { entityFormSchema } from '../../model/const/validation';
import { formId } from '../../model/const/const';
import { FormModal } from '../Form/FormModal';
import cls from './EditAccount.module.scss';
import { IEntity, IForm } from '../../model/types/types';
import { apiHooks } from '../../api/api';

interface EditAccountProps {
  className?: string;
  Trigger: ComponentType<{ onClick: () => void }>;
  entityData: IEntity;
}

export const EditAccount = memo(function EditAccount(props: EditAccountProps) {
  const { className, Trigger, entityData } = props;
  const [deleteEntity, { isLoading: isDeleteLoading }] =
    apiHooks.useDeleteEntity();
  const [updateEntity, { isLoading: isUpdateLoading }] =
    apiHooks.useUpdateEntity();

  const { name, currency } = entityData;
  const balance = Number(entityData.balance);
  const accountId = entityData.id;

  const defaultForm: IForm = { name, currency, balance };
  const { isModalOpened, closeModal, showModal } = useModal();
  const formIdEdit = useMemo(() => `${formId}-${accountId}`, [accountId]);

  const formMethods = useForm<IForm>({
    defaultValues: defaultForm,
    resolver: yupResolver(entityFormSchema),
    mode: 'onChange',
  });

  const { handleSubmit, reset } = formMethods;

  const onSubmit = useMemo(
    () =>
      handleSubmit(async (form) => {
        try {
          const res = await updateEntity({
            updatedEntity: form,
            id: entityData.id,
          });
          if ('error' in res && res.error) throw new Error('');
          closeModal();
          reset();
        } catch (error) {
          // add toast with error
        }
      }),
    [closeModal, entityData.id, handleSubmit, reset, updateEntity],
  );

  const onDelete = useMemo(
    () =>
      handleSubmit(async () => {
        try {
          const res = await deleteEntity(entityData.id);
          if ('error' in res && res.error) throw new Error('');
          closeModal();
          reset();
        } catch (error) {
          // add toast with error
        }
      }),
    [closeModal, deleteEntity, entityData.id, handleSubmit, reset],
  );

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <FormProvider {...formMethods}>
      <form id={formIdEdit} onSubmit={onSubmit}>
        <div className={clsx(cls.createAccount, className)}>
          <Trigger onClick={showModal} />
          <FormModal
            mode="edit"
            isOpen={isModalOpened}
            onClose={closeModal}
            onDelete={onDelete}
            formId={formIdEdit}
            loadingState={{
              isDeleteLoading,
              isUpdateLoading,
            }}
          />
        </div>
      </form>
    </FormProvider>
  );
});

EditAccount.displayName = 'EditAccount';
