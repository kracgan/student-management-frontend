import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminService } from "../../services/admin";
import { Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";
import Button from "../ui/Button";
import Loading from "../ui/Loading";

export default function EnrollmentManagement() {
  const queryClient = useQueryClient();

  const { data: enrollments, isLoading } = useQuery({
    queryKey: ["enrollments"],
    queryFn: () => adminService.getEnrollments().then((r) => r.data),
  });

  const deleteMutation = useMutation({
    mutationFn: adminService.deleteEnrollment,
    onSuccess: () => queryClient.invalidateQueries(["enrollments"]),
  });

  if (isLoading) return <Loading />;

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Enrollments</h1>

      <Card>
        <CardHeader>
          <CardTitle>All Enrollments</CardTitle>
        </CardHeader>
        <CardContent>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">ID</th>
                <th className="text-left p-2">Student</th>
                <th className="text-left p-2">Subject</th>
                <th className="text-left p-2">Date</th>
                <th className="w-10"></th>
              </tr>
            </thead>
            <tbody>
              {enrollments?.map((e) => (
                <tr key={e.id} className="border-b">
                  <td className="p-2">{e.id}</td>
                  <td className="p-2">{e.studentId}</td>
                  <td className="p-2">{e.subjectId}</td>
                  <td className="p-2">{e.enrollmentDate}</td>
                  <td className="p-2">
                    <Button
                      variant="ghost"
                      onClick={() => deleteMutation.mutate(e.id)}
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
