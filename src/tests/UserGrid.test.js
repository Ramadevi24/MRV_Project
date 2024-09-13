import { render, screen, fireEvent } from '@testing-library/react';
import axios from 'axios';
import UserGrid from './UserGrid';
import { ToastContainer } from 'react-toastify';

jest.mock('axios');

describe('UserGrid', () => {
  test('fetches and displays users', async () => {
    const users = [
      { id: 1, firstName: 'John', lastName: 'Doe', email: 'john@example.com', phone: '1234567890', loginType: 'Admin', tenantName: 'Tenant1', organizationName: 'Org1', userRole: 'Admin' },
      // Add more users as needed
    ];
    axios.get.mockResolvedValue({ data: users });

    render(<UserGrid />);
    render(<ToastContainer />);

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();

    const user = await screen.findByText(/John/i);
    expect(user).toBeInTheDocument();
  });

  test('handles delete user', async () => {
    const users = [
      { id: 1, firstName: 'John', lastName: 'Doe', email: 'john@example.com', phone: '1234567890', loginType: 'Admin', tenantName: 'Tenant1', organizationName: 'Org1', userRole: 'Admin' },
    ];
    axios.get.mockResolvedValue({ data: users });
    axios.delete.mockResolvedValue({});

    render(<UserGrid />);
    render(<ToastContainer />);

    const deleteButton = await screen.findByRole('button', { name: /delete/i });
    fireEvent.click(deleteButton);

    const confirmButton = screen.getByRole('button', { name: /delete/i });
    fireEvent.click(confirmButton);

    expect(axios.delete).toHaveBeenCalledWith('/api/users/1', expect.anything());
    expect(await screen.findByText(/User deleted successfully/i)).toBeInTheDocument();
  });
});