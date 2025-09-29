import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminService } from "../../services/admin";
import { Plus, Edit, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";
import Button from "../ui/Button";
import Loading from "../ui/Loading";

export default function DepartmentManagement() {
  const queryClient = useQueryClient();
  const [form, setForm] = useState({ deptId: "", deptName: "", deptHead: "" });
  const [editId, setEditId] = useState(null);

  const { data, isLoading } = useQuery({
    queryKey: ["departments"],
    queryFn: () => adminService.getDepartments().then((r) => r.data),
  });

  const saveMutation = useMutation({
    mutationFn: (payload) =>
      editId
        ? adminService.updateDepartment(editId, payload)
        : adminService.createDepartment(payload),
    onSuccess: () => {
      queryClient.invalidateQueries(["departments"]);
      setForm({ deptId: "", deptName: "", deptHead: "" });
      setEditId(null);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: adminService.deleteDepartment,
    onSuccess: () => queryClient.invalidateQueries(["departments"]),
  });

  if (isLoading) return <Loading />;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Departments</h1>
        <Button
          leftIcon={<Plus className="w-4 h-4" />}
          onClick={() => setForm({ deptId: "", deptName: "", deptHead: "" })}
        >
          Add
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{editId ? "Edit" : "New"} Department</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            className="form-input"
            placeholder="Code (CS)"
            value={form.deptId}
            onChange={(e) => setForm({ ...form, deptId: e.target.value })}
          />
          <input
            className="form-input"
            placeholder="Name"
            value={form.deptName}
            onChange={(e) => setForm({ ...form, deptName: e.target.value })}
          />
          <input
            className="form-input"
            placeholder="Head"
            value={form.deptHead}
            onChange={(e) => setForm({ ...form, deptHead: e.target.value })}
          />
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
          <CardTitle>List</CardTitle>
        </CardHeader>
        <CardContent>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Code</th>
                <th className="text-left p-2">Name</th>
                <th className="text-left p-2">Head</th>
                <th className="w-20"></th>
              </tr>
            </thead>
            <tbody>
              {data?.map((d) => (
                <tr key={d.deptId} className="border-b">
                  <td className="p-2">{d.deptId}</td>
                  <td className="p-2">{d.deptName}</td>
                  <td className="p-2">{d.deptHead}</td>
                  <td className="p-2 flex gap-2">
                    <Button
                      variant="ghost"
                      onClick={() => {
                        setForm(d);
                        setEditId(d.deptId);
                      }}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => deleteMutation.mutate(d.deptId)}
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
