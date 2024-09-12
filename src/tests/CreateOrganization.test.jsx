import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import axios from 'axios';
import CreateOrganization from './CreateOrganization';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';

jest.mock('axios');

describe('CreateOrganization', () => {
  test('renders form fields', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <CreateOrganization />
      </I18nextProvider>
    );
    expect(screen.getByLabelText(/tenant id/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/organization name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/established date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/contact email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/contact phone/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/category ids/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/latitude/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/longitude/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/location address/i)).toBeInTheDocument();
  });

  test('handles form submission', async () => {
    axios.post.mockResolvedValue({});
    render(
      <I18nextProvider i18n={i18n}>
        <CreateOrganization />
      </I18nextProvider>
    );

    fireEvent.change(screen.getByLabelText(/organization name/i), { target: { value: 'Test Org' } });
    fireEvent.change(screen.getByLabelText(/description/i), { target: { value: 'Test Description' } });
    fireEvent.change(screen.getByLabelText(/established date/i), { target: { value: '2021-01-01' } });
    fireEvent.change(screen.getByLabelText(/contact email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/contact phone/i), { target: { value: '1234567890' } });
    fireEvent.change(screen.getByLabelText(/address/i), { target: { value: 'Test Address' } });
    fireEvent.change(screen.getByLabelText(/latitude/i), { target: { value: '12.34' } });
    fireEvent.change(screen.getByLabelText(/longitude/i), { target: { value: '56.78' } });
    fireEvent.change(screen.getByLabelText(/location address/i), { target: { value: 'Test Location Address' } });

    fireEvent.click(screen.getByText(/submit/i));

    expect(axios.post).toHaveBeenCalledWith('/api/organizations', expect.any(Object));
  });
});