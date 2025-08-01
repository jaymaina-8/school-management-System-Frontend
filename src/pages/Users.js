import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import api from "../api";
import toast from "react-hot-toast";
import Button from "../components/Button";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions,
    MenuItem,
} from "@mui/material";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [roleFilter, setRoleFilter] = useState("");
    const [open, setOpen] = useState(false);
    const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
    const [editId, setEditId] = useState(null);
    const [deleteId, setDeleteId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);

    const [form, setForm] = useState({
        username: "",
        email: "",
        role: "STUDENT",
    });

    const fetchUsers = async () => {
        try {
            const res = await api.get("users/");
            setUsers(res.data);
        } catch {
            toast.error("Error fetching users");
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleOpen = (user = null) => {
        if (user) {
            setEditId(user.id);
            setForm({
                username: user.username,
                email: user.email,
                role: user.role,
            });
        } else {
            setEditId(null);
            setForm({ username: "", email: "", role: "STUDENT" });
        }
        setOpen(true);
    };

    const handleClose = () => setOpen(false);

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async () => {
        setLoading(true);
        try {
            if (editId) {
                await api.put(`users/${editId}/`, form);
                toast.success("User updated");
            } else {
                await api.post("register/", form);
                toast.success("User created");
            }
            fetchUsers();
            handleClose();
        } catch {
            toast.error("Error saving user");
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteClick = (id) => {
        setDeleteId(id);
        setDeleteConfirmOpen(true);
    };

    const handleDeleteConfirm = async () => {
        setDeleteLoading(true);
        try {
            await api.delete(`users/${deleteId}/`);
            toast.success("User deleted");
            fetchUsers();
            setDeleteConfirmOpen(false);
        } catch {
            toast.error("Error deleting user");
        } finally {
            setDeleteLoading(false);
        }
    };

    const filteredUsers = roleFilter
        ? users.filter((u) => u.role === roleFilter)
        : users;

    const columns = [
        { field: "id", headerName: "ID", width: 80 },
        { field: "username", headerName: "Username", flex: 1 },
        { field: "email", headerName: "Email", flex: 1 },
        { field: "role", headerName: "Role", flex: 1 },
        {
            field: "actions",
            headerName: "Actions",
            width: 200,
            renderCell: (params) => (
                <>
                    <Button
                        variant="outlined"
                        size="small"
                        onClick={() => handleOpen(params.row)}
                        className="mr-2"
                    >
                        Edit
                    </Button>
                    <Button
                        variant="danger"
                        size="small"
                        onClick={() => handleDeleteClick(params.row.id)}
                    >
                        Delete
                    </Button>
                </>
            ),
        },
    ];

    return (
        <div className="p-6 bg-white/10 backdrop-blur-md rounded-xl shadow-lg border border-white/20">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-white">User Management</h2>
                <div className="flex gap-2">
                    <select
                        value={roleFilter}
                        onChange={(e) => setRoleFilter(e.target.value)}
                        className="border rounded px-2 py-1 bg-white/20 text-white"
                    >
                        <option value="">All Roles</option>
                        <option value="ADMIN">Admin</option>
                        <option value="TEACHER">Teacher</option>
                        <option value="STAFF">Staff</option>
                        <option value="STUDENT">Student</option>
                    </select>
                    <Button variant="success" onClick={() => handleOpen()}>
                        Add User
                    </Button>
                </div>
            </div>
            <div className="bg-white rounded shadow">
                <DataGrid
                    rows={filteredUsers}
                    columns={columns}
                    pageSize={7}
                    rowsPerPageOptions={[7]}
                    autoHeight
                />
            </div>

            {/* Add/Edit User Modal */}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{editId ? "Edit User" : "Add User"}</DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        label="Username"
                        name="username"
                        value={form.username}
                        onChange={handleChange}
                        margin="dense"
                    />
                    <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        margin="dense"
                    />
                    <TextField
                        select
                        fullWidth
                        label="Role"
                        name="role"
                        value={form.role}
                        onChange={handleChange}
                        margin="dense"
                    >
                        <MenuItem value="ADMIN">Admin</MenuItem>
                        <MenuItem value="TEACHER">Teacher</MenuItem>
                        <MenuItem value="STAFF">Staff</MenuItem>
                        <MenuItem value="STUDENT">Student</MenuItem>
                    </TextField>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} variant="secondary">
                        Cancel
                    </Button>
                    <Button
                        variant="success"
                        onClick={handleSubmit}
                        loading={loading}
                    >
                        {editId ? "Update" : "Create"}
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Delete Confirmation Modal */}
            <Dialog
                open={deleteConfirmOpen}
                onClose={() => setDeleteConfirmOpen(false)}
            >
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    Are you sure you want to delete this user? This action cannot be undone.
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => setDeleteConfirmOpen(false)}
                        variant="secondary"
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="danger"
                        onClick={handleDeleteConfirm}
                        loading={deleteLoading}
                    >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default Users;
