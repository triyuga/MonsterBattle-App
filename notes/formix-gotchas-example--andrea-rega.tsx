import { Button, Container, Grid, TextField } from '@material-ui/core';
import { FormikBag, FormikProps, withFormik } from 'formik';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as yup from 'yup';
import { OrganisationReadDto } from '../../modules/services/api/Models';
import { getOrganisation, saveOrganisation } from '../../state/slices/Organisation';
import { AppState } from '../../state/Store';

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .required('The Organisation name is mandatory')
    .max(100, 'The Organisation name maximum length is 100'),
  code: yup.string().required('The Organisation code is mandatory'),
  registrationNumber: yup.string(),
  address: yup.string()
});

interface IOrganisationProps extends FormikProps<OrganisationReadDto> {
  getOrganisation: () => void;
  saveOrganisation: (organisation: OrganisationReadDto, id?: string) => void;
  organisation: OrganisationReadDto | null;
}

class Organisation extends Component<IOrganisationProps> {
  public componentDidMount() {
    this.props.getOrganisation();
  }

  public render = () => {
    const { values, touched, errors, handleSubmit, handleChange, handleBlur, isValid } = this.props;
    return (
      <Container component="main" maxWidth="xs">
        <h2>Organisation</h2>
        <form noValidate={true} onSubmit={handleSubmit}>
          <Grid container={true} spacing={3}>
            <Grid item={true} xs={12}>
              <TextField
                value={values.name}
                name="name"
                variant="outlined"
                required={true}
                fullWidth={true}
                label="Name"
                autoFocus={true}
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item={true} xs={12}>
              <TextField
                value={values.code}
                name="code"
                variant="outlined"
                required={true}
                fullWidth={true}
                label="Code"
                error={touched.code && Boolean(errors.code)}
                helperText={touched.code && errors.code}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item={true} xs={12}>
              <TextField
                value={values.registrationNumber}
                name="registrationNumber"
                variant="outlined"
                fullWidth={true}
                label="Registration Number"
                error={touched.registrationNumber && Boolean(errors.registrationNumber)}
                helperText={touched.registrationNumber && errors.registrationNumber}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item={true} xs={12}>
              <TextField
                value={values.address}
                name="address"
                variant="outlined"
                fullWidth={true}
                label="Address"
                error={touched.address && Boolean(errors.address)}
                helperText={touched.address && errors.address}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item={true} xs={12}>
              <Button disabled={!isValid} fullWidth={true} variant="contained" color="primary" type="submit">
                Save
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    );
  };
}

const mapState = (state: AppState) => ({
  organisation: state.organisation.organisation
});

export default connect(
  mapState,
  { getOrganisation, saveOrganisation }
)(
  withFormik({
    handleSubmit: (values: OrganisationReadDto, formikBag: FormikBag<IOrganisationProps, OrganisationReadDto>) =>
      formikBag.props.saveOrganisation(values, values.id),
    validationSchema,
    mapPropsToValues: (props: IOrganisationProps) => {
      return props.organisation ? { ...props.organisation } : { id: '', name: '', code: '', registrationNumber: '', address: '' };
    },
    isInitialValid: (props: IOrganisationProps) => !!props.organisation,
    enableReinitialize: true
  })(Organisation)
);
