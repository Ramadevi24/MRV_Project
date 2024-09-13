import { render, screen, fireEvent } from '@testing-library/react';
import axios from 'axios';
import EditUser from './EditUser';
import { ToastContainer } from 'react-toastify';
import { MemoryRouter, Route } from 'react-router-dom';

jest.mock('axios');

describe('EditUser', () => {
  test('renders form and submits data', async () => {
    axios.get.mockResolvedValueOnce({ data: { id: 1, firstName: 'John', lastName: 'Doe', email: 'john@example.com', passwordHash: 'password', phone: '1234567890', tenantID: '1', organizationID: '1', tenantRoleID: '1', userRole: '1' } });
    axios.get.mockResolvedValueOnce({ data: [{ id: 1, name: 'Tenant1' }] });
    axios.get.mockResolvedValueOnce({ data: [{ id: 1, name: 'Org1' }] });
    axios.get.mockResolvedValueOnce({ data: [{ id: 1, name: 'Role1' }] });
    axios.get.mockResolvedValueOnce({ data: [{ id: 1, name: 'UserRole1' }] });

    render(
      <MemoryRouter initialEntries={['/edit-user/1']}>
        <Route path="/edit-user/:userId">
          <EditUser />
        </Route>
      </MemoryRouter>
    );
    render(<ToastContainer />);

    fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText(/Last Name/i), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'password' } });
    fireEvent.change(screen.getByLabelText(/Phone/i), { target: { value: '1234567890' } });
    fireEvent.change(screen.getByLabelText(/Tenant ID/i), { target: { value: '1' } });
    fireEvent.change(screen.getByLabelText(/Organization ID/i), { target: { value: '1' } });
    fireEvent.change(screen.getByLabelText(/Tenant Role ID/i), { target: { value: '1' } });
    fireEvent.change(screen.getByLabelText(/User Role/i), { target: { value: '1' } });

    axios.put.mockResolvedValueOnce({});

    fireEvent.click(screen.getByText(/Update User/i));

    expect(axios.put).toHaveBeenCalledWith('/api/users/1', expect.any(Object), expect.any(Object));
    expect(await screen.findByText(/User updated successfully/i)).toBeInTheDocument();
  });
});