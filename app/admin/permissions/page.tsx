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

const permissionData = [
  { code: "perm_001", matrix: "Read, Write" },
  { code: "perm_002", matrix: "Read Only" }
];

export default function PermissionsPage() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto p-6 space-y-10">
          <section className="space-y-4">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-gray-900">Permissions</h1>
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button>Add Permission</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create New Permission</DialogTitle>
                  </DialogHeader>
                  <form className="space-y-4">
                    <div>
                      <Label>Permission Code</Label>
                      <Input name="code" />
                    </div>
                    <div>
                      <Label>Permission Matrix</Label>
                      <Input name="permission_matrix" />
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
                      <TableHead>Code</TableHead>
                      <TableHead>Permission Matrix</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {permissionData.map((perm, idx) => (
                      <TableRow key={idx}>
                        <TableCell>{perm.code}</TableCell>
                        <TableCell>{perm.matrix}</TableCell>
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
