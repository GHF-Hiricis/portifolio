import AlertDefault from '@/components/alert-default';
import AlertError from '@/components/alert-error';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Head, Link, useForm } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import { Trash2, SquarePen } from 'lucide-react';
import { Badge } from "@/components/ui/badge"
import { useState, useEffect } from 'react';

interface Project {
    id: number;
    name: string;
    description: string;
    status: string;
    created_at: string;
    updated_at: string;
}

interface PageProps {
    [key: string]: any;
    flash: {
        success?: string;
        error?: string;
    };
    projects: Project[];
}

export default function Index() {

    const { flash, projects } = usePage<PageProps>().props;

    const {processing, delete: destroy} = useForm();

    const handleDelete = (id: number, name: string) => {
        if (confirm(`Are you sure you want to delete the project "${name}"? This action cannot be undone.`)) {
            destroy(`/projects/${id}`);
        }
    }

    const [showAlertError, setShowAlertError] = useState(false);
    const [showAlertSuccess, setShowAlertSuccess] = useState(false);

    // Show success alert if flash message exists
    useEffect(() => {
        if (flash.success) {
            setShowAlertSuccess(true);
            setTimeout(() => setShowAlertSuccess(false), 3000); // Hide after 3 seconds
        }
    }, [flash.success]);

    // Show error alert if flash message exists
    useEffect(() => {
        if (flash.error) {
            setShowAlertError(true);
            setTimeout(() => setShowAlertError(false), 3000);
        }
    }, [flash.error]);

    return (
        <>
            <Head title="Projects" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">

                {/* Display flash messages */}
                {showAlertSuccess && flash.success && (
                    <AlertDefault messages={[flash.success]} title="Success!" />
                )}
                {showAlertError && flash.error && (
                    <AlertError errors={[flash.error]} title="Something went wrong." />
                )}

                <div className="flex items-center gap-4 text-muted-foreground">
                    <Link href={'/projects/create'} prefetch>
                        <Button variant="default">Create New Project</Button>
                    </Link>
                </div>

                {projects.length > 0 && (
                    <div className="text-sm text-muted-foreground">
                        <Table>
                            <TableCaption>List of Projects</TableCaption>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[100px]">ID</TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead className="text-center">Status</TableHead>
                                    <TableHead className="text-center">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {projects.map((project) => (
                                    <TableRow key={project.id}>
                                        <TableCell className="font-medium">{project.id}</TableCell>
                                        <TableCell>{project.name}</TableCell>
                                        <TableCell className="text-center">
                                            <Badge variant={project.status === 'active' ? 'default' : 'destructive'}>
                                                {project.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-center space-x-2">
                                            <Link href={`/projects/${project.id}/edit`} prefetch>
                                                <Button variant="outline" size="sm">
                                                    <SquarePen/>
                                                </Button>
                                            </Link>
                                            <Button disabled={processing} onClick={() => handleDelete(project.id, project.name)} variant="destructive" size="sm">
                                                <Trash2/>
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                )}

            </div>
        </>
    );
}

Index.layout = {
    breadcrumbs: [
        {
            title: 'Projects',
            href: '/projects',
        },
    ],
};
