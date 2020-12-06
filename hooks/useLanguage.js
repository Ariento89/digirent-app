import { useSelector } from 'react-redux';
import { actions, selectors } from 'ducks/language';
import { useActionDispatch } from './useActionDispatch';

export const useLanguage = () => {
  const language = useSelector(selectors.selectLanguage());
  const setLanguage = useActionDispatch(actions.setLanguage);

  return {
    language,
    setLanguage,
  };
};
