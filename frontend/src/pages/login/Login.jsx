import { Button, Card, DialogActions, DialogContent, Grid, TextField } from '@mui/material';
import { useNavigate } from 'react-router';
import { Formik, Form } from 'formik';
import { loginTemplateValidation } from '../../validation/loginTemplate';
import { login } from '../../services/api';
import { UserContext } from '../../services/authProvider'; 
import React, { useContext } from 'react';
import styles from './Login.module.css';

export default function Login() {
  const navigate = useNavigate();
  const user = useContext(UserContext);
  const initialValues = {
    username: '',
    password: '',
  };

  return (
    <>
      <div className={styles.Container}>
        <h1 styles={{margin: 'auto'}}>Login</h1>
      </div>

      <Formik
        initialValues={initialValues}
        onSubmit={async (values) => {
          const response = await login(values);
          
          user.login(response.token);

          navigate('/');
        }}
        validationSchema={loginTemplateValidation}
      >
        {({ values, handleChange, handleBlur, errors, touched, isSubmitting }) => (
          <Form>
            <Card className={styles.ResponsiveCard}>
              <DialogContent style={{background: '#EFFCFF'}}>
                <Grid container spacing={1} >
                  <Grid item xs={12} style={{ fontWeight: 'bold' }} className={styles.Container}>Username:</Grid>
                  <Grid item xs={12} className={styles.Container}>
                    <TextField
                      name="username"
                      label="Username"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      variant="outlined"
                      fullWidth
                      error={errors.username && touched.username}
                      helperText={errors.username && touched.username && errors.username}
                    />
                  </Grid>
                  <Grid item xs={12} style={{ fontWeight: 'bold' }} className={styles.Container}>Password:</Grid>
                  <Grid item xs={12} className={styles.Container}>
                    <TextField
                      name="password"
                      type="password"
                      label="Password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      variant="outlined"
                      fullWidth
                      error={errors.password && touched.password}
                      helperText={errors.password && touched.password && errors.password}
                    />
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions style={{background: '#EFFCFF'}}>
              <div className={styles.Container}>
              <Button 
                type="submit" 
                variant="contained" 
                disabled={isSubmitting}
              >
                Login
              </Button>
              </div>
              </DialogActions>
            </Card>
          </Form>
        )}
      </Formik>
    </>
  );
};