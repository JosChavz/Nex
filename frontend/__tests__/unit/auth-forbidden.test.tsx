import '@testing-library/jest-dom'
import ForbiddenPage from "@/app/forbidden/page";
import { render, screen } from '@testing-library/react'

describe("ForbiddenPage", () => {
    test('renders forbidden page', () => {
        render(<ForbiddenPage />);
        const heading = screen.getByRole('heading', { level: 1 })
        expect(heading).toBeInTheDocument();
        expect(heading).toHaveTextContent('Forbidden Access');
    })
})
