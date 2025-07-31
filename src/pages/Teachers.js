import { useState, useEffect, useContext } from "react";
import { Container, Typography, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { AuthContext } from "../context/AuthContext";
import api from "../api";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

const Teachers = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [teachers, setTeachers] = useState([]);
    const [open, setOpen] = useState(false);
    const [editId, setEditId] = useState(null);
    const [form, setForm] = useState({ subject: "", qualifications: "" });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!user) return;
        if (user.role !== "ADMIN") navigate("/dashboard");
    }, [user, navigate]);

    const fetchTeachers = async () => {
        const res = await api.get("teachers/");
        setTeachers(res.data);
    };

    useEffect(() => {
        fetchTeachers();
    }, []);

    const handleOpen = (teacher = null) => {
        if (teacher) {
            setEditId(teacher.id);
            setForm({ subject: teacher.subject, qualifications: teacher.qualifications });
        } else {
            setEditId(null);
            setForm({ subject: "", qualifications: "" });
        }
        setOpen(true);
    };

    const handleClose = () => setOpen(false);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async () => {
        setLoading(true);
        try {
            if (editId) {
                await api.put(`teachers/${editId}/`, { ...form, user: teachers.find(t => t.id === editId).user.id });
            } else {
                await api.post("teachers/", form);
            }
            fetchTeachers();
            handleClose();
        } catch (err) {
            alert("Error saving teacher");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Delete this teacher?")) {
            setLoading(true);
            await api.delete(`teachers/${id}/`);
            fetchTeachers();
            setLoading(false);
        }
    };

    const columns = [
        { field: "id", headerName: "ID", width: 80 },
        { field: "user", headerName: "Username", flex: 1, valueGetter: (params) => params.row.user?.username },
        { field: "subject", headerName: "Subject", flex: 1 },
        { field: "qualifications", headerName: "Qualifications", flex: 2 },
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
            <Typography variant="h4" gutterBottom>Teachers</Typography>
            <Button variant="success" className="mb-4" onClick={() => handleOpen()}>Add Teacher</Button>
            <div className="bg-white p-4 rounded shadow">
                <DataGrid rows={teachers} columns={columns} pageSize={7} rowsPerPageOptions={[7]} />
            </div>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{editId ? "Edit Teacher" : "Add Teacher"}</DialogTitle>
                <DialogContent>
                    <TextField fullWidth label="Subject" name="subject" value={form.subject} onChange={handleChange} margin="dense" />
                    <TextField fullWidth label="Qualifications" name="qualifications" value={form.qualifications} onChange={handleChange} margin="dense" multiline rows={3} />
                </DialogContent>
                <DialogActions>
                    <Button variant="gray" onClick={handleClose}>Cancel</Button>
                    <Button variant="primary" onClick={handleSubmit} loading={loading}>{editId ? "Update" : "Create"}</Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default Teachers;
