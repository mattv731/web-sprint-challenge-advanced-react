import React from "react";
import MutationObserver from 'mutationobserver-shim';
import { render, screen, waitFor } from "@testing-library/react";
import CheckoutForm from "./CheckoutForm";
import userEvent from "@testing-library/user-event";

// Write up the two tests here and make sure they are testing what the title shows

test("renders without errors", () => {
    render(<CheckoutForm />)
});

test("shows success message on submit with form details", async () => {
    render(<CheckoutForm />)

    const first = screen.getByLabelText(/First Name/i);
    userEvent.type(first, "Heyyo");

    const last = screen.getByLabelText(/Last Name/i);
    userEvent.type(last, "Dude");

    const address = screen.getByLabelText(/Address/i);
    userEvent.type(address, "4860 Louis Lane");

    const city = screen.getByLabelText(/city/i);
    userEvent.type(city, 'Weston');

    const state = screen.getByLabelText(/state/i);
    userEvent.type(state, 'Wisconsin')

    const zip = screen.getByLabelText(/zip/i);
    userEvent.type(zip, '36453');

    const submit = screen.getByRole('button');
    userEvent.click(submit);

    await waitFor(()=> {
        const successMessage = screen.queryByText(/Your new green friends will be shipped to:/i)
        const testFirst = screen.queryByText(/Heyyo/i);
        const testLast = screen.queryByText(/Dude/i);
        const testAddress = screen.queryByText(/4860 Louis Lane/i)
        const testCity = screen.queryByText(/Weston/i);
        const testState = screen.queryByText(/Wisconsin/i)
        const testZip = screen.queryByText(/36453/i)
        expect(successMessage).toBeInTheDocument();
        expect(testFirst).toBeInTheDocument();
        expect(testLast).toBeInTheDocument();
        expect(testAddress).toBeInTheDocument();
        expect(testCity).toBeInTheDocument();
        expect(testState).toBeInTheDocument();
        expect(testZip).toBeInTheDocument();
    })

});
