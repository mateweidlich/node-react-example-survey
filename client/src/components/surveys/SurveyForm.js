import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import validateEmails from './../../utils/validateEmails';
import SurveyField from './SurveyField';
import formFields from './formFields';

class SurveyForm extends Component {
    renderFields() {
        return _.map(formFields, field => {
            return (
                <Field
                    key={field.name}
                    component={SurveyField}
                    type="text"
                    {...field}
                />
            );
        });
    }

    render() {
        return (
            <div>
                <form
                    onSubmit={this.props.handleSubmit(
                        this.props.onSurveySubmit
                    )}
                >
                    {this.renderFields()}
                    <Link to="/surveys" className="btn-flat red white-text">
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        className="btn-flat right teal white-text"
                    >
                        Next
                        <i className="material-icons right">done</i>
                    </button>
                </form>
            </div>
        );
    }
}

function validate(values) {
    const errors = {};

    _.each(formFields, ({ name }) => {
        if (!values[name]) {
            errors[name] = 'You must provide a value';
        }
    });

    if (values.recipients && !errors.recipients) {
        errors.recipients = validateEmails(values.recipients);
    }

    return errors;
}

export default reduxForm({
    form: 'surveyForm',
    validate,
    destroyOnUnmount: false
})(SurveyForm);
