// Importa las dependencias necesarias
import React from 'react';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import { TextInput, Password, TextButtonInput } from '@/components/elements';
import { DatePicker } from '../date-picker';
import { RadioButton } from '../radio-button';
import { CheckPicker } from '../check-picker';
import { Select } from '../select';
import { GoogleLocationSelect } from '../google-location-select';
import { EmailPhone } from '../email-phone';
import { CheckGroup } from '../check-group';

// Definir los tipos de campo válidos
const FIELD_TYPES = [
  'emailPhone',
  'text',
  'password',
  'textButton',
  'datePicker',
  'radioButton',
  'checkPicker',
  'checkGroup',
  'select',
  'googleLocationSelect'
];

// Mapear los tipos de campo a sus respectivos componentes
const COMPONENTS = {
  emailPhone: EmailPhone,
  text: TextInput,
  password: Password,
  textButton: TextButtonInput,
  datePicker: DatePicker,
  radioButton: RadioButton,
  checkPicker: CheckPicker,
  checkGroup: CheckGroup,
  select: Select,
  googleLocationSelect: GoogleLocationSelect
};

// Definir el componente principal FormField
export const FormField = ({
  control,
  disabled,
  error,
  type,
  as,
  name,
  label,
  buttonChildren,
  onButtonClick,
  buttonDisabled,
  validations,
  maxLength,
  options,
  loading,
  className,
  tooltip,
  placeholder,
  ...rest
}) => {
  // Validar el tipo de campo
  if (!FIELD_TYPES.includes(type)) {
    return 'Invalid field type';
  }

  // Verificar si el componente correspondiente está definido
  if (typeof COMPONENTS[type] === 'undefined') {
    return React.createElement(() => (
      <div>El componente ({type}) aún no ha sido creado.</div>
    ));
  }

  // Función para renderizar el componente correspondiente con sus props
  const component = (field) =>
    React.createElement(COMPONENTS[type], {
      as,
      id: name,
      label,
      disabled,
      error,
      buttonChildren,
      onButtonClick,
      maxLength,
      buttonDisabled,
      options,
      loading,
      className,
      tooltip,
      placeholder,
      ...rest,
      ...field
    });

  // Renderizar el componente con react-hook-form Controller
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => component(field)}
      rules={validations}
    />
  );
};

// Definir propTypes para la validación de props
FormField.propTypes = {
  control: PropTypes.any.isRequired,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  type: PropTypes.oneOf(FIELD_TYPES).isRequired,
  as: PropTypes.string,
  name: PropTypes.string.isRequired,
  label: PropTypes.any,
  buttonChildren: PropTypes.any,
  onButtonClick: PropTypes.func,
  buttonDisabled: PropTypes.bool,
  validations: PropTypes.object,
  maxLength: PropTypes.number,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.any,
      text: PropTypes.string
    })
  ),
  loading: PropTypes.bool,
  className: PropTypes.string,
  tooltip: PropTypes.shape({
    icon: PropTypes.node,
    message: PropTypes.string
  }),
  placeholder: PropTypes.string,
  rest: PropTypes.object
};
