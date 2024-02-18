import { useReducer } from 'react';
import css from './ContactForm.module.css';

function formReducer(_, action) {
  switch (action.type) {
    case 'change':
      return { name: action.name, number: action.number };

    case 'reset':
      return initialState;

    default:
      throw new Error('invalid action:' + action.type);
  }
}

const initialState = {
  name: '',
  number: '',
};

export default function ContactForm({ onSubmit, contains }) {
  const [state, dispatch] = useReducer(formReducer, initialState);

  function handleChange(e) {
    const { name, value } = e.currentTarget;
    dispatch({ ...state, type: 'change', [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    contains(state.name)
      ? alert(`${state.name} is already in contacts`)
      : onSubmit(state);

    !contains(state.name) && dispatch({ type: 'reset' });
  }

  return (
    <form className={css.Form} onSubmit={handleSubmit}>
      <label className={css.Form__label}>
        Name
        <input
          className={css.Form__input}
          type="text"
          name="name"
          value={state.name}
          onChange={handleChange}
          required
        />
      </label>

      <label className={css.Form__label}>
        Number
        <input
          className={css.Form__input}
          type="tel"
          name="number"
          value={state.number}
          onChange={handleChange}
          required
        />
      </label>

      <button className={css.Form__button} type="submit">
        Add contact
      </button>
    </form>
  );
}
