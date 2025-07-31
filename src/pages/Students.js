import { useState, useEffect, useContext } from "react";
import { Container, Typography, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { AuthContext } from "../context/AuthContext";
import api from "../api";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button"; // <-- our Tailwind button

const Students = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [students, setStudents] = useState([]);
    const [open, setOpen] = useState(false);
    const [editId, setEditId] = useState(null);
    const [form, setForm] = useState({ phone: "", address: "", parent_contact: "", enrollment_date: "", class_name: "" });

    // Redirect unauthorized roles
    useEffect(() => {
        if (!user) return;
        if (user.role !== "ADMIN" && user.role !== "TEACHER") navigate("/dashboard");
    }, [user, navigate]);

    const fetchStudents = async () => {
        const res = await api.get("students/");
        setStudents(res.data);
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    const handleOpen = (student = null) => {
        if (student) {
            setEditId(student.id);
            setForm({
                phone: student.phone,
                address: student.address,
                parent_contact: student.parent_contact,
                enrollment_date: student.enrollment_date,
                class_name: student.class_name,
            });
        } else {
            setEditId(null);
            setForm({ phone: "", address: "", parent_contact: "", enrollment_date: "", class_name: "" });
        }
        setOpen(true);
    };

    const handleClose = () => setOpen(false);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async () => {
        try {
            if (editId) {
                await api.put(`students/${editId}/`, { ...form, user: students.find(s => s.id === editId).user.id });
            } else {
                await api.post("students/", form);
            }
            fetchStudents();
            handleClose();
        } catch (err) {
            alert("Error saving student");
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Delete this student?")) {
            await api.delete(`students/${id}/`);
            fetchStudents();
        }
    };

    const columns = [
        { field: "id", headerName: "ID", width: 80 },
        { field: "user", headerName: "Username", flex: 1, valueGetter: (params) => params.row.user?.username },
        { field: "class_name", headerName: "Class", flex: 1 },
        { field: "phone", headerName: "Phone", flex: 1 },
        { field: "parent_contact", headerName: "Parent Contact", flex: 1 },
        { field: "enrollment_date", headerName: "Enrollment Date", flex: 1 },
        {
            field: "actions",
            headerName: "Actions",
            width: 200,
            renderCell: (params) =>
                user.role === "ADMIN" && (
                    <div className="flex space-x-2">
                        <Button size="small" variant="primary" onClick={() => handleOpen(params.row)}>Edit</Button>
                        <Button size="small" variant="danger" onClick={() => handleDelete(params.row.id)}>Delete</Button>
                    </div>
                ),
        },
    ];

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Students</Typography>
            {user.role === "ADMIN" && (
                <Button variant="success" className="mb-4" onClick={() => handleOpen()}>Add Student</Button>
            )}
            <div className="bg-white p-4 rounded shadow">
                <DataGrid rows={students} columns={columns} pageSize={7} rowsPerPageOptions={[7]} />
            </div>

            {/* Add/Edit Modal */}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{editId ? "Edit Student" : "Add Student"}</DialogTitle>
                <DialogContent>
                    <TextField fullWidth label="Class" name="class_name" value={form.class_name} onChange={handleChange} margin="dense" />
                    <TextField fullWidth label="Phone" name="phone" value={form.phone} onChange={handleChange} margin="dense" />
                    <TextField fullWidth label="Parent Contact" name="parent_contact" value={form.parent_contact} onChange={handleChange} margin="dense" />
                    <TextField fullWidth type="date" label="Enrollment Date" name="enrollment_date" value={form.enrollment_date} onChange={handleChange} margin="dense" InputLabelProps={{ shrink: true }} />
                    <TextField fullWidth label="Address" name="address" value={form.address} onChange={handleChange} margin="dense" multiline rows={2} />
                </DialogContent>
                <DialogActions>
                    <Button variant="gray" onClick={handleClose}>Cancel</Button>
                    <Button variant="primary" onClick={handleSubmit}>{editId ? "Update" : "Create"}</Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default Students;
