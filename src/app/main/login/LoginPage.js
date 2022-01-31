import { yupResolver } from '@hookform/resolvers/yup';
import { motion } from 'framer-motion';
import { Controller, useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { submitLogin } from 'app/auth/store/loginSlice';
import { useEffect } from 'react';
import { useSnackbar } from 'notistack';
import NotificationTemplate from '_mysource/shared-components/snackbar/NotificationTemplate';
import isNil from "lodash/isNil";

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  //email: yup.string().email('You must enter a valid email').required('You must enter a email'),
  password: yup
    .string()
    .required('Please enter your password.')
  //.min(8, 'Password is too short - should be 8 chars minimum.'),
});

const defaultValues = {
  email: '',
  password: '',
  remember: true,
};

function LoginPage() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const login = useSelector(({ auth }) => auth.login);
  const { control, formState, handleSubmit, reset, getValues } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });
  const dispatch = useDispatch();
  const { isValid, dirtyFields, errors } = formState;

  useEffect(() => {
    if (!isNil(login.errors)) {
      showSnackbar({ message: 'Usuario o contrasena incorrectos', options: { variant: 'error' } });
    }
  }, [login.errors])

  function onSubmit(model) {
    dispatch(submitLogin(model));
    reset(defaultValues);
  }

  const showSnackbar = (item) => {
    enqueueSnackbar('', {
      content: () => (
        <NotificationTemplate
          item={item} />
      )
    });
  }

  return (
    <div className="flex flex-col flex-auto items-center justify-center p-16 sm:p-32">
      <div className="flex flex-col items-center justify-center w-full">
        <motion.div initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }}>
          <Card className="w-full max-w-384">
            <CardContent className="flex flex-col items-center justify-center p-16 sm:p-24 md:p-32">
              <img className="w-128 m-32" src="assets/images/logos/hamburga.png" alt="logo" />

              <form
                name="loginForm"
                noValidate
                className="flex flex-col justify-center w-full"
                onSubmit={handleSubmit(onSubmit)}
              >
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      className="mb-16"
                      label="Email"
                      autoFocus
                      type="email"
                      error={!!errors.email}
                      helperText={errors?.email?.message}
                      variant="outlined"
                      required
                      fullWidth
                    />
                  )}
                />

                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      className="mb-16"
                      label="Password"
                      type="password"
                      error={!!errors.password}
                      helperText={errors?.password?.message}
                      variant="outlined"
                      required
                      fullWidth
                    />
                  )}
                />

                <Button
                  variant="contained"
                  color="primary"
                  className="w-224 mx-auto mt-16"
                  aria-label="LOG IN"
                  disabled={_.isEmpty(dirtyFields) || !isValid}
                  type="submit"
                >
                  Login
                </Button>
              </form>

            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

export default LoginPage;
