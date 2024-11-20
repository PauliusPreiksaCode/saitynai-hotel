import { Button, Card, DialogContent, Grid, TextField } from '@mui/material';
import { Formik, Form } from 'formik';
import { registerTemplate } from '../../validation/registerTemplate';
import { useRegisterClient } from '../../hooks/user';
import React from 'react';
import styles from './Register.module.css';


export default function PersonelRegister() {

  const register = useRegisterClient(); 

  const initialValues = {
    username: '',
    password: '',
    email: '',
    name: '',
    surname: '',
  };

  return (
    <>
      <div className={styles.Container}>
        <h1>Register hotel personel</h1>
      </div>
      <Formik
        initialValues={initialValues}
        onSubmit={async (values) => {
          register.mutateAsync(values);
        }}
        validationSchema={registerTemplate}
      >
        {({ values, handleChange, handleBlur, errors, touched, isSubmitting }) => (
          <Form>
            <Card className={styles.ResponsiveCard} style={{background: '#EFFCFF'}}>
              <DialogContent>
                <Grid container rowSpacing={1} spacing={1}>
                  <Grid item xs={12} style={{ fontWeight: 'bold' }} className={styles.Container}>Username:</Grid>
                  <Grid item xs={12} className={styles.Container}>
                    <TextField
                      name="username"
                      label="Username"
                      value={values.username}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      variant="outlined"
                      fullWidth
                      error={errors.username && touched.username}
                      helperText={errors.username && touched.username && errors.username}
                    />
                  </Grid>
                  <Grid item xs={12} style={{ fontWeight: 'bold' }} className={styles.Container}>Email:</Grid>
                  <Grid item xs={12} className={styles.Container}>
                    <TextField
                      name="email"
                      label="Email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      variant="outlined"
                      fullWidth
                      error={errors.email && touched.email}
                      helperText={errors.email && touched.email && errors.email}
                    />
                  </Grid>
                  <Grid item xs={12} style={{ fontWeight: 'bold' }} className={styles.Container}>Name:</Grid>
                  <Grid item xs={12} className={styles.Container}>
                    <TextField
                      name="name"
                      label="Name"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      variant="outlined"
                      fullWidth
                      error={errors.name && touched.name}
                      helperText={errors.name && touched.name && errors.name}
                    />
                  </Grid>
                  <Grid item xs={12} style={{ fontWeight: 'bold' }} className={styles.Container}>Surname:</Grid>
                  <Grid item xs={12} className={styles.Container}>
                    <TextField
                      name="surname"
                      label="Surname"
                      value={values.surname}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      variant="outlined"
                      fullWidth
                      error={errors.surname && touched.surname}
                      helperText={errors.surname && touched.surname && errors.surname}
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
              <div className={styles.Container}>
              <Button 
                type="submit" 
                variant="contained" 
                color='success'
                disabled={isSubmitting}
              >
                Register
              </Button>
              </div>
            </Card>
          </Form>
        )}
      </Formik>
    </>
  );
};