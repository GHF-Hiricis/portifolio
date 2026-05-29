import { CheckCircle2Icon } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function AlertDefault({
    messages,
    title,
}: {
    messages: string[];
    title?: string;
}) {
    return (
        <Alert className="max-w-md mb-4" variant="default">
            <CheckCircle2Icon />
            <AlertTitle>{title || 'Ok!'}</AlertTitle>
            <AlertDescription>
                <ul className="list-inside list-disc text-sm">
                    {Array.from(new Set(messages)).map((message, index) => (
                        <li key={index}>{message}</li>
                    ))}
                </ul>
            </AlertDescription>
        </Alert>
    );
}
