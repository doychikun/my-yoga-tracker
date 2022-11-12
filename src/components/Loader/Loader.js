import './Loader.css'
import { Stack } from '@mui/material';
import { InfinitySpin } from 'react-loader-spinner';

const Loader = () => (
  <Stack id="loader">
    <InfinitySpin color="#E8E5EE" />
  </Stack>
);

export default Loader;
