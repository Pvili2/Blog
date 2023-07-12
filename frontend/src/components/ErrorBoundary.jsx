import { useRouteError } from 'react-router-dom'

export default function ErrorBoundary() {
    const error = useRouteError();

    return (
        <section>
            <h1>Something went wrong</h1>
            <small>{error?.message}</small>
        </section>
    );
}