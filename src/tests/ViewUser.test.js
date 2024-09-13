import { render, screen } from '@testing-library/react';
import axios from 'axios';
import ViewUser from './ViewUser';
import { ToastContainer } from 'react-toastify';
import { MemoryRouter, Route } from 'react-router-dom';

jest.mock('axios');

describe('ViewUser', () => {
  test('renders user details', async () => {
    axios.get.mockResolvedValueOnce({ data: { id: 1, firstName: 'John', lastName: 'Doe', email: 'john@example.com', phone: '1234567890', loginType: 'Admin', tenantName: 'Tenant1', organizationName: 'Org1', userRole: 'Admin' } });

    render(
      <MemoryRouter initialEntries={['/view-user/1']}>
        <Route path="/view-user/:id">
          <ViewUser />
        </Route>
      </MemoryRouter>
    );
    render(<ToastContainer />);

    expect(await screen.findByText(/John/i)).toBeInTheDocument();
    expect(screen.getByText(/Doe/i)).toBeInTheDocument();
    expect(screen.getByText(/john@example.com/i)).toBeInTheDocument();
    expect(screen.getByText(/1234567890/i)).toBeInTheDocument();
    expect(screen.getByText(/Admin/i)).toBeInTheDocument();
    expect(screen.getByText(/Tenant1/i)).toBeInTheDocument();
    expect(screen.getByText(/Org1/i)).toBeInTheDocument();
  });
});