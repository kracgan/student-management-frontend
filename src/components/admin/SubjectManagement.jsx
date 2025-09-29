import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminService } from "../../services/admin";
import { Plus, Edit, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";
import Button from "../ui/Button";
import Loading from "../ui/Loading";

export default function SubjectManagement() {
  const queryClient = useQueryClient();
  const [form, setForm] = useState({
    subjectId: "",
    subjectName: "",
    credits: 3,
    deptId: "",
  });
  const [editId, setEditId] = useState(null);

  const { data: subjects, isLoading } = useQuery({
    queryKey: ["subjects"],
    queryFn: () => adminService.getSubjects().then((r) => r.data),
  });

  const { data: departments } = useQuery({
    queryKey: ["departments"],
    queryFn: () => adminService.getDepartments().then((r) => r.data),
  });

  const saveMutation = useMutation({
    mutationFn: (payload) =>
      editId
        ? adminService.updateSubject(editId, payload)
        : adminService.createSubject(payload),
    onSuccess: () => {
      queryClient.invalidateQueries(["subjects"]);
      setForm({ subjectId: "", subjectName: "", credits: 3, deptId: "" });
      setEditId(null);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: adminService.deleteSubject,
    onSuccess: () => queryClient.invalidateQueries(["subjects"]),
  });

  if (isLoading) return <Loading />;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Subjects</h1>
        <Button
          leftIcon={<Plus className="w-4 h-4" />}
          onClick={() =>
            setForm({ subjectId: "", subjectName: "", credits: 3, deptId: "" })
          }
        >
          Add
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{editId ? "Edit" : "New"} Subject</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            className="form-input"
            placeholder="Code (CS101)"
            value={form.subjectId}
            onChange={(e) => setForm({ ...form, subjectId: e.target.value })}
          />
          <input
            className="form-input"
            placeholder="Name"
            value={form.subjectName}
            onChange={(e) => setForm({ ...form, subjectName: e.target.value })}
          />
          <input
            className="form-input"
            type="number"
            placeholder="Credits"
            value={form.credits}
            onChange={(e) =>
              setForm({ ...form, credits: Number(e.target.value) })
            }
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
          <CardTitle>Subject List</CardTitle>
        </CardHeader>
        <CardContent>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Code</th>
                <th className="text-left p-2">Name</th>
                <th className="text-left p-2">Credits</th>
                <th className="text-left p-2">Department</th>
                <th className="w-20"></th>
              </tr>
            </thead>
            <tbody>
              {subjects?.map((s) => (
                <tr key={s.subjectId} className="border-b">
                  <td className="p-2">{s.subjectId}</td>
                  <td className="p-2">{s.subjectName}</td>
                  <td className="p-2">{s.credits}</td>
                  <td className="p-2">
                    {departments?.find((d) => d.deptId === s.deptId)?.deptName}
                  </td>
                  <td className="p-2 flex gap-2">
                    <Button
                      variant="ghost"
                      onClick={() => {
                        setForm(s);
                        setEditId(s.subjectId);
                      }}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => deleteMutation.mutate(s.subjectId)}
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
