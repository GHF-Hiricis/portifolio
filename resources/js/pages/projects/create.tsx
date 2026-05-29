import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Head, useForm, } from '@inertiajs/react';
import { Label } from '@radix-ui/react-menu';
import { Textarea } from "@/components/ui/textarea"
import AlertError from '@/components/alert-error';
import { Switch } from '@/components/ui/switch';
import { useEffect, useState } from 'react';

export default function Create() {

    const {data, setData, post, processing, errors} = useForm<{
        name: string;
        description: string;
        link: string;
        github_link: string;
        status: 'active' | 'inactive';
        images: File[];
    }>({
        name: '',
        description: '',
        link: '',
        github_link: '',
        status: 'active',
        images: [] as File[],
    });

    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        if (Object.keys(errors).length > 0) {
            setShowAlert(true);

            // Automatically hide the alert after 5 seconds
            const timer = setTimeout(() => {
                setShowAlert(false);
            }, 5000);

            // Clear the timer if the component unmounts or if errors change
            return () => clearTimeout(timer);
        } else {
            setShowAlert(false);
        }
    }, [errors]);

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        post('/projects');
    }

    return (
        <>
            <Head title="New Project" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <form onSubmit={handleSubmit}>
                    {/* Display errors */}
                    {showAlert && (
                        <AlertError errors={Object.values(errors).flat()} title="Something went wrong." />
                    )}

                    <div className="mb-4 flex flex-col gap-4">
                        <div className="flex space-x-2">
                            <div className="flex-2">
                                <Label className="mb-2 block text-sm font-medium">
                                    Project Name
                                </Label>
                                <Input type="text" name="name" placeholder="Project Name" value={data.name} onChange={(e) => setData('name', e.target.value)} />
                            </div>
                            <div className="flex-1 items-center flex-col">
                                <Label className="text-sm font-medium mb-4">
                                    Project Status
                                </Label>
                                <div className="flex items-center space-x-2">
                                    <Switch checked={data.status === 'active'} onCheckedChange={(checked) => setData('status', checked ? 'active' : 'inactive')} />
                                    <Label className="text-sm font-medium">
                                        {data.status === 'active' ? 'Active' : 'Inactive'}
                                    </Label>
                                </div>
                            </div>
                        </div>
                        <div className="flex space-x-2">
                            <div className="flex-1">
                                <Label className="mb-2 block text-sm font-medium">
                                    Project Link
                                </Label>
                                <Input type="text" name="link" placeholder="Project Link" value={data.link} onChange={(e) => setData('link', e.target.value)} />
                            </div>
                            <div className="flex-1 items-center flex-col">
                                <Label className="text-sm font-medium mb-2">
                                    Project GitHub Link
                                </Label>
                                <Input type="text" name="github_link" placeholder="Project GitHub Link" value={data.github_link}
                                    onChange={(e) => setData('github_link', e.target.value)} />
                            </div>
                        </div>
                        <div className="flex-1">
                            <Label className="mb-2 block text-sm font-medium">
                                Project Description
                            </Label>
                            <Textarea name="description" placeholder="Project Description" value={data.description} onChange={(e) => setData('description', e.target.value)} />
                        </div>
                        <div className="flex-1 mb-2">
                            <Label className="mb-2 block text-sm font-medium">
                                Upload Images
                            </Label>
                            <Input type="file" name="images[]" multiple placeholder="Project Images"
                                onChange={(e) => setData('images', e.target.files ? Array.from(e.target.files) : [])} />
                        </div>
                    </div>
                    <Button disabled={processing} type="submit">
                        Create Project
                    </Button>
                </form>
            </div>
        </>
    );
}

Create.layout = {
    breadcrumbs: [
        {
            title: 'New Project',
            href: '/projects/create',
        },
    ],
};
