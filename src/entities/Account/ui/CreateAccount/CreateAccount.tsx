import { memo, NamedExoticComponent, useMemo } from 'react';
import clsx from 'clsx';
import { useModal } from '@shared/lib/hooks';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Currency } from '@shared/const/money';
import { entityFormSchema } from '../../model/const/validation';
import { formId } from '../../model/const/const';
import { FormModal } from '../Form/FormModal';
import cls from './CreateAccount.module.scss';
import { IForm } from '../../model/types/types';
import { apiHooks } from '../../api/api';

interface CreateAccountProps {
  className?: string;
  Trigger: NamedExoticComponent<{ onClick: () => void }>;
}

const defaultForm: IForm = { name: '', currency: Currency.RUB, balance: 0 };

export const CreateAccount = memo(function CreateAccount(
  props: CreateAccountProps,
) {
  const { className, Trigger } = props;
  const { isModalOpened, closeModal, showModal } = useModal();

  const [postEntity, { isLoading: isPostLoading }] = apiHooks.useCreateEntity();

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
          const res = await postEntity(form);
          if (res.error) throw new Error('');
          closeModal();
          reset();
        } catch (error) {
          // add toast with error
        }
      }),
    [closeModal, handleSubmit, postEntity, reset],
  );

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <FormProvider {...formMethods}>
      <form id={formId} onSubmit={onSubmit}>
        <div className={clsx(cls.createAccount, className)}>
          <Trigger onClick={showModal} />
          <FormModal
            isOpen={isModalOpened}
            onClose={closeModal}
            formId={formId}
            mode="create"
            loadingState={{ isUpdateLoading: isPostLoading }}
          />
        </div>
      </form>
    </FormProvider>
  );
});

CreateAccount.displayName = 'CreateAccount';
