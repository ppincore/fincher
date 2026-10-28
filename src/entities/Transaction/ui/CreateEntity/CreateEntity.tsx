import { ComponentType, memo, useId, useMemo } from 'react';
import clsx from 'clsx';
import { useModal } from '@shared/lib/hooks';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { HStack } from '@shared/ui/Stack';
import { entityFormSchema } from '../../model/const/validation';
import { TransactionType } from '../../model/const/const';
import { FormModal } from '../Form/FormModal';
import { IForm } from '../../model/types/types';
import { apiHooks } from '../../api';

interface CreateEntityProps {
  className?: string;
  Trigger: ComponentType<{ onClick: () => void }>;
}

const defaultForm: IForm = {
  transactionType: TransactionType.EXPENSE,
  amount: '',
  dateTime: new Date(),
  description: '',
  accountId: '',
  fn: undefined,
  fp: undefined,
  fd: undefined,
};

export const CreateEntity = memo(function CreateEntity(
  props: CreateEntityProps,
) {
  const { className, Trigger } = props;
  const { isModalOpened, closeModal, showModal } = useModal();
  const formId = useId();

  const [postEntity] = apiHooks.useCreateEntity();
  const { refetch } = apiHooks.useListEntities({});

  const formMethods = useForm<IForm>({
    defaultValues: defaultForm,
    resolver: yupResolver(entityFormSchema as any),
    mode: 'onChange',
  });
  const { handleSubmit, reset } = formMethods;

  const onSubmit = useMemo(
    () =>
      handleSubmit(async (form) => {
        try {
          const res = await postEntity(form);
          if (res.error) throw new Error('');
          refetch();
          closeModal();
          reset();
        } catch (error) {
          // add toast with error
        }
      }),
    [closeModal, handleSubmit, postEntity, refetch, reset],
  );

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <FormProvider {...formMethods}>
      <form id={formId} onSubmit={onSubmit}>
        <HStack fullFill max className={clsx(className)}>
          <Trigger onClick={showModal} />
          <FormModal
            formId={formId}
            isOpen={isModalOpened}
            onClose={closeModal}
          />
        </HStack>
      </form>
    </FormProvider>
  );
});

CreateEntity.displayName = 'CreateEntity';
