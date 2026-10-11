import {useState} from "react";
import type {FormEvent} from "react";
import type {UserRequest} from "../types/user";

interface UserFormProps {
    onSubmit: (user: UserRequest) => void;
}

export default function UserForm({onSubmit}: UserFormProps) {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit({fullName, email});
        setFullName("");
        setEmail("");
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add User</h2>
            <input
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
            />
            <input
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit">Create</button>
        </form>
    );
}