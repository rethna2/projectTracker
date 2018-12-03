import { DatePicker } from 'material-ui-pickers';
import createComponent from './createComponent';
import mapError from './mapError';

export default createComponent(DatePicker, ({ defaultValue, ...props }) => ({
  ...mapError(props)
}));
