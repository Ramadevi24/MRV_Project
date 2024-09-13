import { render, screen, fireEvent } from '@testing-library/react';
import axios from 'axios';
import UserForm from './UserForm';
import { ToastContainer } from 'react-toastify';

jest.mock('axios');

describe('UserForm', () => {
  test('renders form and submits data', async () => {
    axios.get.mockResolvedValueOnce({ data: [{ id: 1, name: 'Tenant1' }] });
    axios.get.mockResolvedValueOnce({ data: [{ id: 1, name: 'Org1' }] });
    axios.get.mockResolvedValueOnce({ data: [{ id: 1, name: 'Role1' }] });
    axios.get.mockResolvedValueOnce({ data: [{ id: 1, name: 'UserRole1' }] });

    render(<UserForm />);
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

    axios.post.mockResolvedValueOnce({});

    fireEvent.click(screen.getByText(/Create User/i));

    expect(axios.post).toHaveBeenCalledWith('/api/users', expect.any(Object), expect.any(Object));
    expect(await screen.findByText(/User created successfully/i)).toBeInTheDocument();
  });
});