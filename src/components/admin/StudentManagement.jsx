import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminService } from "../../services/admin";
import { Plus, Edit, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";
import Button from "../ui/Button";
import Loading from "../ui/Loading";

export default function StudentManagement() {
  const queryClient = useQueryClient();
  const [form, setForm] = useState({
    studentId: "",
    name: "",
    email: "",
    phone: "",
    dob: "",
    deptId: "",
  });
  const [editId, setEditId] = useState(null);

  const { data: students, isLoading } = useQuery({
    queryKey: ["students"],
    queryFn: () => adminService.getStudents().then((r) => r.data),
  });

  const { data: departments } = useQuery({
    queryKey: ["departments"],
    queryFn: () => adminService.getDepartments().then((r) => r.data),
  });

  const saveMutation = useMutation({
    mutationFn: (payload) =>
      editId
        ? adminService.updateStudent(editId, payload)
        : adminService.createStudent(payload),
    onSuccess: () => {
      queryClient.invalidateQueries(["students"]);
      setForm({
        studentId: "",
        name: "",
        email: "",
        phone: "",
        dob: "",
        deptId: "",
      });
      setEditId(null);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: adminService.deleteStudent,
    onSuccess: () => queryClient.invalidateQueries(["students"]),
  });

  if (isLoading) return <Loading />;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Students</h1>
        <Button
          leftIcon={<Plus className="w-4 h-4" />}
          onClick={() =>
            setForm({
              studentId: "",
              name: "",
              email: "",
              phone: "",
              dob: "",
              deptId: "",
            })
          }
        >
          Add
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{editId ? "Edit" : "New"} Student</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            className="form-input"
            placeholder="ID (STU001)"
            value={form.studentId}
            onChange={(e) => setForm({ ...form, studentId: e.target.value })}
          />
          <input
            className="form-input"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            className="form-input"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            className="form-input"
            placeholder="Phone"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
          <input
            className="form-input"
            type="date"
            value={form.dob}
            onChange={(e) => setForm({ ...form, dob: e.target.value })}
          />
          <select
            className="form-select"
            value={form.deptId}
            onChange={(e) => setForm({ ...form, deptId: e.target.value })}
          >
            <option value="">Department</option>
            {departments?.map((d) => (
              <option key={d.deptId} value={d.deptId}>
                {d.deptName}
              </option>
            ))}
          </select>
        </CardContent>
        <CardContent className="flex gap-2">
          <Button
            onClick={() => saveMutation.mutate(form)}
            disabled={saveMutation.isPending}
          >
            {saveMutation.isPending ? "Saving…" : "Save"}
          </Button>
          {editId && (
            <Button variant="outline" onClick={() => setEditId(null)}>
              Cancel
            </Button>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Student List</CardTitle>
        </CardHeader>
        <CardContent>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">ID</th>
                <th className="text-left p-2">Name</th>
                <th className="text-left p-2">Email</th>
                <th className="text-left p-2">Phone</th>
                <th className="text-left p-2">DOB</th>
                <th className="text-left p-2">Dept</th>
                <th className="w-20"></th>
              </tr>
            </thead>
            <tbody>
              {students?.map((s) => (
                <tr key={s.studentId} className="border-b">
                  <td className="p-2">{s.studentId}</td>
                  <td className="p-2">{s.name}</td>
                  <td className="p-2">{s.email}</td>
                  <td className="p-2">{s.phone}</td>
                  <td className="p-2">{s.dob}</td>
                  <td className="p-2">
                    {departments?.find((d) => d.deptId === s.deptId)?.deptName}
                  </td>
                  <td className="p-2 flex gap-2">
                    <Button
                      variant="ghost"
                      onClick={() => {
                        setForm(s);
                        setEditId(s.studentId);
                      }}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => deleteMutation.mutate(s.studentId)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
// import React, { useState } from "react";
