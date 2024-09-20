import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import OrganizationSubmissionPage from '../components/organization/OrganizationSubmissionPage';
import { BrowserRouter as Router } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';

jest.mock('axios');

describe('OrganizationSubmissionPage', () => {
  beforeEach(() => {
    axios.get.mockResolvedValue({
      data: [
        { id: 1, name: 'Tenant 1' },
        { id: 2, name: 'Tenant 2' }
      ]
    });
  });

  test('renders form fields', async () => {
    render(
      <I18nextProvider i18n={i18n}>
        <Router>
          <OrganizationSubmissionPage />
        </Router>
      </I18nextProvider>
    );
    await waitFor(() => expect(screen.getByLabelText(/tenant id/i)).toBeInTheDocument());
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
        <Router>
          <OrganizationSubmissionPage />
        </Router>
      </I18nextProvider>
    );
    fireEvent.change(screen.getByLabelText(/tenant id/i), { target: { value: '1' } });
    fireEvent.change(screen.getByLabelText(/organization name/i), { target: { value: 'Org 1' } });
    fireEvent.change(screen.getByLabelText(/description/i), { target: { value: 'Description' } });
    fireEvent.change(screen.getByLabelText(/established date/i), { target: { value: '2021-01-01' } });
    fireEvent.change(screen.getByLabelText(/contact email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/contact phone/i), { target: { value: '1234567890' } });
    fireEvent.change(screen.getByLabelText(/address/i), { target: { value: '123 Main St' } });
    fireEvent.change(screen.getByLabelText(/category ids/i), { target: { value: '1,2' } });
    fireEvent.change(screen.getByLabelText(/latitude/i), { target: { value: '40.7128' } });
    fireEvent.change(screen.getByLabelText(/longitude/i), { target: { value: '-74.0060' } });
    fireEvent.change(screen.getByLabelText(/location address/i), { target: { value: 'New York, NY' } });

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => expect(axios.post).toHaveBeenCalledWith('/api/organizations', {
      tenantId: '1',
      name: 'Org 1',
      description: 'Description',
      establishedDate: '2021-01-01',
      contactEmail: 'test@example.com',
      contactPhone: '1234567890',
      address: '123 Main St',
      categoryIds: '1,2',
      latitude: '40.7128',
      longitude: '-74.0060',
      locationAddress: 'New York, NY'
    }, {
      headers: { Authorization: `Bearer ${localStorage.getItem('AuthToken')}` }
    }));

    await waitFor(() => expect(screen.getByText(/organization created successfully/i)).toBeInTheDocument());
  });

  test('handles form submission error', async () => {
    axios.post.mockRejectedValue(new Error('Failed to create organization'));
    render(
      <I18nextProvider i18n={i18n}>
        <Router>
          <OrganizationSubmissionPage />
        </Router>
      </I18nextProvider>
    );
    fireEvent.change(screen.getByLabelText(/tenant id/i), { target: { value: '1' } });
    fireEvent.change(screen.getByLabelText(/organization name/i), { target: { value: 'Org 1' } });
    fireEvent.change(screen.getByLabelText(/description/i), { target: { value: 'Description' } });
    fireEvent.change(screen.getByLabelText(/established date/i), { target: { value: '2021-01-01' } });
    fireEvent.change(screen.getByLabelText(/contact email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/contact phone/i), { target: { value: '1234567890' } });
    fireEvent.change(screen.getByLabelText(/address/i), { target: { value: '123 Main St' } });
    fireEvent.change(screen.getByLabelText(/category ids/i), { target: { value: '1,2' } });
    fireEvent.change(screen.getByLabelText(/latitude/i), { target: { value: '40.7128' } });
    fireEvent.change(screen.getByLabelText(/longitude/i), { target: { value: '-74.0060' } });
    fireEvent.change(screen.getByLabelText(/location address/i), { target: { value: 'New York, NY' } });

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => expect(screen.getByText(/failed to create organization/i)).toBeInTheDocument());
  });
});