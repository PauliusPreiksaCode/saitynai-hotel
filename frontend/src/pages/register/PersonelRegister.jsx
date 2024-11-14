import { Button, Card, DialogContent, Grid, TextField } from '@mui/material';
import { Formik, Form } from 'formik';
import { registerTemplate } from '../../validation/registerTemplate';
import { useRegisterClient } from '../../hooks/user';
import React from 'react';


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
      <h1>Personalo registracijos puslapis</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={async (values) => {
          register.mutateAsync(values);
        }}
        validationSchema={registerTemplate}
      >
        {({ values, handleChange, handleBlur, errors, touched, isSubmitting }) => (
          <Form>
            <Card style={{ width: '20%' }}>
              <DialogContent>
                <Grid container rowSpacing={1} spacing={1}>
                  <Grid item xs={12} style={{ fontWeight: 'bold' }}>Prisijungimas vardas:</Grid>
                  <Grid item xs={12}>
                    <TextField
                      name="username"
                      label="Prisijungimo vardas"
                      value={values.username}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      variant="outlined"
                      error={errors.username && touched.username}
                      helperText={errors.username && touched.username && errors.username}
                    />
                  </Grid>
                  <Grid item xs={12} style={{ fontWeight: 'bold' }}>El. paštas:</Grid>
                  <Grid item xs={12}>
                    <TextField
                      name="email"
                      label="El. paštas"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      variant="outlined"
                      error={errors.email && touched.email}
                      helperText={errors.email && touched.email && errors.email}
                    />
                  </Grid>
                  <Grid item xs={12} style={{ fontWeight: 'bold' }}>Vardas:</Grid>
                  <Grid item xs={12}>
                    <TextField
                      name="name"
                      label="Vardas"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      variant="outlined"
                      error={errors.name && touched.name}
                      helperText={errors.name && touched.name && errors.name}
                    />
                  </Grid>
                  <Grid item xs={12} style={{ fontWeight: 'bold' }}>Pavardė:</Grid>
                  <Grid item xs={12}>
                    <TextField
                      name="surname"
                      label="Pavardė"
                      value={values.surname}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      variant="outlined"
                      error={errors.surname && touched.surname}
                      helperText={errors.surname && touched.surname && errors.surname}
                    />
                  </Grid>
                  <Grid item xs={12} style={{ fontWeight: 'bold' }}>Prisijungimas slaptažodis:</Grid>
                  <Grid item xs={12}>
                    <TextField
                      name="password"
                      type="password"
                      label="Prisijungimo slaptažodis"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      variant="outlined"
                      error={errors.password && touched.password}
                      helperText={errors.password && touched.password && errors.password}
                    />
                  </Grid>
                </Grid>
              </DialogContent>
              <Button 
                type="submit" 
                variant="contained" 
                disabled={isSubmitting}
              >
                Registruotis
              </Button>
            </Card>
          </Form>
        )}
      </Formik>
    </>
  );
};