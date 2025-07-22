'use client';

import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AdminSidebar } from "../../../components/layout/admin-sidebar";
import { Header } from "../../../components/layout/header";

const roleData = [
  { role_id: 1, role_type: "Admin", name: "Super Admin", description: "Full access", permission_id: "perm_001" },
  { role_id: 2, role_type: "Manager", name: "Ops Manager", description: "View + Modify access", permission_id: "perm_002" }
];

export default function RolesPage() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto p-6 space-y-10">
          <section className="space-y-4">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-gray-900">User Roles</h1>
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button>Add Role</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create New Role</DialogTitle>
                  </DialogHeader>
                  <form className="space-y-4">
                    <div>
                      <Label>Role ID</Label>
                      <Input type="number" name="role_id" />
                    </div>
                    <div>
                      <Label>Role Type</Label>
                      <Input name="role_type" />
                    </div>
                    <div>
                      <Label>Name</Label>
                      <Input name="name" />
                    </div>
                    <div>
                      <Label>Description</Label>
                      <Input name="description" />
                    </div>
                    <div>
                      <Label>Permission ID</Label>
                      <Input name="permission_id" />
                    </div>
                    <Button type="submit">Create</Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
            <Card className="shadow-md border rounded-2xl">
              <CardContent className="p-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Permission ID</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {roleData.map((role, idx) => (
                      <TableRow key={idx}>
                        <TableCell>{role.role_id}</TableCell>
                        <TableCell>{role.role_type}</TableCell>
                        <TableCell>{role.name}</TableCell>
                        <TableCell>{role.description}</TableCell>
                        <TableCell>{role.permission_id}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </section>
        </main>
      </div>
    </div>
  );
}
