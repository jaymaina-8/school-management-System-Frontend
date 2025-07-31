import { useState, useEffect, useContext } from "react";
import { Container, Typography, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { AuthContext } from "../context/AuthContext";
import api from "../api";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

const Staff = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [staff, setStaff] = useState([]);
    const [open, setOpen] = useState(false);
    const [editId, setEditId] = useState(null);
    const [form, setForm] = useState({ department: "", role_title: "" });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!user) return;
        if (user.role !== "ADMIN") navigate("/dashboard");
    }, [user, navigate]);

    const fetchStaff = async () => {
        const res = await api.get("staff/");
        setStaff(res.data);
    };

    useEffect(() => {
        fetchStaff();
    }, []);

    const handleOpen = (member = null) => {
        if (member) {
            setEditId(member.id);
            setForm({ department: member.department, role_title: member.role_title });
        } else {
            setEditId(null);
            setForm({ department: "", role_title: "" });
        }
        setOpen(true);
    };

    const handleClose = () => setOpen(false);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async () => {
        setLoading(true);
        try {
            if (editId) {
                await api.put(`staff/${editId}/`, { ...form, user: staff.find(s => s.id === editId).user.id });
            } else {
                await api.post("staff/", form);
            }
            fetchStaff();
            handleClose();
        } catch (err) {
            alert("Error saving staff member");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Delete this staff member?")) {
            setLoading(true);
            await api.delete(`staff/${id}/`);
            fetchStaff();
            setLoading(false);
        }
    };

    const columns = [
        { field: "id", headerName: "ID", width: 80 },
        { field: "user", headerName: "Username", flex: 1, valueGetter: (params) => params.row.user?.username },
        { field: "department", headerName: "Department", flex: 1 },
        { field: "role_title", headerName: "Role Title", flex: 1 },
        {
            field: "actions",
            headerName: "Actions",
            width: 200,
            renderCell: (params) => (
                <div className="flex space-x-2">
                    <Button size="small" variant="primary" onClick={() => handleOpen(params.row)}>Edit</Button>
                    <Button size="small" variant="danger" onClick={() => handleDelete(params.row.id)} loading={loading}>Delete</Button>
                </div>
            ),
        },
    ];

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Staff</Typography>
            <Button variant="success" className="mb-4" onClick={() => handleOpen()}>Add Staff Member</Button>
            <div className="bg-white p-4 rounded shadow">
                <DataGrid rows={staff} columns={columns} pageSize={7} rowsPerPageOptions={[7]} />
            </div>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{editId ? "Edit Staff Member" : "Add Staff Member"}</DialogTitle>
                <DialogContent>
                    <TextField fullWidth label="Department" name="department" value={form.department} onChange={handleChange} margin="dense" />
                    <TextField fullWidth label="Role Title" name="role_title" value={form.role_title} onChange={handleChange} margin="dense" />
                </DialogContent>
                <DialogActions>
                    <Button variant="gray" onClick={handleClose}>Cancel</Button>
                    <Button variant="primary" onClick={handleSubmit} loading={loading}>{editId ? "Update" : "Create"}</Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default Staff;
